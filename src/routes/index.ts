import { Application } from "express";
import Router from 'express';
import { postRouter } from "./posts";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/posts', postRouter)

    app.use('/api', apiRouter);
}