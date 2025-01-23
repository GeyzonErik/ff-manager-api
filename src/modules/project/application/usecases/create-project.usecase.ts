import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ApiKeyService } from '../services/api-key.service';
import {
  ProjectAPIKeyPgRepository,
  ProjectPgRepository,
} from '@modules/project/data/repositories';
import { ProjectAPIKeyRepository, ProjectRepository } from '../repositories';
import { Project, ProjectApiKey } from '@modules/project/domain/entities';

export type CreateProjectInput = {
  name: string;
  description?: string;
};

export type CreateProjectOutput = {
  message: string;
};

@Injectable()
export class CreateProject {
  @Inject(ApiKeyService)
  readonly apiKeyService: ApiKeyService;
  @Inject(ProjectPgRepository)
  private readonly projectRepo: ProjectRepository;
  @Inject(ProjectAPIKeyPgRepository)
  private readonly apiKeyRepo: ProjectAPIKeyRepository;

  constructor() {}

  async execute(data: CreateProjectInput): Promise<CreateProjectOutput> {
    const project = Project.create({
      name: data.name,
      description: data.description,
    });

    const projectExists = await this.projectRepo.findByName({
      name: project.name,
    });

    if (projectExists) {
      throw new BadRequestException('Já existe projeto com este nome');
    }

    const apiKey = await this.apiKeyService.generateKey();

    const projectKey = new ProjectApiKey(project.getId(), apiKey);

    await this.projectRepo.create(project);
    await this.apiKeyRepo.saveKey(projectKey);

    return {
      message: 'Projeto criado com sucesso',
    };
  }
}
