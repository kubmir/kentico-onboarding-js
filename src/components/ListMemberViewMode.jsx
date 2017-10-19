import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListMemberViewMode extends PureComponent {

  onTextClick = () => {
    this.props.onEditModeChanges(this.props.note, true);
  }

  render() {
    return (
      <p onClick={this.onTextClick}>{this.props.number + '. ' + this.props.note.text}</p>
    );
  }
}

ListMemberViewMode.PropTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
  }),
  number: PropTypes.number.isRequired,
  onEditModeChanges: PropTypes.func.isRequired,
};
