import * as React from 'react';
import * as PropTypes from 'prop-types';

interface INoteErrorMessageDataProps {
  isError: boolean;
  errorMessage: string;
}

export class NoteErrorMessage extends React.PureComponent<INoteErrorMessageDataProps> {

  static propTypes: React.ValidationMap<INoteErrorMessageDataProps> = {
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  render(): JSX.Element | false {
    const error = (
      <span className="text-danger">{this.props.errorMessage}</span>
    );

    return this.props.isError && error;
  }
}

