import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GetCurrentUserId } from 'src/common';
import { NoteResponse, noteInput } from './dto';
import { NotesService } from './notes.service';

@Resolver()
export class NotesResolver {
  constructor(
    private notesService: NotesService,
    private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => NoteResponse)
  createNote(
    @GetCurrentUserId() userId: string,
    @Args('noteInput') noteInput: noteInput,
  ) {
    return this.notesService.create(userId, noteInput);
  }

  @Query(() => [NoteResponse])
  getNotes(@GetCurrentUserId() userId: string) {
    return this.notesService.getNotes(userId);
  }

  @Mutation(() => NoteResponse)
  updateNote(@Args('noteInput') noteInput: noteInput) {
    const { id, ...rest } = noteInput;
    return this.notesService.update(id, rest);
  }

  @Mutation(() => NoteResponse)
  deleteNote(
    @GetCurrentUserId() userId: string,
    @Args('noteInput') noteInput: noteInput,
  ) {
    const { id } = noteInput;
    return this.notesService.delete(userId, id);
  }

  @Subscription(() => NoteResponse)
  noteCreated() {
    return this.pubSub.asyncIterator('noteCreated');
  }

  @Subscription(() => NoteResponse)
  noteUpdated() {
    return this.pubSub.asyncIterator('noteUpdated');
  }

  @Subscription(() => NoteResponse)
  noteDeleted() {
    return this.pubSub.asyncIterator('noteDeleted');
  }
}
