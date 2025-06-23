import { StatusEnum } from '../../../entities/User';
import { PaginationParams } from '../../../utils/helpers/PaginationHelperMethod';

interface IListAllUsersDTO extends PaginationParams {
  search?: string;
  status?: StatusEnum;
}

export { IListAllUsersDTO };
