import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
@ObjectType()
export class SignUserInfo implements Partial<User> {
  @Field(() => Number)
  id!: number;
  @Field(() => String)
  username!: string;
  @Field(() => String, { nullable: true })
  accessToken?: string;
}
