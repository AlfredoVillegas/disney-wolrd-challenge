import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { responseError, responseSuccess } from '../../../shared/network/response';
import { User } from '../users/models/UsersModels';

export async function loginPostController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email }
    });

    const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;
    if (!isPasswordCorrect) {
      return responseError(res, 401, 'invalid user or password');
    }

    const userForToken = {
      id: user?.id
    };

    const token = jwt.sign(userForToken, process.env.SECRET_KEY || 'Dev');
    responseSuccess(res, 200, { name: user?.name, token });
  } catch (err: any) {
    responseError(res, 500, err.message);
  }
}
