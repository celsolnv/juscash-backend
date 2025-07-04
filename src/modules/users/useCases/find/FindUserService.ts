import { Resolve } from '../../../../libs/return/index';
import {
  HttpException,
  HttpStatus
} from '../../../../utils/exceptions/HttpException';
import { IUserRepository } from '../../repositories/IUserRepository';

class FindUserService {
  constructor(private readonly repository: IUserRepository) { }

  public async execute(id: string): Promise<Resolve> {
    const user = await this.repository.findByIdComplete(id);

    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Usuário não encontrado');
    }

    return { status: 200, data: user, success: true };
  }
}

export { FindUserService };
