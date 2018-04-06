import { Record } from 'immutable';
import { FailedAction } from '../enums/failedAction';

const EMPTY_TEXT = '';

interface INote {
  readonly visibleText: string;
  readonly id: Guid;
  readonly isEditActive: boolean;
  readonly isCommunicating: boolean;
  readonly communicationError: string;
  readonly failedAction: FailedAction;
  readonly serverSynchronizedText: string;
}

const defaultNote: INote = {
  visibleText: EMPTY_TEXT,
  id: '00000000-0000-0000-0000-000000000000',
  isEditActive: false,
  isCommunicating: false,
  communicationError: EMPTY_TEXT,
  failedAction: FailedAction.NO_FAILURE,
  serverSynchronizedText: EMPTY_TEXT,
};

export class Note extends Record(defaultNote) implements INote {
  readonly serverSynchronizedText: string;
  readonly visibleText: string;
  readonly id: Guid;
  readonly isEditActive: boolean;
  readonly isCommunicating: boolean;
  readonly communicationError: string;
  readonly failedAction: FailedAction;

  constructor(params?: Partial<INote>) {
    params
      ? super(params)
      : super();
  }

  with(values: Partial<INote>) {
    return this.merge(values) as this;
  }
}
