import {
  ProjectAPIKeyPgRepository,
  ProjectPgRepository,
} from '@modules/project/data/repositories';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProjectAPIKeyRepository, ProjectRepository } from '../repositories';
import { ApiKeyService } from '../services/api-key.service';
import { ProjectApiKey } from '@modules/project/domain/entities';

export type GenerateApiKeyInput = {
  projectId: string;
};

export type GenerateApiKeyOutput = {
  message: string;
};

export class GenerateApiKey {
  @Inject(ProjectPgRepository)
  private readonly projectRepo: ProjectRepository;
  @Inject(ProjectAPIKeyPgRepository)
  private readonly apiKeyRepo: ProjectAPIKeyRepository;
  @Inject(ApiKeyService)
  private readonly apiKeyService: ApiKeyService;

  constructor() {}

  async execute(data: GenerateApiKeyInput): Promise<GenerateApiKeyOutput> {
    const project = await this.projectRepo.findById({ id: data.projectId });

    if (!project) {
      throw new NotFoundException(`Projeto ${data.projectId} não encontrado`);
    }

    const newKey = await this.apiKeyService.generateKey();

    const newProjectKey = new ProjectApiKey(project.getId(), newKey);

    await this.apiKeyRepo.saveKey(newProjectKey);

    return {
      message: `Nova Api Key gerada para o projeto: ${project.name}`,
    };
  }
}
