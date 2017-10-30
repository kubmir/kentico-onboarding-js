import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ErrorMessageListMember extends PureComponent {

  static propTypes = {
    insertedText: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
  };

  render() {
    const isNoteValid = this.props.insertedText.length > 0;
    const error = (
      <span className="text-danger">Invalid note. Note cannot be empty.</span>
    );

    return (this.props.isEditing && !isNoteValid) && error;
  }
}

