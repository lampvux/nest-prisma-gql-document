import {
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ID } from '@nestjs/graphql';
import { Document } from './entities/document.entity';
import { DocumentService } from './document.service';
import { Prisma } from '@prisma/client';
import { currentUser } from '../user/user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { SignUserInfo } from 'src/auth/sign-user-info';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { GraphQLUpload, FileUpload } from 'graphql-upload';


@Resolver(() => Document)
@UseGuards(GqlAuthGuard)
export class DocumentResolver {
  constructor(protected readonly documentService: DocumentService) {}

  @Query(() => [Document])
  async documents(
    @currentUser() user: SignUserInfo,
    @Args() args: Prisma.DocumentFindManyArgs,
  ) {
    return this.documentService.findMany({
      ...args,
      where: { authorId: user.id },
    });
  }

  @Query(() => Document, { nullable: true })
  async document(@Args() args: Prisma.DocumentFindUniqueArgs) {
    const result = await this.documentService.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @Mutation(() => Document)
  async createDocument(
    @currentUser() user: SignUserInfo,
    @Args('data') data: CreateDocumentDto,
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ) {
    try {
      
      const {
        name,
        size,
        path,
        etag,
      } = await 

      return await this.documentService.create({
        data: {
          name: filename,
          size: fileSize,
          path: filePath,
          etag: etag,
          authorId: user.id,
          ...data,
        },
      });
    } catch (error) {
      throw new ForbiddenException('error: ', error);
    }
  }
  @Mutation(() => Document)
  async updateDocument(
    @Args({ name: 'id', type: () => ID }) id: number,
    @currentUser() user: SignUserInfo,
    @Args('data') data: UpdateDocumentDto,
  ) {
    const document = await this.documentService.findOne({ where: { id: id } });
    if (document.authorId !== user.id) {
      throw new UnauthorizedException('ACCESS_DENIED');
    }
    return this.documentService.update({ where: { id: id }, data: data });
  }

  @Mutation(() => Document)
  async deleteDocument(
    @currentUser() user: SignUserInfo,
    @Args('where') where: Prisma.DocumentDeleteArgs,
  ) {
    const document = await this.documentService.findOne(where);
    if (document.authorId !== user.id) {
      throw new UnauthorizedException('ACCESS_DENIED');
    }
    return this.documentService.delete(where);
  }
}
