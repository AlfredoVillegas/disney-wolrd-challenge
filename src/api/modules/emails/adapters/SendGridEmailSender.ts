import { Email } from '../Email';
import { EmailSender } from '../EmailSender';

const sgMail = require('@sendgrid/mail');
const apiKeySendGrid = process.env.SENDGRID_API_KEY || '';

export class SendGridEmailSender implements EmailSender {
  constructor() {
    sgMail.setApiKey(apiKeySendGrid);
  }
  async send(email: Email): Promise<void> {
    sgMail.send({
      to: email.toEmail,
      from: email.from,
      subject: email.subject,
      text: email.body
    });
  }
}
