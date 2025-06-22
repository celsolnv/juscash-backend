/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate } from 'class-validator';
import { HttpException, HttpStatus } from '../exceptions/HttpException';

const ValidateDataHelperMethod = async (interfaceData: any, data: any) => {
  class DataStructure extends interfaceData {
    constructor(data: any) {
      super();
      Object.assign(this, data);
    }
  }

  const dataStructure = new DataStructure(data);

  const errors = await validate(dataStructure, {
    whitelist: true,
    forbidNonWhitelisted: true
  });

  if (errors.length > 0) {
    const { constraints } = errors[0];

    if (constraints) {
      const values = Object.values(constraints);

      const errorMessage = values[0];

      throw new HttpException(HttpStatus.BAD_REQUEST, errorMessage);
    }
  }
};

export { ValidateDataHelperMethod };
