import React from 'react';
import PropTypes from 'prop-types';
import { ListMemberEditorContainer } from '../containers-redux/ListMemberEditor';
import { ListMemberViewerContainer } from '../containers-redux/ListMemberViewer';

const ListMember = (props) => {
  const memberEditor = (
    <ListMemberEditorContainer
      id={props.noteId}
      number={props.number}
    />
  );

  const memberViewer = (
    <ListMemberViewerContainer
      id={props.noteId}
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
  number: PropTypes.number.isRequired,
};

export { ListMember };
