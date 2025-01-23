export class ProjectApiKey {
  private _id: string;
  key: string;

  constructor(id: string, key: string) {
    this._id = id;
    this.key = key;
  }

  getId(): string {
    return this._id;
  }
}
