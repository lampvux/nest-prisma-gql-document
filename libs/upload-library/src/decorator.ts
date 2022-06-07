import { FileUpload } from 'graphql-upload';
// import { Express } from 'express';
export const isFileUploadGQL = (arg: any): arg is FileUpload => {
  return arg && arg.createReadStream;
};
export const isFileUploadMulter = (arg: any): arg is Express.Multer.File => {
  return arg && arg.originalname && arg.fieldname;
};
