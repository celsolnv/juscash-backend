import { IsNotEmpty, IsString } from 'class-validator';

abstract class IChangePasswordDTO {
  @IsNotEmpty({ message: 'Código de redefinição é obrigatório' })
  @IsString({ message: 'Código de redefinição inválido' })
  resetCode: string;

  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @IsString({ message: 'Nova senha inválida' })
  password: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsString({ message: 'E-mail inválido' })
  email: string;
}

export { IChangePasswordDTO };
