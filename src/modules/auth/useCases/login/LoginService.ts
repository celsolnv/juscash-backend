import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { TokenProvider } from '../../../../providers/TokenProvider';
import { HashProvider } from '../../../../providers/HashProvider';
import { ILoginDTO } from '../../dtos/ILoginDTO';
import {
  HttpException,
  HttpStatus
} from '../../../../utils/exceptions/HttpException';
import { StatusEnum } from '../../../../entities/User';

class LoginService {
  constructor(
    private readonly Repository: IUserRepository,
    private readonly tokenProvider: TokenProvider,
    private readonly hashProvider: HashProvider
  ) { }

  public async execute(data: ILoginDTO): Promise<Resolve> {
    await this.validateData(data);

    const { email, password, remember } = data;

    const user = await this.Repository.findByEmail(email, true);

    if (!user) {
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        'Email ou senha incorretos'
      );
    }

    if (user.status === StatusEnum.inactive) {
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        'Usuário inativo. Entre em contato com o suporte'
      );
    }

    const passwordMatch = this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        'Email ou senha incorretos'
      );
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    let expiresIn = 86400;

    if (remember) {
      expiresIn = 2592000;
    }

    const token = this.tokenProvider.generateToken(`${user.id}`, expiresIn);

    return {
      success: true,
      status: HttpStatus.OK,
      message: 'Login realizado com sucesso',
      data: {
        ...token,
        user: userData
      }
    };
  }

  public async validateData(data: ILoginDTO) {
    return ValidateDataHelperMethod(ILoginDTO, data);
  }
}

export { LoginService };
