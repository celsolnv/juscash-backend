import { PublicationStatus } from "../../../entities/Publication";
import { PaginationParams } from "../../../utils/helpers/PaginationHelperMethod";

export interface IListAllPublicationsDTO extends PaginationParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  status?: PublicationStatus;
}