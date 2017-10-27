import React from 'react';
import PropTypes from 'prop-types';
import { ListMemberEditor } from './ListMemberEditor';
import { ListMemberViewer } from './ListMemberViewer';

const ListMember = (props) => {
  const memberEditor = (
    <ListMemberEditor
      note={props.note}
      number={props.number}
      onDeleteClick={props.onDeleteClick}
      onSaveClick={props.onSaveClick}
      onEditModeChanges={props.onEditModeChanges}
    />);

  const memberViewer = (
    <ListMemberViewer
      note={props.note}
      number={props.number}
      onEditModeChanges={props.onEditModeChanges}
    />
  );

  return props.note.isEditActive
    ? memberEditor
    : memberViewer;
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
