import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GetCurrentUserId, Public } from 'src/common';
import { CreateNoteResponse, noteInput } from './dto';
import { NotesService } from './notes.service';

@Resolver()
export class NotesResolver {
  constructor(
    private notesService: NotesService,
    private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => CreateNoteResponse)
  createNote(
    @GetCurrentUserId() userId: string,
    @Args('noteInput') noteInput: noteInput,
  ) {
    return this.notesService.create(userId, noteInput);
  }

  @Subscription(() => CreateNoteResponse)
  noteCreated(){
    return this.pubSub.asyncIterator('noteCreated');
  }
}
