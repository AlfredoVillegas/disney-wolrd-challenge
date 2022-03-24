import { Email } from './Email';

const CompanyEmail = process.env.EMAIL || 'example@fail.com';

export class WelcomeUserEmail extends Email {
  constructor(toEmail: string) {
    super({ from: CompanyEmail, toEmail, subject: 'Welcome', body: 'welcome to Disney World' });
  }
}
