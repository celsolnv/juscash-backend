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
  @IsString({ message: "O número do processo deve ser uma string" })
  case_number?: string;

  @IsOptional()
  @IsString({ message: "O nome do autor deve ser uma string" })
  plaintiff?: string;

  @IsOptional()
  @IsString({ message: "O nome do advogado deve ser uma string" })
  attorney?: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "O valor principal deve ser um número decimal válido",
  })
  value_principal?: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "O valor dos juros deve ser um número decimal válido",
  })
  value_interest?: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: "O valor dos honorários deve ser um número decimal válido",
  })
  value_attorney?: string;

  @IsNotEmpty({ message: "O texto completo é obrigatório" })
  @IsString({ message: "O texto completo deve ser uma string" })
  full_text: string;

  @IsOptional()
  @IsString({ message: "O nome do réu deve ser uma string" })
  defendant?: string = "Instituto Nacional do Seguro Social - INSS";

  @IsOptional()
  @IsEnum(PublicationStatus, { message: "Status inválido" })
  status?: PublicationStatus = PublicationStatus.NEW;

  @IsOptional()
  @IsString({ message: "A data de publicação deve ser uma string" })
  published_at: string;
}
