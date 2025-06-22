/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line max-classes-per-file
import { randomBytes } from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import { HttpException, HttpStatus } from '../utils/exceptions/HttpException';
import { Paths } from '../configs/Paths';

// eslint-disable-next-line max-classes-per-file
abstract class StorageProvider {
  abstract upload(): multer.Multer;
}

abstract class ValidateFile {
  abstract validate(request: any, file: any, callback: any): void;
}

class MemberEntitieValidator extends ValidateFile {
  validate(request: any, file: any, callback: any) {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf'
    ];

    if (!allowedMimes.includes(file.mimetype)) {
      return callback(
        new HttpException(HttpStatus.BAD_REQUEST, 'Tipo de arquivo inválido')
      );
    }

    const fileSize = parseInt(request.headers['content-length'], 10);

    if (fileSize > 10485760) {
      return callback(
        new HttpException(HttpStatus.TOO_LARGE, 'Arquivo muito grande')
      );
    }

    callback(null, true);
  }
}

class MulterStorageProvider extends StorageProvider {
  validatorFile: ValidateFile;

  constructor(validatorFile: ValidateFile) {
    super();
    this.validatorFile = validatorFile;
  }

  public upload(): multer.Multer {
    const uploadFolder = Paths.UPLOADS;

    return multer({
      limits: { fileSize: 10485760 },
      fileFilter: (req: Request, file, callback) => {
        const contentLength = req.headers['content-length'] as string;
        const fileSize = parseInt(contentLength, 10);

        if (fileSize > 10485760) {
          return callback(
            new HttpException(HttpStatus.TOO_LARGE, 'File too large')
          );
        }

        return this.validatorFile.validate(req, file, callback);
      },
      storage: multer.diskStorage({
        destination: (req, file, callback) => callback(null, uploadFolder),
        filename(request, file, callback) {
          const fileHash = randomBytes(10).toString('hex');

          const filename = `${fileHash}-${file.originalname}`;

          callback(null, filename);
        }
      })
    });
  }
}

export { MulterStorageProvider, MemberEntitieValidator };
