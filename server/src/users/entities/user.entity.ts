import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User model' })
export class User {
  @Field(() => ID, { description: 'A unique identifier' }) // 👈
  id: string;

  @Field()
  fullname: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  hashedRt?: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}
