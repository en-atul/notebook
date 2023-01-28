import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType({ description: 'Login user input object type.' })
export class loginInput {
  @Field(() => String, { description: 'User Email' })
  email: string;

  @MinLength(6)
  @Field(() => String, { description: 'User Password' })
  password: string;
}
