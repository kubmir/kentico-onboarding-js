import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NoteEditor } from '../containers-redux/NoteEditor';
import { NoteViewer } from '../containers-redux/NoteViewer';

export interface INoteDataProps {
  note: {
    isEditActive: boolean;
  };
  noteId: string;
  number: number;
}

const Note: React.StatelessComponent<INoteDataProps> = (props: INoteDataProps): JSX.Element => {
  const memberEditor = (
    <NoteEditor
      noteId={props.noteId}
      number={props.number}
    />
  );

  const memberViewer = (
    <NoteViewer
      noteId={props.noteId}
      number={props.number}
    />
  );

  return props.note.isEditActive
    ? memberEditor
    : memberViewer;
};

Note.propTypes = {
  note: PropTypes.shape({
    isEditActive: PropTypes.bool.isRequired,
  }).isRequired,
  noteId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export { Note };
