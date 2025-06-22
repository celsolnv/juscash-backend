import { IsNotEmpty, IsString } from 'class-validator';

abstract class IRedefinePasswordDTO {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsString({ message: 'Email inválido' })
  email: string;
}

export { IRedefinePasswordDTO };
