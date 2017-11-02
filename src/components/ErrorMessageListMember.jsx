import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ErrorMessageListMember extends PureComponent {

  static propTypes = {
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

