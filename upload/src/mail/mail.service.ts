import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      from: '"Faber-Castell" <' + process.env.MAIL_FROM + '>',
      subject: 'Confirmação Solicitação de KIT Escolar - Faber-Castell',
      template: './mail',
      context: {
        name,
      },
    });
  }
}
