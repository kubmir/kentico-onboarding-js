import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NoteEditor } from '../../containers-redux/note/NoteEditor';
import { NoteViewer } from '../../containers-redux/note/NoteViewer';
import { RouteComponentProps } from 'react-router';

export interface INoteDataProps {
  readonly noteIsEditActive: boolean;
  readonly noteId: Guid;
  readonly number: number;
}

type INoteProps = RouteComponentProps<{}> & INoteDataProps;

const Note: React.StatelessComponent<INoteProps> = (props: INoteProps): JSX.Element => {
  const NoteComponent = props.noteIsEditActive
    ? NoteEditor
    : NoteViewer;

  console.log('Note ' + props.location.pathname);

  return <NoteComponent
    noteId={props.noteId}
    number={props.number}
  />;
};

Note.displayName = 'Note';

Note.propTypes = {
  noteIsEditActive: PropTypes.bool.isRequired,
  noteId: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

export { Note };
