import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';

import AppError from '../errors/AppError';

import Project from '../models/Projects';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface RequestDTO {
  user_id: string;
  name: string;
  date: Date;
  description: string;
}

class CreateProjectService {
  public async execute({
    user_id,
    name,
    date,
    description,
  }: RequestDTO): Promise<Project> {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projectDate = startOfHour(date);

    const findProjectInSameName = await projectsRepository.findByProject({
      name,
    });

    if (findProjectInSameName) {
      throw new AppError('This project is already exists');
    }

    const project = projectsRepository.create({
      user_id,
      name,
      date: projectDate,
      description,
    });

    await projectsRepository.save(project);

    return project;
  }
}

export default CreateProjectService;
