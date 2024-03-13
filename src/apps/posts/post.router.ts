/**
 * Required External Modules and Interfaces
 */
import express from 'express';
import * as PostController from './post.controller';

/**
 * Router Definition
 */
const postRouter = express.Router();

/**
 * Controller Definitions
 */
postRouter.get('/all', PostController.getAllPosts);

export default postRouter;
