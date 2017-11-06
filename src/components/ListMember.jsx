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
      onCancelClick={props.cancelNoteEditor}
    />);

  const memberViewer = (
    <ListMemberViewer
      note={props.note}
      number={props.number}
      onTextClick={props.startNoteEditor}
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
  cancelNoteEditor: PropTypes.func.isRequired,
  startNoteEditor: PropTypes.func.isRequired,
};

export { ListMember };
