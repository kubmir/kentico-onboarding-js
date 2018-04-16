import { Record } from 'immutable';

const EMPTY_TEXT = '';

export interface IServerNote {
  readonly text: string;
  readonly id: Guid;
  readonly creationDate: Date;
  readonly lastModificationDate: Date;
}

interface INote {
  readonly visibleText: string;
  readonly id: Guid;
  readonly isEditActive: boolean;
  readonly isCommunicating: boolean;
  readonly serverSynchronizedText: string;
  readonly errorId?: Guid;
}

const defaultNote: INote = {
  visibleText: EMPTY_TEXT,
  id: '00000000-0000-0000-0000-000000000000',
  isEditActive: false,
  isCommunicating: false,
  serverSynchronizedText: EMPTY_TEXT,
  errorId: undefined,
};

export class Note extends Record(defaultNote) implements INote {
  readonly serverSynchronizedText: string;
  readonly visibleText: string;
  readonly id: Guid;
  readonly isEditActive: boolean;
  readonly isCommunicating: boolean;
  readonly errorId?: Guid;

  constructor(params?: Partial<INote>) {
    params
      ? super(params)
      : super();
  }

  with(values: Partial<INote>): Note {
    return this.merge(values) as this;
  }
}
