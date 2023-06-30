import {Request, Response} from 'express';
import { Post, postsModel } from '../models/post';
import { error } from 'console';
import { badRequest, internalServerError } from '../utils/errors';

const createPost = (req: Request, res: Response) => {
    {
        const post = req.body;
        if (!post)
            return badRequest(res, "Post inválido");

        if (!post.nome)
            return badRequest(res, 'Informe o nome do post');

        if (!(post.descricao))
            return badRequest(res, 'Informe uma descrição para o post');
        
        if (!(post.categoria))
            return badRequest(res, 'Informe a categoria do post');
    }
    const post = req.body as Post;

    return postsModel.createPost(post)
        .then(product => {
            res.json(product);
        })
        .catch(err => internalServerError(res, err));
}

const listPosts = ({}: Request, res: Response) => {
    postsModel.listPosts()
        .then(posts => {
            res.json(posts)
        })
        .catch(error);
}

const getPost = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    return postsModel.getPost(id)
        .then((post) => {
            if(post)
                return res.json(post);
            else
                return res.sendStatus(404);
        })
        .catch(err => internalServerError(res,err));
} 

const updatePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        const post = req.body;
        if (!post)
            return badRequest(res, "Post inválido");

        if(!post.nome) {
            return badRequest(res, 'Informe o nome do post');
        }

        if (!post.descricao)
            return badRequest(res, 'Informe uma descrição para o post');
        
        if (!post.categoria)
            return badRequest(res, 'Informe a categoria do post');

        const postSaved = await postsModel.getPost(id);
        if(!postSaved)
            return res.sendStatus(404);
    }
    const post = req.body as Post;
    return postsModel.updatePost(post)
        .then(post => {
            res.json(post)
        })
        .catch(err => internalServerError(res, err));
} 

const deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        const postSaved = await postsModel.getPost(id);
        if(!postSaved)
            return res.sendStatus(404);
    }

    return postsModel.deletePost(id)
        .then(() => res.sendStatus(200))
        .catch(err => internalServerError(res, err));
}

export const postsController = {
    createPost,
    listPosts,
    getPost,
    updatePost,
    deletePost
}