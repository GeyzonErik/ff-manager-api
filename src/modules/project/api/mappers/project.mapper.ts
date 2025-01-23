import { Project as PrismaProject } from '@prisma/client';
import { Project as DomainProject } from '@modules/project/domain/entities';
import { Feature as PrismaFeature } from '@prisma/client';
import { FeatureMapper } from '@modules/feature/api/mappers';

export class ProjectMapper {
  static toDomain(
    data: PrismaProject & { features: PrismaFeature[] },
  ): DomainProject {
    return DomainProject.create({
      id: data.id,
      name: data.name,
      description: data.description,
      features: data.features ? data.features.map(FeatureMapper.toDomain) : [],
    });
  }
}
