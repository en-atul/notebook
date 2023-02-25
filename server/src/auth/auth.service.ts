import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { JwtPayload, Tokens } from './types';
import { AuthResponse, signupInput, loginInput } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(signupInput: signupInput): Promise<AuthResponse> {
    const hash = await argon.hash(signupInput.password);
    const user = await this.prisma.user
      .create({
        data: {
          ...signupInput,
          password: hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (
            error.code === 'P2002' &&
            error.meta?.target &&
            Array.isArray(error.meta.target) &&
            error.meta.target[0] === 'email'
          ) {
            throw new GraphQLError('Email has already been taken', {
              extensions: {
                code: 403,
                name: error.meta.target[0],
              },
            });
          }
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      ...tokens,
    };
  }

  async login(loginInput: loginInput): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginInput.email,
      },
    });

    if (!user)
      throw new GraphQLError('no user found', {
        extensions: {
          code: 400,
          name: 'email',
        },
      });

    const passwordMatches = await argon.verify(
      user.password,
      loginInput.password,
    );
    if (!passwordMatches)
      throw new GraphQLError('wrong password', {
        extensions: {
          code: 400,
          name: 'password',
        },
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      ...tokens,
    };
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }
}
