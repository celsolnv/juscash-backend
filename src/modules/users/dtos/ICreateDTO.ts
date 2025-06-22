import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  StatusEnum,
} from '../../../entities/User';

abstract class ICreateUserDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @IsString({ message: 'Nome inválido' })
  name: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: 'Status inválido' })
  status?: StatusEnum;

  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsString({ message: 'Email inválido' })
  email: string;

  @IsOptional()
  @IsString({ message: 'Senha inválida' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password?: string;

}

export { ICreateUserDTO };
