import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { createUser, findUser } from './user.resources';

export async function handleUserSignUp(req: Request, res: Response) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const query = await createUser(req.body);
    const user: any = query.toJSON();
    const token = jwt.sign(
      { userId: user.id },
      'startups-galaxy-startupsgalaxY#234',
      { expiresIn: '30d' },
    );

    return res.status(201).json({
      message: 'Sign up successfull',
      data: { id: user.id, token },
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleUserSignIn(req: Request, res: Response) {
  try {
    const query: any = await findUser(req.body);
    if (!query?.id) {
      return res.status(400).json({
        message: "Email does't exist",
      });
    }

    const comparePasswrod = bcrypt.compareSync(
      req.body.password,
      query.password,
    );

    if (!comparePasswrod) {
      return res.status(400).json({
        message: "Email/Password does't match",
      });
    }

    const token = jwt.sign(
      { userId: query.id },
      'startups-galaxy-startupsgalaxY#234',
      { expiresIn: '30d' },
    );

    return res.status(200).json({
      message: 'Sign in successfull',
      data: { id: query.id, token },
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
