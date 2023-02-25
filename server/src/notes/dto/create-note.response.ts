import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Create Note model' })
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
