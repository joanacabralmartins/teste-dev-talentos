import { dbIdQuery, dbQuery } from "../services/db";

export type Post = {
    id: number
    nome: string
    descricao: string
    categoria: string
}

const createPost = async (post: Post) => {
    await dbQuery(`INSERT INTO posts (nome, descricao, categoria) VALUES(?, ?, ?)`, 
        [post.nome, post.descricao, post.categoria])
}

const getPost = async (id: number) => {
    const retorno = await dbIdQuery(`SELECT * FROM posts WHERE id = ?`, [id]);
    return retorno as Post | undefined;
}

const listPosts = async () => {
    const retorno = await dbQuery(`SELECT * FROM posts`);
    return retorno as Post[];
}

const updatePost = async (post: Post) => {
    await dbQuery(`UPDATE posts SET nome = ?, descricao = ?, categoria = ? WHERE id = ?`, 
        [post.nome, post.descricao, post.categoria, post.id])
    return getPost(post.id);
}

const deletePost = async (id: number) => {
    await dbIdQuery(`DELETE FROM posts WHERE id = ?`, [id]);
}

export const postsModel = {
    createPost,
    getPost,
    listPosts,
    updatePost,
    deletePost
}