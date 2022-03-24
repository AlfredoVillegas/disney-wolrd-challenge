import { EmailSender } from '../EmailSender';
import { WelcomeUserEmail } from '../WelcomeUserEmail';

export class SendWelcomeUserEmail {
  constructor(private sender: EmailSender) {}
  async execute(toEmail: string): Promise<void> {
    const email = new WelcomeUserEmail(toEmail);
    this.sender.send(email);
  }
}
