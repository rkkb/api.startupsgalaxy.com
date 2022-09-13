import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';

import {
  addLike,
  addView,
  createUser,
  findUser,
  findUserById,
  getDealsCount,
  getInvestorsCount,
  getLike,
  getLikesCount,
  getStartsupCount,
  getViewsCount,
  getViewsCountForInterval,
  IUpadteUserPayload,
  updatePassword,
  updateUser,
} from './user.resources';
import { getDeals } from '../deal/deal.resources';
import { getStartups } from '../startup/startup.resources';

let dirname = __dirname;
dirname = dirname.split('src')[0];

export async function handleUserSignUp(req: Request, res: Response) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hash;
    const query = await createUser(req.body);
    const user: any = query.toJSON();
    const token = jwt.sign(
      { id: user.id },
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
      { id: query.id },
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

export async function handleForgotPassword(req: Request, res: Response) {
  try {
    if (req.body.userInfo) {
      const token = jwt.sign(
        { id: req.body.userInfo.id },
        'forgot-password-token-startups-galaxy-startupsgalaxY#234',
        { expiresIn: '10m' },
      );

      return res.status(200).json({
        message: 'Email send successfull',
        data: { token },
      });
    }
    return Promise.reject();
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleNewPassword(req: Request, res: Response) {
  try {
    const decoded: any = jwt.verify(
      req.body.token,
      'forgot-password-token-startups-galaxy-startupsgalaxY#234',
    );

    if (decoded?.id) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hash;
      req.body.id = decoded.id;

      await updatePassword(req.body);

      return res.status(200).json({
        message: 'Password updated successfull',
      });
    }
    return Promise.reject();
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleChangePassword(req: Request, res: Response) {
  try {
    console.log('lokesh userp ', req.body);
    const query: any = await findUserById(req.body?.userInfo);
    if (!query?.id) {
      return res.status(400).json({
        message: "User does't exist",
      });
    }

    const comparePasswrod = bcrypt.compareSync(
      req.body.password,
      query.password,
    );

    if (!comparePasswrod) {
      return res.status(400).json({
        message: "Old Password does't match",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);
    await updatePassword({ id: query.id, password: hash });

    return res.status(200).json({
      message: 'Password updated successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetAddedProfiles(req: Request, res: Response) {
  try {
    const data = await Promise.all([
      getStartups({
        createdBy: req.body.userInfo.id,
        order: [['createdAt', 'DESC']],
      }),
      getDeals({
        createdBy: req.body.userInfo.id,
        order: [['createdAt', 'DESC']],
      }),
    ]);
    return res.status(200).json({
      data: { startups: data[0], deals: data[1] },
      message: 'Added profiles fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleRedirectToDashboard(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1] as string;
  return res.redirect(`${process.env.DASHBOARD_WEB_URL}?token=${token}`);
}

export async function handleUserUpdate(req: Request, res: Response) {
  try {
    const {
      about,
      countryId,
      logo,
      mobile,
      linkedin,
      twitter,
      instagram,
      facebook,
    } = req.body;
    const payload: IUpadteUserPayload = { about, countryId };
    if (logo) payload.logo = logo;
    if (mobile) payload.mobile = mobile;
    if (linkedin) payload.linkedin = linkedin;
    if (twitter) payload.twitter = twitter;
    if (instagram) payload.instagram = instagram;
    if (facebook) payload.facebook = facebook;

    await updateUser(payload, { id: req.body.userInfo.id });

    return res.status(200).json({
      message: 'User updated successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleUserUpdateProfileImg(req: Request, res: Response) {
  try {
    const { body } = req;
    const { files } = req;
    const logoFile: any = files.logo[0];

    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const logoName = `logo-${body.userInfo.id}-${uniquePrefix}-${logoFile?.originalname}`;
    await fs.writeFile(
      `${dirname}public/images/${logoName}`,
      logoFile?.buffer as any,
    );
    await updateUser({ logo: logoName }, { id: req.body.userInfo.id });

    return res.status(201).json({
      message: 'User Img updated successfull',
      data: { logo: logoName },
    });
  } catch (ex: any) {
    console.log('ex', ex);
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleView(req: Request, res: Response) {
  try {
    const data = await addView({ ...req.body, viewBy: req.body?.userInfo?.id });
    return res
      .status(201)
      .json({ data, message: 'Count updated successfully' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleViewCount(req: Request, res: Response) {
  try {
    const data: any = await getViewsCount({ userId: req.body.userInfo.id });

    return res
      .status(200)
      .json({ data, message: 'View count fetched successfully' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleViewCountForInterval(req: Request, res: Response) {
  try {
    const data: any = await getViewsCountForInterval({ userId: req.body.userInfo.id });

    return res
      .status(200)
      .json({ data, message: 'View count fetched successfully' });
  } catch (_ex) {
    console.log('ex', _ex);
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleLike(req: Request, res: Response) {
  try {
    const query: any = { likedBy: req.body?.userInfo?.id };
    if (req.body?.startupId) query.startupId = req.body?.startupId;
    if (req.body?.investorId) query.investorId = req.body?.investorId;
    if (req.body?.dealId) query.dealId = req.body?.dealId;

    const found = await getLike({ where: query });

    if (!found) {
      await addLike({
        ...req.body,
        likedBy: req.body?.userInfo?.id,
      });
    }
    return res.status(201).json({ message: 'Like updated successfully' });
  } catch (_ex) {
    console.log('ex abc', _ex);
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleLikeCount(req: Request, res: Response) {
  try {
    const data: any = await getLikesCount({ userId: req.body.userInfo.id });

    return res
      .status(200)
      .json({ data, message: 'Like count fetched successfully' });
  } catch (_ex) {
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}

export async function handleTotalStats(req: Request, res: Response) {
  try {
    const likesCountPromise = getLikesCount({
      userId: req.body.userInfo.id,
    });
    const viewsCountPromise = getViewsCount({
      userId: req.body.userInfo.id,
    });

    const startupCountPromise = getStartsupCount({
      userId: req.body.userInfo.id,
    });

    const investorCountPromise = getInvestorsCount({
      userId: req.body.userInfo.id,
    });
    const dealCountPromise = getDealsCount({
      userId: req.body.userInfo.id,
    });
    const [likesCount, viewsCount, startupCount, investorCount, dealCount] = (await Promise.all([
      likesCountPromise,
      viewsCountPromise,
      startupCountPromise,
      investorCountPromise,
      dealCountPromise,
    ])) as any;

    return res.status(200).json({
      data: {
        likesCount,
        viewsCount,
        profilesCount: startupCount + investorCount + dealCount,
      },
      message: 'Stats fetched successfully',
    });
  } catch (_ex) {
    console.log('ex _', _ex);
    return res
      .status(500)
      .json({ message: 'Something went wrong! Please try again' });
  }
}
