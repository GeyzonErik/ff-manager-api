import { ProjectApiKey } from '@modules/project/domain/entities';

export abstract class ProjectAPIKeyRepository {
  abstract saveKey(data: ProjectApiKey): Promise<void>;
}
