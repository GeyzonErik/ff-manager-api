import { Inject } from '@nestjs/common';
import { ProjectPgRepository } from '../../data/repositories/project-pg.repository';
import { ProjectRepository } from '../repositories/project.repository';

export type ListProjectsOutput = {
  id: string;
  name: string;
};

export class ListProjects {
  @Inject(ProjectPgRepository)
  private readonly projectRepo: ProjectRepository;

  constructor() {}

  async execute(): Promise<ListProjectsOutput[]> {
    const projects = await this.projectRepo.list();

    return projects.map((project) => ({
      id: project.getId(),
      name: project.name,
    }));
  }
}
