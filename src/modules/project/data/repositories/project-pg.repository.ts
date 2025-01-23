import { PrismaService } from '@modules/prisma/service/prisma.service';
import { ProjectMapper } from '@modules/project/api/mappers';
import { ProjectRepository } from '@modules/project/application/repositories';
import { Project } from '@modules/project/domain/entities';
import { Inject, Injectable } from '@nestjs/common';

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

  async findById(data: { id: string }): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id: data.id,
      },
      include: {
        features: true,
      },
    });

    return project ? ProjectMapper.toDomain(project) : null;
  }

  async findByName(data: { name: string }): Promise<Project | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        name: data.name,
      },
      include: {
        features: true,
      },
    });

    return project
      ? ProjectMapper.toDomain({ ...project, features: [] })
      : null;
  }

  async update(data: Project): Promise<void> {
    await this.prisma.project.update({
      where: {
        id: data.getId(),
      },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }
}
