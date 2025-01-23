import { ProjectPgRepository } from '@modules/project/data/repositories';
import { Inject } from '@nestjs/common';
import { ProjectRepository } from '../repositories';

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
