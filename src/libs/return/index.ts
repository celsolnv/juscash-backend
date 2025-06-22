/* eslint-disable @typescript-eslint/no-explicit-any */

import { Response } from 'express';
import {
  HttpException,
  HttpStatus
} from '../../utils/exceptions/HttpException';

export type Resolve = {
  status: number;
  success: boolean;
  buffer?: Buffer;
  data?: any;
  message?: string;
};

export const send = (res: Response, resolve: Resolve) => {
  if (resolve.success) {
    return res.status(resolve.status || HttpStatus.OK).send(resolve);
  } else {
    const objectError: Omit<Resolve, 'entity'> & { entity?: string } = {
      status: resolve.status,
      success: resolve.success
    };

    resolve.message && (objectError.message = resolve.message);
    resolve.data && (objectError.data = resolve.data);

    return res.status(resolve.status || 400).send(objectError);
  }
};

export const error500 = (res: Response, err: any) => {
  if (err instanceof HttpException) {
    return send(res, {
      status: err.status,
      message: err.message,
      success: false
    });
  }

  console.error('ERROR 500:', err);

  return send(res, {
    status: 500,
    success: false,
    message: 'Internal Server Error'
  });
};
