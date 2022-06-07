import {
  ForbiddenException,
  Injectable,
  UseInterceptors,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { writeFile } from 'fs/promises';
import md5Hex from 'md5-hex';
import { join } from 'path';

import { isFileUploadGQL, isFileUploadMulter } from './decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class UploadLibraryService {
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/',
    }),
  )
  async uploadFile(file: FileUpload | Express.Multer.File) {
    try {
      const allowedFileType = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (isFileUploadGQL(file)) {
        const { filename, mimetype, createReadStream } = file;
        if (allowedFileType.indexOf(mimetype) <= -1) {
          throw new UnsupportedMediaTypeException(
            'only .pdf, .doc, .docx is allowed !',
          );
        }
        const stream = createReadStream();
        const chunks = [];
        const buffer = await new Promise<Buffer>((resolve, reject) => {
          let buff: Buffer;

          stream.on('data', function (chunk) {
            chunks.push(chunk);
          });

          stream.on('end', function () {
            buff = Buffer.concat(chunks);
            resolve(buff);
          });

          stream.on('error', reject);
        });

        const fileSize = Buffer.byteLength(buffer, 'utf8').toString();
        const etag = md5Hex(buffer);
        const filePath = join(process.cwd(), 'uploads/upload.jpg');
        await writeFile(filePath, buffer);

        return {
          name: filename,
          size: fileSize,
          path: filePath,
          etag: etag,
        };
      } else if (isFileUploadMulter(file)) {
        const {
          fieldname,
          originalname,
          mimetype,
          size,
          stream,
          destination,
          filename,
          path,
          buffer,
        } = file;
        if (allowedFileType.indexOf(mimetype) <= -1) {
          throw new UnsupportedMediaTypeException(
            'only .pdf, .doc, .docx is allowed !',
          );
        }
        const etag = md5Hex(buffer);

        return {
          name: originalname,
          size: size,
          path: path,
          etag: etag,
        };
      }
    } catch (error) {
      throw new ForbiddenException('error: ', error);
    }
  }
}
