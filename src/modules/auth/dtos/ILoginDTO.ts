import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

abstract class ILoginDTO {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsString({ message: 'Email deve ser uma string' })
  abstract email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsString({ message: 'Senha deve ser uma string' })
  abstract password: string;

  @IsOptional()
  @IsBoolean({ message: 'Lembrar de mim inválido' })
  abstract remember: boolean;
}

export { ILoginDTO };
