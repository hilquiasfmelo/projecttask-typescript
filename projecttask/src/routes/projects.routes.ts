import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

import ProjectsRepository from '../repositories/ProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';

import ensuredAuthenticated from '../middlewares/ensureAuthenticated';

const projectsRouter = Router();

projectsRouter.use(ensuredAuthenticated);

projectsRouter.get('/', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);
  const projects = await projectsRepository.find();

  return response.json(projects);
});

projectsRouter.post('/', async (request, response) => {
  const { user_id, name, date, description } = request.body;

  const parsedDate = parseISO(date);

  const createProject = new CreateProjectService();

  const project = await createProject.execute({
    user_id,
    name,
    date: parsedDate,
    description,
  });

  return response.json(project);
});

export default projectsRouter;
