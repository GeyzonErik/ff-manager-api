import { Module } from '@nestjs/common';
import {
  CreateProject,
  DeleteProject,
  DetailProjectById,
  GenerateApiKey,
  ListProjects,
  UpdateProjectById,
} from './application/usecases';
import { ApiKeyService } from './application/services/api-key.service';
import {
  ProjectAPIKeyPgRepository,
  ProjectPgRepository,
} from './data/repositories';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PojectController } from './api/controllers/project.controller';
import { ApiKeyController } from './api/controllers/api-key.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    // Project
    CreateProject,
    ListProjects,
    DetailProjectById,
    UpdateProjectById,
    DeleteProject,
    ProjectPgRepository,
    // Api Key
    GenerateApiKey,
    ApiKeyService,
    ProjectAPIKeyPgRepository,
  ],
  controllers: [PojectController, ApiKeyController],
})
export class ProjectModule {}
