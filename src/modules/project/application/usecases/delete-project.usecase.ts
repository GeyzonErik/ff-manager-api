import { ProjectPgRepository } from '@modules/project/data/repositories';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories';

export type DeleteProjectInput = {
  id: string;
};

export type DeleteProjectOutput = {
  message: string;
};

export class DeleteProject {
  @Inject(ProjectPgRepository)
  private readonly projectRepo: ProjectRepository;

  constructor() {}

  async execute(data: DeleteProjectInput): Promise<DeleteProjectOutput> {
    const project = await this.projectRepo.findById({ id: data.id });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    await this.projectRepo.delete({ id: project.getId() });

    return {
      message: `Projeto: ${project.name}, deletado com sucesso`,
    };
  }
}
