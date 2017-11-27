import React from 'react';
import PropTypes from 'prop-types';
import { ListMemberEditor } from '../containers-redux/ListMemberEditor';
import { ListMemberViewer } from '../containers-redux/ListMemberViewer';

const ListMember = (props) => {
  const memberEditor = (
    <ListMemberEditor
      noteId={props.noteId}
      number={props.number}
    />
  );

  const memberViewer = (
    <ListMemberViewer
      noteId={props.noteId}
      number={props.number}
    />
  );

  return props.note.isEditActive
    ? memberEditor
    : memberViewer;
};

ListMember.propTypes = {
  note: PropTypes.shape({
    isEditActive: PropTypes.bool.isRequired,
  }).isRequired,
  noteId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export { ListMember };
