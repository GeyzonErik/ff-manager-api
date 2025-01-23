import { Project } from '@modules/project/domain/entities';

export abstract class ProjectRepository {
  abstract create(data: Project): Promise<void>;
  abstract list(): Promise<Project[]>;
  abstract findByName(data: { name: string }): Promise<Project | null>;
}
