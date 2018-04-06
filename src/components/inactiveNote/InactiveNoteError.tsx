import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  MdError,
  MdRepeat,
  MdCancel,
} from 'react-icons/lib/md';
import { NotePropType } from '../../@types/notePropType';
import { IAction } from '../../models/IAction';
import { FailedAction } from '../../enums/failedAction';

export interface IInactiveNoteErrorDataProps {
  readonly note: {
    readonly visibleText: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
    readonly failedAction: FailedAction;
  };
  readonly number: number;
}

export interface IInactiveNoteErrorCallbackProps {
  readonly retryFailedAction: (failedAction: FailedAction) => Promise<IAction> | undefined;
  readonly cancelFailedAction: (failedAction: FailedAction) => IAction | undefined;
  readonly getFailedActionTooltipText: () => string;
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
    this.props.cancelFailedAction(this.props.note.failedAction);

  render() {
    return (<p>
      <span style={{ color: 'grey' }}>{this.props.number + '. ' + this.props.note.visibleText}</span>
      <span title={'Cancel failed ' + this.props.getFailedActionTooltipText()}>
        <MdCancel
          className="pull-right"
          size="25"
          color="blue"
          style={{ cursor: 'pointer' }}
          onClick={this._onCancelFailedActionClick}
        />
      </span>
      <span title={'Retry ' + this.props.getFailedActionTooltipText()}>
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
    </p>);
  }
}
