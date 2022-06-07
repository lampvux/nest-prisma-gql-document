import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ObjectType, Field, Int } from '@nestjs/graphql';

export enum DocumentStatus {
  PENDING,
  LOCKED,
  UNLOCKED,
}
@ObjectType()
class Document {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  readonly id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  size: string;

  @IsString()
  path: string;

  @IsEnum(DocumentStatus)
  status: DocumentStatus;

  @IsInt()
  authorId: number;
}

export { Document };
