import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  MdError,
  MdRepeat,
} from 'react-icons/lib/md';

export interface IInactiveNoteErrorDataProps {
  readonly note: {
    readonly text: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
    readonly failedAction: Actions;
  };
  readonly number: number;
}

export interface IInactiveNoteErrorCallbackProps {
  readonly retryFailedAction: (actionType: Actions) => void;
}

type InactiveNoteErrorProps = IInactiveNoteErrorDataProps & IInactiveNoteErrorCallbackProps;

export class InactiveNoteError extends React.PureComponent<InactiveNoteErrorProps, {}> {
  static displayName = 'InactiveNoteError';

  static propTypes = {
    note: PropTypes.shape({
      text: PropTypes.string.isRequired,
      isEditActive: PropTypes.bool.isRequired,
      isCommunicating: PropTypes.bool.isRequired,
      communicationError: PropTypes.string.isRequired,
    }).isRequired,
    number: PropTypes.number.isRequired,
  };

  constructor(props: InactiveNoteErrorProps) {
    super(props);
  }

  _onRetryClick = () =>
    this.props.retryFailedAction(this.props.note.failedAction);

  render() {
    return (<p>
      <span style={{ color: 'grey' }}>{this.props.number + '. ' + this.props.note.text}</span>
      <MdRepeat
        className="pull-right"
        color="green"
        size="25"
        onClick={this._onRetryClick}
      />
      <MdError
        className="pull-right"
        size="25"
        color="red"
      />
      <span
        className="pull-right"
        style={{ color: 'red' }}
      >
        {this.props.note.communicationError}
      </span>
    </p>);
  }
}
