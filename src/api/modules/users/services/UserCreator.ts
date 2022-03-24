import * as bcrypt from 'bcrypt';
import { sendWelcomeUserEmailService } from '../../emails/initEmailServices';
import { UserEmailAlreadyExists } from '../Errors';
import { User } from '../models/UsersModels';

export class UserCreator {
  public async execute(id: string, email: string, name: string, password: string): Promise<void> {
    const userEmailExist = await User.findOne({
      where: { email: email }
    });
    if (userEmailExist) throw new UserEmailAlreadyExists(email);

    const passwordHash = await this.encryptPassword(password);

    await User.create({ name: name, id: id, email: email, password: passwordHash });
    this.userRegisteredEvent(email);
  }

  private async encryptPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  private async userRegisteredEvent(email: string) {
    sendWelcomeUserEmailService.execute(email);
  }
}
