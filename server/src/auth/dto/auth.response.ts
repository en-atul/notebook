import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth model' })
export class AuthResponse {
  @Field(() => ID, { description: 'A unique identifier' }) // 👈
  id: string;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
