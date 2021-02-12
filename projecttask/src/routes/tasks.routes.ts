import { Router } from 'express';

import CreateTaskService from '../services/CreateTaskService';

import ensuredAuthenticated from '../middlewares/ensureAuthenticated';

const tasksRouter = Router();

tasksRouter.use(ensuredAuthenticated);

tasksRouter.post('/', async (request, response) => {
  const { name, project_id, description } = request.body;

  const createTask = new CreateTaskService();

  const task = await createTask.execute({
    name,
    project_id,
    description,
  });

  return response.json(task);
});

export default tasksRouter;
