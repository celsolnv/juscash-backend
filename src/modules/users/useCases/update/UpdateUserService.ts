import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICreateUserDTO } from '../../dtos/ICreateDTO';
import {
  HttpException,
  HttpStatus
} from '../../../../utils/exceptions/HttpException';

class UpdateUserService {
  constructor(
    private readonly repository: IUserRepository,
  ) { }

  public async execute(
    id: string,
    data: ICreateUserDTO,
  ): Promise<Resolve> {
    await this.validateData(data);

    const userExists = await this.repository.findById(id);

    if (!userExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Usuário não encontrado');
    }

    const {  email } = data;

    const existUserByEmail = await this.repository.findByEmail(email);

    if (existUserByEmail && +existUserByEmail.id !== +userExists.id) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        'Usuário já cadastrado com esse email'
      );
    }

    if (!data.password) {
      delete data.password;
    }

    await this.repository.update(id, data);
    return { status: 204, success: true };
  }

  public async validateData(data: ICreateUserDTO) {
    await ValidateDataHelperMethod(ICreateUserDTO, data);
  }


}

export { UpdateUserService };
