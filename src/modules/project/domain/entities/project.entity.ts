import { Feature } from '@modules/feature/domain/entities';
import { randomUUID } from 'crypto';

export class Project {
  private constructor(
    private _id: string,
    readonly name: string,
    readonly description: string,
    readonly features: Feature[],
  ) {}

  static create(data: CreateProjectData): Project {
    const id = data.id ?? randomUUID();
    const features = data.features ?? [];

    return new Project(id, data.name, data.description, features);
  }

  getId(): string {
    return this._id;
  }
}

export type CreateProjectData = {
  id?: string;
  name: string;
  description?: string;
  features?: Feature[];
};
