import { EnvironmentType } from '@prisma/client';
import { randomUUID } from 'crypto';

export class Feature {
  constructor(
    private _id: string,
    readonly name: string,
    readonly description?: string,
    readonly enable?: boolean,
    readonly environment?: EnvironmentType,
  ) {}

  static create(data: CreateFeatureData): Feature {
    const id = data.id ?? randomUUID();
    const environment = data.environment ?? 'DEV';

    return new Feature(
      id,
      data.name,
      data.description,
      data.enable,
      environment,
    );
  }

  getId(): string {
    return this._id;
  }
}

export type CreateFeatureData = {
  id: string;
  name: string;
  description?: string;
  enable?: boolean;
  environment?: EnvironmentType;
};
