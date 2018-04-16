import { Record } from 'immutable';
import { FailedAction } from '../enums/FailedAction';

const EMPTY_TEXT = '';

interface IError {
  readonly id: Guid;
  readonly errorDescription: string;
  readonly failedAction: FailedAction;
}

const defaultError: IError = {
  id: '00000000-0000-0000-0000-000000000000',
  errorDescription: EMPTY_TEXT,
  failedAction: FailedAction.NO_FAILURE,
};

export class ApplicationError extends Record(defaultError) implements IError {
  readonly id: Guid;
  readonly errorDescription: string;
  readonly failedAction: FailedAction;

  constructor(params?: Partial<IError>) {
    params
      ? super(params)
      : super();
  }

  with(values: Partial<IError>): ApplicationError {
    return this.merge(values) as this;
  }
}
