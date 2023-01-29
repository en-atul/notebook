import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteResponse, noteInput } from './dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    noteInput: noteInput,
  ): Promise<CreateNoteResponse> {
    const note = await this.prisma.note
      .create({
        data: {
          ...noteInput,
          belongsToId: userId,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    return {
      id: note.id,
      title: note.title,
      content: note.content,
    };
  }
}
