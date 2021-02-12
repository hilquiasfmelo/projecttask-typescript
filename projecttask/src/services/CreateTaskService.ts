import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Tasks from '../models/Tasks';

interface RequestDTO {
  name: string;
  project_id: string;
  description: string;
}

class CreateTaskService {
  public async execute({
    name,
    project_id,
    description,
  }: RequestDTO): Promise<Tasks> {
    const tasksRepository = getRepository(Tasks);

    const checkTaskExists = await tasksRepository.findOne({
      where: { name },
    });

    if (checkTaskExists) {
      throw new AppError('Task already exists');
    }

    const task = tasksRepository.create({
      name,
      project_id,
      description,
    });

    await tasksRepository.save(task);

    return task;
  }
}

export default CreateTaskService;
