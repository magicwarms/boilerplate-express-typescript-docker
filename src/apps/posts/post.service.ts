
import * as PostRepository from "./post.repository";

export const listAllPosts = async () => await PostRepository.findAllPosts();