import { ProjectPgRepository } from '@modules/project/data/repositories';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories';
import { Project } from '@modules/project/domain/entities';

export type UpdateProjectByIdInput = {
  id: string;
  name?: string;
  description?: string;
};

export type UpdateProjectByIdOutput = {
  message: string;
};

export class UpdateProjectById {
  @Inject(ProjectPgRepository)
  private readonly projectRepo: ProjectRepository;

  constructor() {}

  async execute(
    data: UpdateProjectByIdInput,
  ): Promise<UpdateProjectByIdOutput> {
    const project = await this.projectRepo.findById({ id: data.id });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const updatedProject = Project.create({
      id: project.getId(),
      name: data.name,
      description: data.description,
    });

    await this.projectRepo.update(updatedProject);

    return {
      message: `projeto ${project.getId()} atualizado com sucesso`,
    };
  }
}
