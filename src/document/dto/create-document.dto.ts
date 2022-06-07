import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDocumentDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
}
