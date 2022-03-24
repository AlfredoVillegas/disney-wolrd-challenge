import { config } from 'dotenv';
import { Email } from './Email';
config();

const CompanyEmail = process.env.EMAIL || '';

export class WelcomeUserEmail extends Email {
  constructor(toEmail: string) {
    super({ from: CompanyEmail, toEmail, subject: 'Welcome', body: 'welcome to Disney World' });
  }
}
