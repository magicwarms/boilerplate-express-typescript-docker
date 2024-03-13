import { NextFunction, Request, Response } from 'express';
import * as PostService from './post.service';

export const getAllPosts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const getAllPosts = await PostService.listAllPosts();
        return res.status(200).json({
            success: true,
            data: getAllPosts,
            message: `Successfully get all posts`,
        });
    } catch (err) {
        next(err);
    }
};