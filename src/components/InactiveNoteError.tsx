import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  MdError,
  MdRepeat,
  MdCancel,
} from 'react-icons/lib/md';
import { NotePropType } from '../@types/notePropType';
import { IAction } from '../models/IAction';
import {
  ADD,
  DELETE,
  UPDATE
} from '../constants/failedAction';
import { Note } from '../models/Note';

export interface IInactiveNoteErrorDataProps {
  readonly note: Note,
  readonly number: number;
}

export interface IInactiveNoteErrorCallbackProps {
  readonly retryFailedAction: (failedAction: FailedAction) => Promise<IAction> | undefined;
  readonly showModal: (note: Note) => IAction | undefined;
}

type InactiveNoteErrorProps = IInactiveNoteErrorDataProps & IInactiveNoteErrorCallbackProps;

export class InactiveNoteError extends React.PureComponent<InactiveNoteErrorProps, {}> {
  static displayName = 'InactiveNoteError';

  static propTypes = {
    note: NotePropType,
    number: PropTypes.number.isRequired,
  };

  constructor(props: InactiveNoteErrorProps) {
    super(props);
  }

  _onRetryClick = (): Promise<IAction> | undefined =>
    this.props.retryFailedAction(this.props.note.failedAction);

  _onCancelFailedActionClick = (): IAction | undefined =>
    this.props.showModal(this.props.note);

  _getFailedAction = (): string => {
    switch (this.props.note.failedAction) {
      case DELETE:
        return 'delete operation';
      case UPDATE:
        return 'update operation';
      case ADD:
        return 'addition of note';
      default:
        return '';
    }
  };

  render() {
    const failedActionMessage = this._getFailedAction();

    return (
      <div>
        <p>
          <span style={{ color: 'grey' }}>{this.props.number + '. ' + this.props.note.text}</span>
          <span title={'Cancel failed ' + failedActionMessage}>
            <MdCancel
              className="pull-right"
              size="25"
              color="blue"
              style={{ cursor: 'pointer' }}
              onClick={this._onCancelFailedActionClick}
            />
          </span>
          <span title={'Retry ' + failedActionMessage}>
            <MdRepeat
              className="pull-right"
              color="green"
              size="25"
              style={{ cursor: 'pointer' }}
              onClick={this._onRetryClick}
            />
          </span>
          <span title="Error">
            <MdError
              className="pull-right"
              size="25"
              color="red"
            />
          </span>
          <span
            className="pull-right"
            style={{ color: 'red' }}
          >
            {this.props.note.communicationError}
          </span>
        </p>
      </div>);
  }
}
