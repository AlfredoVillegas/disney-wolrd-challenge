import { SendGridEmailSender } from './adapters/SendGridEmailSender';
import { SendWelcomeUserEmail } from './services/SendWelcomeUserEmail';

export const sendWelcomeUserEmailService = new SendWelcomeUserEmail(new SendGridEmailSender());
