import { Project } from '@modules/project/domain/entities';

export abstract class ProjectRepository {
  abstract create(data: Project): Promise<void>;
  abstract list(): Promise<Project[]>;
  abstract findById(data: { id: string }): Promise<Project | null>;
  abstract findByName(data: { name: string }): Promise<Project | null>;
}
