import {
  IsEnum,
  IsNotEmpty,
} from "class-validator";
import { PublicationStatus } from "../../../entities/Publication";

export class IUpdatePublicationDto {
  @IsNotEmpty()
  @IsEnum(PublicationStatus)
  status?: PublicationStatus = PublicationStatus.NEW;
}
