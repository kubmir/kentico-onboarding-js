import React from 'react';
import PropTypes from 'prop-types';
import { ListMemberEditMode } from './ListMemberEditor';
import { ListMemberViewMode } from './ListMemberViewer';

const ListMember = (props) => {
  const memberEditor = (
    <ListMemberEditMode
      note={props.note}
      number={props.number}
      onDeleteClick={props.onDeleteClick}
      onSaveClick={props.onSaveClick}
      onEditModeChanges={props.onEditModeChanges}
    />);

  const memberViewer = (
    <ListMemberViewMode
      note={props.note}
      number={props.number}
      onEditModeChanges={props.onEditModeChanges}
    />
  );

  return (
    <li className="list-group-item">
      {
        props.note.isEditActive
          ? memberEditor
          : memberViewer
      }
    </li>
  );
};

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

export default ListMember;
