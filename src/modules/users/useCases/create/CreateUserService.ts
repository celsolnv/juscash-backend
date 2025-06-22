import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserDTO } from '../../dtos/ICreateDTO';
import {
  HttpException,
  HttpStatus
} from '../../../../utils/exceptions/HttpException';

export class CreateUserService {
  constructor(
    private readonly repository: IUserRepository,
  ) { }

  public async execute(
    data: ICreateUserDTO,
  ): Promise<Resolve> {
    await this.validateData(data);

    const { email } = data;


    const existUserByEmail = await this.repository.findByEmail(email);

    if (existUserByEmail) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        'Usuário já cadastrado com esse email'
      );
    }

    const user = await this.repository.create(data);
    return { status: 201, data: user, success: true };
  }

  public async validateData(data: ICreateUserDTO) {
    await ValidateDataHelperMethod(ICreateUserDTO, data);

    const { password } = data;

    if (!password) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'Senha é obrigatória');
    }
  }
}

