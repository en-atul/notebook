import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth model' })
export class AuthResponse {
  @Field()
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
