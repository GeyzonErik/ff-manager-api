import { Module } from '@nestjs/common';
import { CreateProject } from './application/usecases/create-project.usecase';
import { PojectController } from './api/controllers/project.controller';
import { ApiKeyService } from './application/services/api-key.service';
import { ProjectPgRepository } from './data/repositories/project-pg.repository';
import { ProjectAPIKeyPgRepository } from './data/repositories/project-api-key-pg.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateProject,
    ApiKeyService,
    ProjectPgRepository,
    ProjectAPIKeyPgRepository,
  ],
  controllers: [PojectController],
})
export class ProjectModule {}
