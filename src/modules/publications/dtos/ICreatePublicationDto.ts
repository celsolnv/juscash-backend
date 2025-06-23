import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumberString,
  IsNotEmpty,
} from "class-validator";
import { PublicationStatus } from "../../../entities/Publication";

export class ICreatePublicationDto {
  @IsOptional()
  @IsString()
  case_number?: string;

  @IsOptional()
  @IsString()
  plaintiff?: string;

  @IsOptional()
  @IsString()
  attorney?: string;

  @IsOptional()
  @IsNumberString()
  value_principal?: string;

  @IsOptional()
  @IsNumberString()
  value_interest?: string;

  @IsOptional()
  @IsNumberString()
  value_attorney?: string;

  @IsNotEmpty()
  @IsString()
  full_text: string;

  @IsOptional()
  @IsString()
  defendant?: string = "Instituto Nacional do Seguro Social - INSS";

  @IsOptional()
  @IsEnum(PublicationStatus)
  status?: PublicationStatus = PublicationStatus.NEW;
}
