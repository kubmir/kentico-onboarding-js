import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NoteEditor } from '../containers-redux/NoteEditor';
import { NoteViewer } from '../containers-redux/NoteViewer';
import { Guid } from '../@types/globals';

export interface INoteDataProps {
  readonly note: {
    readonly isEditActive: boolean;
  };
  readonly noteId: Guid;
  readonly number: number;
}

const Note: React.StatelessComponent<INoteDataProps> = (props: INoteDataProps): JSX.Element => {
  const NoteComponent = props.note.isEditActive
    ? NoteEditor
    : NoteViewer;

  return <NoteComponent
    noteId={props.noteId}
    number={props.number}
  />;
};

Note.displayName = 'Note';

Note.propTypes = {
  note: PropTypes.shape({
    isEditActive: PropTypes.bool.isRequired,
  }).isRequired,
  noteId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export { Note };
