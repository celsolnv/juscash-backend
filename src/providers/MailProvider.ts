/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line max-classes-per-file
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EnvSettings } from '../configs/Env';
import { ITemplateProvider } from './TemplateProvider';

abstract class IMailProvider {
  abstract sendMail(data: {
    to: string;
    subject: string;
    data: any;
    templatePath: string;
  }): Promise<void>;
}

class NodemailerProvider implements IMailProvider {
  constructor(private readonly templateProvider: ITemplateProvider) { }

  public async sendMail({
    to,
    subject,
    data,
    templatePath
  }: {
    to: string;
    subject: string;
    data: any;
    templatePath: string;
    attachment: string;
    attachmentName: string;
    attachments?: {
      filename: string;
      path: string;
    }[];
  }): Promise<void> {
    const html = await this.generateTemplate(templatePath, data);

    const message: Mail.Options = {
      to,
      from: `Juscash Mailing <${EnvSettings.SMTP_USER}>`,
      subject,
      html
    };

    const transportData: SMTPTransport.Options = {
      service: EnvSettings.SMTP_SERVICE,
      host: EnvSettings.SMTP_HOST,
      port: +EnvSettings.SMTP_PORT,
      secure: true,
      auth: {
        user: EnvSettings.SMTP_USER,
        pass: EnvSettings.SMTP_PASSWORD
      }
    };

    // const transportData: SMTPTransport.Options = {
    //   host: EnvSettings.SMTP_HOST,
    //   port: +EnvSettings.SMTP_PORT,
    //   secure: EnvSettings.SMTP_SECURE === 'true',
    //   auth: {
    //     user: EnvSettings.SMTP_USER,
    //     pass: EnvSettings.SMTP_PASSWORD
    //   }
    // };

    const transport = nodemailer.createTransport(transportData);

    await transport.sendMail(message);
  }

  private async generateTemplate(
    templatePath: string,
    variables: any
  ): Promise<string> {
    const template = await this.templateProvider.parse(templatePath, variables);

    return template;
  }
}

export { NodemailerProvider, IMailProvider };
