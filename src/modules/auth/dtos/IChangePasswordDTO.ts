import { IsNotEmpty, IsString } from 'class-validator';

abstract class IChangePasswordDTO {
  @IsNotEmpty({ message: 'Código de redefinição é obrigatório' })
  @IsString({ message: 'Código de redefinição inválido' })
  resetCode: string;

  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @IsString({ message: 'Nova senha inválida' })
  newPassword: string;
}

export { IChangePasswordDTO };
