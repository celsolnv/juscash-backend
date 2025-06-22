import { ValidateDataHelperMethod } from '../../../../utils/helpers/ValidateDataHelperMethod';
import { Resolve } from '../../../../libs/return/index';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { IRedefinePasswordDTO } from '../../dtos/IRedefinePasswordDTO';
import {
  HttpException,
  HttpStatus
} from '../../../../utils/exceptions/HttpException';
import { StatusEnum } from '../../../../entities/User';
import { IMailProvider } from '../../../../providers/MailProvider';
import moment from 'moment-timezone';
import { GetCurrentDateHelperMethodWithTime } from '../../../../utils/helpers/GetCurrentDateHelperMethod';
import { MakeRecoveryCodeHelperMethod } from '../../../../utils/helpers/MakeRecoveryCodeHelperMethod';
import { join } from 'path';
import { Paths } from '../../../../configs/Paths';
import { EnvSettings } from '../../../../configs/Env';
import { TokenProvider } from '../../../../providers/TokenProvider';

class RedefinePasswordService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly tokenProvider: TokenProvider,
    private readonly mailProvider: IMailProvider
  ) { }

  private readonly templatePath = join(
    Paths.TEMPLATES,
    'RedefinePasswordTemplate.hbs'
  );

  public async execute(data: IRedefinePasswordDTO): Promise<Resolve> {
    await this.validateData(data);

    const user = await this.repository.findByEmail(data.email);

    if (!user) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'e não encontrado');
    }

    if (user.status === StatusEnum.inactive) {
      throw new HttpException(
        HttpStatus.UNAUTHORIZED,
        'e inativo, entre em contato com o suporte'
      );
    }

    const resetCode = MakeRecoveryCodeHelperMethod();
    const resetCodeExpiration = this.getResetCodeExpiration();

    const expiresIn = 86400;

    const { token } = this.tokenProvider.generateToken(
      `${user.id}`,
      expiresIn,
      {
        recovery: true
      }
    );

    const redefineLink =
      EnvSettings.FRONTEND_URL + `/redefinir-senha?code=${resetCode}&email=${user.email}`;

    await this.repository.updateResetCode(`${user.id}`, {
      resetCode,
      resetCodeExpiration,
      resetToken: token
    });

    const logoUrl = `https://www.juscash.com.br/wp-content/themes/s3/assets/img/logo-white.svg`;

    const variables = {
      name: user.name,
      resetCode,
      redefineLink,
      logoUrl
    };

    await this.mailProvider
      .sendMail({
        templatePath: this.templatePath,
        subject: 'Redefinição de senha',
        to: user.email,
        data: variables
      })
      .catch((err) => {
        console.error(err);
        throw new HttpException(
          HttpStatus.BAD_REQUEST,
          'Erro ao enviar email de redefinição de senha'
        );
      });

    return {
      status: 200,
      success: true,
      message: 'Email de redefinição de senha enviado com sucesso'
    };
  }

  private getResetCodeExpiration(days = 1): string {
    const currentDate = GetCurrentDateHelperMethodWithTime();
    return moment(currentDate).add(days, 'days').format('YYYY-MM-DD HH:mm:ss');
  }

  public async validateData(data: IRedefinePasswordDTO) {
    return ValidateDataHelperMethod(IRedefinePasswordDTO, data);
  }
}

export { RedefinePasswordService };
