import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Tokens' })
export class RefreshTokenResponse {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
