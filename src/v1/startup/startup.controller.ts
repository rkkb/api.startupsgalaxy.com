import { queryGenerator } from '@util/helper';
import { Request, Response } from 'express';
import fs from 'fs/promises';
import {
  createStartup,
  createStartupTags,
  getStartup,
  getStartups,
} from './startup.resources';

let dirname = __dirname;
// eslint-disable-next-line prefer-destructuring
dirname = dirname.split('src')[0];
export async function handleCreateStartup(req: Request, res: Response) {
  try {
    const { body } = req;
    const { files } = req;
    const logoFile: any = files.logo[0];
    const galleryFiles = files.images;

    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const logoName = `logo-${body.userInfo.id}-${uniquePrefix}-${logoFile?.originalname}`;
    await fs.writeFile(
      `${dirname}public/images/${logoName}`,
      logoFile?.buffer as any,
    );

    const gallery: string[] = [];
    if (Array.isArray(galleryFiles) && galleryFiles.length) {
      for (const obj of galleryFiles) {
        const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        const gallaryImg = `gallery-${body.userInfo.id}-${uniquePrefix}-${obj?.originalname}`;
        await fs.writeFile(
          `${dirname}public/images/${gallaryImg}`,
          obj?.buffer as any,
        );
        gallery.push(gallaryImg);
      }
    }

    const payload = {
      ...req.body,
      createdBy: req.body.userInfo.id,
      logo: logoName,
    };
    if (gallery.length) payload.gallery = JSON.stringify(gallery);
    const startup: any = await createStartup(payload);
    startup.toJSON();

    // Creating tags
    const tags: number[] = JSON.parse(body.tags);
    if (startup?.id) {
      await createStartupTags(
        tags.map((val) => ({ startupId: startup.id, tagId: val })),
      );
    }

    return res.status(201).json({
      message: 'Startup created successfull',
    });
  } catch (ex: any) {
    console.log('ex', ex);
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetStartups(req: Request, res: Response) {
  try {
    const data = await getStartups(queryGenerator(req));
    return res.status(200).json({
      data,
      meta: {
        currentPage: req.query?.page ? Number(req.query?.page) : 1,
        hasMore: req.query?.limit
          ? Number(req.query?.limit) <= data.length
          : undefined,
      },
      message: 'Startups fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}

export async function handleGetSingleStartups(req: Request, res: Response) {
  try {
    const data: any = await getStartup({ id: Number(req.params.id) });
    if (!data?.id) return res.status(404).json({ message: 'No record found' });

    const similer: any = await getStartups({
      where: { industryType: data?.industryType },
      ...queryGenerator(req),
    });
    return res.status(200).json({
      data,
      similer,
      message: 'Startup fetched successfull',
    });
  } catch (ex: any) {
    return res.status(500).json({
      message: ex?.message ?? 'Something went wrong! try again later',
    });
  }
}
