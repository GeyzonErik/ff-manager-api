import { ProjectRepository } from '../../application/repositories/project.repository';
import { PrismaService } from 'src/modules/prisma/service/prisma.service';
import { Project } from '../../domain/entities/project.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ProjectMapper } from '../../api/mappers/project.mapper';

@Injectable()
export class ProjectPgRepository implements ProjectRepository {
  @Inject(PrismaService)
  readonly prisma: PrismaService;

  async create(data: Project): Promise<void> {
    await this.prisma.project.create({
      data: {
        id: data.getId(),
        name: data.name,
        description: data.description,
      },
    });
  }

  async list(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany();

    return projects.map(ProjectMapper.toDomain);
  }

  async findByName(data: { name: string }): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        name: data.name,
      },
    });

    if (!project) {
      return null;
    }

    return ProjectMapper.toDomain(project);
  }
}
