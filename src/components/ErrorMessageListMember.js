import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ErrorMessageListMember extends PureComponent {

  static propTypes = {
    isError: PropTypes.bool.isRequired,
  };

  render() {
    const error = (
      <span className="text-danger">Invalid note. Note cannot be empty.</span>
    );

    return this.props.isError && error;
  }
}

