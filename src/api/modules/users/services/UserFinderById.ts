import { UserNotExist } from '../Errors';
import { UserResponse } from '../models/UserResponse';
import { User } from '../models/UsersModels';

export class UserFinderById {
  public async execute(id: string): Promise<UserResponse> {
    const user = await User.findByPk(id);
    if (!user) throw new UserNotExist(id);
    return { id: user.id, name: user.name, email: user.email };
  }
}
