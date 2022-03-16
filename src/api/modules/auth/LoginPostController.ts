import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../users/models/UsersModels';

export async function loginPostController(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email }
    });

    const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;
    if (!isPasswordCorrect) {
      res.status(401).json({ errorMessage: 'invalid user or password' });
      return;
    }

    const userForToken = {
      id: user?.id
    };

    const token = jwt.sign(userForToken, process.env.SECRET_KEY || 'Dev');

    res.status(200).json({ name: user?.name, token: token });
  } catch (err: any) {
    res.status(500).json({ errorMessage: err.message });
  }
}
