import { Record } from 'immutable';
import { FailedAction } from '../enums/failedAction';

interface INote {
  readonly text: string;
  readonly id: Guid;
  readonly isEditActive: boolean;
  readonly isCommunicating: boolean;
  readonly communicationError: string;
  readonly failedAction: FailedAction;
}

const defaultNote: INote = {
  text: '',
  id: '00000000-0000-0000-0000-000000000000',
  isEditActive: false,
  isCommunicating: false,
  communicationError: '',
  failedAction: FailedAction.NO_FAILURE,
};

export class Note extends Record(defaultNote) implements INote {
  readonly text: string;
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
