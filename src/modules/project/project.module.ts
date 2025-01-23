import { Module } from '@nestjs/common';
import {
  CreateProject,
  DeleteProject,
  DetailProjectById,
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

@Module({
  imports: [PrismaModule],
  providers: [
    CreateProject,
    ListProjects,
    DetailProjectById,
    UpdateProjectById,
    DeleteProject,
    ApiKeyService,
    ProjectPgRepository,
    ProjectAPIKeyPgRepository,
  ],
  controllers: [PojectController],
})
export class ProjectModule {}
