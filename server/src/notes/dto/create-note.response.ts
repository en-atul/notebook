import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Craete Note model' })
export class NoteResponse {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}
