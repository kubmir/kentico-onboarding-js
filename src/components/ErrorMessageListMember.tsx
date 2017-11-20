import * as React from 'react';
import * as PropTypes from 'prop-types';

interface ErrorMessageListMemberDataProps {
  isError: boolean;
  errorMessage: string;
}

export class ErrorMessageListMember extends React.PureComponent<ErrorMessageListMemberDataProps> {

  static propTypes: React.ValidationMap<ErrorMessageListMemberDataProps> = {
    isError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  render() {
    const error = (
      <span className="text-danger">{this.props.errorMessage}</span>
    );

    return this.props.isError && error;
  }
}

