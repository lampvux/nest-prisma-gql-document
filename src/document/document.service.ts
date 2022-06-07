import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Document } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  /* async count<T extends Prisma.DocumentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentFindManyArgs>,
  ): Promise<number> {
    return this.prisma.document.count(args);
  }
 */
  async create<T extends Prisma.DocumentCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentCreateArgs>,
  ): Promise<Document> {
    return this.prisma.document.create<T>(args);
  }

  async findMany<T extends Prisma.DocumentFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentFindManyArgs>,
  ): Promise<Document[]> {
    return this.prisma.document.findMany(args);
  }

  async findAll(): Promise<Document[]> {
    return this.prisma.document.findMany();
  }

  async findOne<T extends Prisma.DocumentFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentFindUniqueArgs>,
  ): Promise<Document | null> {
    return this.prisma.document.findUnique(args);
  }

  async update<T extends Prisma.DocumentUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentUpdateArgs>,
  ): Promise<Document> {
    return this.prisma.document.update<T>(args);
  }

  async delete<T extends Prisma.DocumentDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.DocumentDeleteArgs>,
  ): Promise<Document> {
    return this.prisma.document.delete(args);
  }
}
