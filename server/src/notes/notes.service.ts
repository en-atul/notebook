import { Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { noteInput } from './dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService, private readonly pubSub: PubSub) {}

  async create(userId: string, noteInput: noteInput): Promise<Note> {
    const note = await this.prisma.note
      .create({
        data: {
          ...noteInput,
          belongsToId: userId,
        },
      })
      .catch((error) => {
        throw error;
      });

    this.pubSub.publish('noteCreated', { noteCreated: note });

    return note;
  }

  async getNotes(userId: string): Promise<Note[]> {
    const notes = await this.prisma.note
      .findMany({
        where: {
          belongsToId: userId,
        },
      })
      .catch((error) => {
        throw error;
      });

    return notes;
  }

  async update(noteId: string, noteInput: noteInput): Promise<Note> {
    const note = await this.prisma.note
      .update({
        where: {
          id: noteId,
        },
        data: noteInput,
      })
      .catch((error) => {
        throw error;
      });
    this.pubSub.publish('noteUpdated', { noteUpdated: note });
    return note;
  }

  async delete(userId: string, noteId: string): Promise<Note> {
    const note = await this.prisma.note
      .delete({
        where: {
          id_belongsToId: {
            id: noteId,
            belongsToId: userId,
          },
        },
      })
      .catch((error) => {
        throw error;
      });
    this.pubSub.publish('noteDeleted', { noteDeleted: note });
    return note;
  }
}
