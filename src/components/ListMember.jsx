import React from 'react';
import PropTypes from 'prop-types';
import { ListMemberEditorContainer } from '../containers-redux/ListMemberEditor';
import { ListMemberViewerContainer } from '../containers-redux/ListMemberViewer';

const ListMember = (props) => {
  const memberEditor = (
    <ListMemberEditorContainer {...props} />
  );

  const memberViewer = (
    <ListMemberViewerContainer {...props} />
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
};

export { ListMember };
