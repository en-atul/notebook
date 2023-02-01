import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Note request object type.' })
export class noteInput {
  @Field(() => String, { description: 'Note Id' })
  id?: string;

  @Field(() => String, { description: 'Note Title' })
  title?: string;

  @Field(() => String, { description: 'Note Content' })
  content?: string;
}
