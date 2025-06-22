import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { IChangePasswordDTO } from '../../dtos/IChangePasswordDTO';
import {
  HttpException,
  HttpStatus
} from '../../../../utils/exceptions/HttpException';
import moment from 'moment-timezone';
import { StatusEnum } from '../../../../entities/User';

class ChangePasswordService {
  constructor(private readonly repository: IUserRepository) { }

  public async execute(
    data: IChangePasswordDTO,
  ): Promise<Resolve> {
    await this.validateData(data);

    const user = await this.repository.findByEmail(data.email, true);

    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'e não encontrado');
    }

    if (user.status === StatusEnum.inactive) {
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        'e inativo, entre em contato com o suporte'
      );
    }

    if (String(user.resetCode) !== String(data.resetCode)) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        'Código de redefinição inválido'
      );
    }

    const isExpired = this.verifyDate(user.resetCodeExpiration);

    if (isExpired) {
      throw new HttpException(
        HttpStatus.BAD_REQUEST,
        'Código de redefinição expirado'
      );
    }

    await this.repository.updatePassword(`${user.id}`, data.password);

    return {
      status: 200,
      success: true,
      message: 'Senha alterada com sucesso'
    };
  }

  private verifyDate(resetCodeExpiration: string) {
    const currentDate = moment()
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss');
    const formattedResetCodeExpiration = moment(resetCodeExpiration)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss');

    return moment(currentDate).isAfter(formattedResetCodeExpiration);
  }

  public async validateData(data: IChangePasswordDTO) {
    return ValidateDataHelperMethod(IChangePasswordDTO, data);
  }
}

export { ChangePasswordService };
