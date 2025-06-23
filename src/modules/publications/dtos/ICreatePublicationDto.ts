import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  Matches,
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
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "value_principal must be a valid decimal number",
  })
  value_principal?: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "value_interest must be a valid decimal number",
  })
  value_interest?: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "value_attorney must be a valid decimal number",
  })
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
