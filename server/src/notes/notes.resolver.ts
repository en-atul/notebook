import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetCurrentUserId } from 'src/common';
import { CreateNoteResponse, noteInput } from './dto';
import { NotesService } from './notes.service';

@Resolver()
export class NotesResolver {
  constructor(private notesService: NotesService) {}

  @Mutation(() => CreateNoteResponse)
  createNote(
    @GetCurrentUserId() userId: string,
    @Args('noteInput') noteInput: noteInput,
  ) {
    return this.notesService.create(userId, noteInput);
  }
}
