import { config } from 'dotenv';
import { Email } from '../Email';
import { EmailSender } from '../EmailSender';
config();

const sgMail = require('@sendgrid/mail');
const apiKeySendGrid = process.env.SENDGRID_API_KEY || '';

export class SendGridEmailSender implements EmailSender {
  constructor() {}
  async send(email: Email): Promise<void> {
    try {
      sgMail.setApiKey(apiKeySendGrid);
      await sgMail.send({
        to: email.toEmail,
        from: email.from,
        subject: email.subject,
        text: email.body
      });
    } catch (err) {
      console.log(err);
    }
  }
}
