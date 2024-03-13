import express, { Request, Response } from 'express';

import post from './apps/posts/post.router';


/**
 * Router Definition
 */
const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        data: {},
        message: 'Hello World!',
    });
});

/**
 * Controller Definitions
 */
router.use('/post', post);


export default router;
