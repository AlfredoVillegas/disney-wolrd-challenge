export class Email {
  readonly from: string;
  readonly toEmail: string;
  readonly subject: string;
  readonly body: string;

  constructor({ from, toEmail, subject, body }: { from: string; toEmail: string; subject: string; body: string }) {
    this.from = from;
    this.toEmail = toEmail;
    this.subject = subject;
    this.body = body;
  }
}
