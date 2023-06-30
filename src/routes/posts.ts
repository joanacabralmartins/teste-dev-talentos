import { Router } from 'express'; 
import { postsController } from '../controllers/posts';

const postRouter = Router();

postRouter.post('/', postsController.createPost);
postRouter.get('/', postsController.listPosts);
postRouter.get('/:id', postsController.getPost);
postRouter.put('/:id', postsController.updatePost);
postRouter.delete('/:id', postsController.deletePost);

export {
    postRouter
}