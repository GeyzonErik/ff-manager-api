import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Project } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../repositories/project.repository';
import { ApiKeyService } from '../services/api-key.service';
import { ProjectPgRepository } from '../../data/repositories/project-pg.repository';
import { ProjectAPIKeyRepository } from '../repositories/project-api-key.repository';
import { ProjectApiKey } from '../../domain/entities/project-keys.entity';
import { ProjectAPIKeyPgRepository } from '../../data/repositories/project-api-key-pg.repository';

export type CreateProjectInput = {
  name: string;
  description?: string;
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

  async execute(data: CreateProjectInput) {
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
  }
}
