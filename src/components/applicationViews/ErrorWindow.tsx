import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IAction } from '../../actions/IAction';
import '../../styles/errorWindow.css';

export interface IErrorWindowDataProps {
  readonly errorMessage: string;
  readonly errorId?: Guid;
}

export interface IErrorWindowCallbacksProps {
  readonly onReloadClick: (errorId?: Guid) => Promise<IAction>;
}

type ErrorWindowProps = IErrorWindowDataProps & IErrorWindowCallbacksProps;

export class ErrorWindow extends React.PureComponent<ErrorWindowProps> {
  static displayName = 'ErrorWindow';

  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onReloadClick: PropTypes.func.isRequired,
  };

  constructor(props: ErrorWindowProps) {
    super(props);
  }

  _onReloadClick = (): Promise<IAction> =>
    this.props.onReloadClick(this.props.errorId);

  render() {
    return (
      <div>
        <div className="alert alert-danger">
          <p className="error-message">Error while retrieving data from server. Please try again later.</p>
          <p>Detailed error message:</p>
          {this.props.errorMessage}
        </div>
        <button
          onClick={this._onReloadClick}
          className="btn btn-info btn-lg reload-button"
        >
          <span className="glyphicon glyphicon-refresh" />
          Reload
        </button>
      </div>
    );
  }
}
