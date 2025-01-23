import { ProjectPgRepository } from '@modules/project/data/repositories';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';

export type DetailProjectByIdInput = {
  id: string;
};

export type DetailProjectByIdOutput = {
  id: string;
  name: string;
  description: string;
  features: {
    id: string;
    name: string;
    enable: boolean;
  }[];
};

@Injectable()
export class DetailProjectById {
  @Inject(ProjectPgRepository)
  private readonly projectRepo: ProjectRepository;

  constructor() {}

  async execute(
    data: DetailProjectByIdInput,
  ): Promise<DetailProjectByIdOutput> {
    const project = await this.projectRepo.findById({
      id: data.id,
    });

    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return {
      id: project.getId(),
      name: project.name,
      description: project.description,
      features: project.features.map((feature) => {
        return {
          id: feature.getId(),
          name: feature.name,
          enable: feature.enable,
        };
      }),
    };
  }
}
