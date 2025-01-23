import { Project as PrismaProject } from '@prisma/client';
import { Project as DomainProject } from '../../domain/entities/project.entity';

export class ProjectMapper {
  static toDomain(data: PrismaProject): DomainProject {
    return DomainProject.create({
      id: data.id,
      name: data.name,
      description: data.description,
    });
  }
}
