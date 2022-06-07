import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DocumentResolver } from './document.resolver';
import { UploadLibraryModule, UploadLibraryService } from '@app/upload-library';

@Module({
  imports: [UploadLibraryModule],
  controllers: [DocumentController],
  providers: [UploadLibraryService, DocumentService, DocumentResolver],
})
export class DocumentModule {}
