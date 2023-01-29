import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Craete Note model' })
export class CreateNoteResponse {
  @Field() 
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;
}
