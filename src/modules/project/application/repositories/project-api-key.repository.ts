import { ProjectApiKey } from '../../domain/entities/project-keys.entity';

export abstract class ProjectAPIKeyRepository {
  abstract saveKey(data: ProjectApiKey): Promise<void>;
}
