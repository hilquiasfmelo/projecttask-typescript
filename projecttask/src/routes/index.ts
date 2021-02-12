import { Router } from 'express';

import userRouter from './users.routes';
import projectsRouter from './projects.routes';
import tasksRouter from './tasks.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/projects', projectsRouter);
routes.use('/tasks', tasksRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
