import { EnvironmentType } from '@prisma/client';

export class Feature {
  private _id: string;
  name: string;
  description: string | undefined;
  enable: boolean;
  environment: EnvironmentType;

  constructor(
    id: string,
    name: string,
    description?: string,
    enable?: boolean,
    environment?: EnvironmentType,
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.enable = enable ?? false;
    this.environment = environment ?? 'DEV';
  }

  getId(): string {
    return this._id;
  }
}
