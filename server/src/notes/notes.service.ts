import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteResponse, noteInput } from './dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService, private readonly pubSub: PubSub) {}

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

    const createdNote = {
      id: note.id,
      title: note.title,
      content: note.content,
    };

    this.pubSub.publish('noteCreated', { noteCreated: createdNote });

    return createdNote;
  }
}
