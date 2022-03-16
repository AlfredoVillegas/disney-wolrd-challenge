import * as bcrypt from 'bcrypt';
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
  }

  private async encryptPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
