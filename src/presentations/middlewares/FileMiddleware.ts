/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { EnvSettings } from '../../configs/Env';
import { Files } from '../../interfaces/IFiles';

const FileMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { files } = request as any;

  const filesFormatted: Files[] = [];

  if (files) {
    Object.values(files).forEach((file: any) => {
      if (Array.isArray(file)) {
        file.forEach((file: any) => {
          const fileUrl = `${EnvSettings.API_URL}/files/${file.filename}`;

          filesFormatted.push({
            filePath: file.path,
            fileOriginalName: file.originalname,
            fileUrl,
            fieldname: file.fieldname
          });
        });
      } else {
        const fileUrl = `${EnvSettings.API_URL}/files/${file.filename}`;

        filesFormatted.push({
          filePath: file.path,
          fileOriginalName: file.originalname,
          fileUrl,
          fieldname: file.fieldname
        });
      }
    });
  }

  if (request.body.data) {
    request.body = JSON.parse(request.body.data);
  }

  request.newFiles = filesFormatted;

  return next();
};

export { FileMiddleware };
