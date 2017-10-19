import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListMemberEditMode } from './ListMemberEditMode';
import { ListMemberViewMode } from './ListMemberViewMode';

export class ListMember extends PureComponent {

  render() {
    const memberEditMode = (
      <ListMemberEditMode
        note={this.props.note}
        number={this.props.number}
        onDeleteClick={this.props.onDeleteClick}
        onSaveClick={this.props.onSaveClick}
        onEditModeChanges={this.props.onEditModeChanges}
      />);

    const memberViewMode = (
      <ListMemberViewMode
        note={this.props.note}
        number={this.props.number}
        onEditModeChanges={this.props.onEditModeChanges}
      />
    );

    return (
      <li className="list-group-item">
        {
          this.props.note.isEditActive
            ? memberEditMode
            : memberViewMode
        }
      </li>
    );
  }
}

ListMember.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
  }),
  number: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onEditModeChanges: PropTypes.func.isRequired,
};
