import { PublicationStatus } from "../../../entities/Publication";
import { PaginationParams } from "../../../utils/helpers/PaginationHelperMethod";

export interface IListAllPublicationsDTO extends PaginationParams {
  search?: string;
  status?: PublicationStatus;
}