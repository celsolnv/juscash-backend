import {
  StatusEnum,
} from '../entities/User';
import { Files } from '../interfaces/Files';

declare global {
  namespace Express {
    interface Request {
      newFiles: Files[];
      user: {
        id: number;
        name: string;
        email: string;
        status: StatusEnum;
      };
    }
  }
}
