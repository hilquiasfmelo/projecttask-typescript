import { EntityRepository, Repository } from 'typeorm';

import Projects from '../models/Projects';

interface Request {
  name: string;
}

@EntityRepository(Projects)
class ProjectsRepository extends Repository<Projects> {
  // Função que verica se ja existe um projeto
  public async findByProject({ name }: Request): Promise<Projects | null> {
    const findProject = await this.findOne({
      where: { name },
    });

    return findProject || null;
  }
}

export default ProjectsRepository;
