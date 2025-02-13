import { PrismaService } from '@modules/prisma/service/prisma.service';
import { ProjectAPIKeyRepository } from '@modules/project/application/repositories';
import { ProjectApiKey } from '@modules/project/domain/entities';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectAPIKeyPgRepository implements ProjectAPIKeyRepository {
  @Inject(PrismaService)
  private readonly prisma: PrismaService;

  constructor() {}

  async saveKey(data: ProjectApiKey): Promise<void> {
    await this.prisma.apiKeys.upsert({
      where: {
        projectId: data.getId(),
      },
      update: {
        key: data.key,
      },
      create: {
        projectId: data.getId(),
        key: data.key,
      },
    });
  }
}
