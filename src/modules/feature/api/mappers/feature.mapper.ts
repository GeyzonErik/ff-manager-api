import { Feature as PrismaFeature } from '@prisma/client';
import { Feature as DomainFeature } from '@modules/feature/domain/entities';

export class FeatureMapper {
  static toDomain(data: PrismaFeature): DomainFeature {
    return DomainFeature.create({
      id: data.id,
      name: data.name,
      description: data.description,
      enable: data.enable,
      environment: data.environment,
    });
  }
}
