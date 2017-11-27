import * as React from 'react';
import * as PropTypes from 'prop-types';

interface IErrorMessageListMemberDataProps {
  isError: boolean;
  errorMessage: string;
}

export class ErrorMessageListMember extends React.PureComponent<IErrorMessageListMemberDataProps> {

  static propTypes: React.ValidationMap<IErrorMessageListMemberDataProps> = {
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

