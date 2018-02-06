export interface IServerNote {
  readonly text: string;
  readonly id: Guid;
  readonly creationDate: Date;
  readonly lastModificationDate: Date;
}
