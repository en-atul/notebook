import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType({ description: 'Signup user input object type.' })
export class signupInput {
  @Field(() => String, { description: 'User Name' })
  fullname: string;

  @Field(() => String, { description: 'User Email' })
  email: string;

  @MinLength(6)
  @Field(() => String, { description: 'User Password' })
  password: string;
}
