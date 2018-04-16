import * as React from 'react';
import * as PropTypes from 'prop-types';
import { InactiveNoteViewer } from './InactiveNoteViewer';
import { InactiveNoteError } from '../../containers-redux/inactiveNote/InactiveNoteError';
import { NotePropType } from '../../utils/notePropType';
import { ApplicationError } from '../../models/ApplicationError';
import { Note } from '../../models/Note';

export interface IInactiveNoteDataProps {
  readonly note: Note;
  readonly number: number;
  readonly error: ApplicationError;
}

type InactiveNoteProps = IInactiveNoteDataProps;

const InactiveNote: React.StatelessComponent<InactiveNoteProps> = (props: InactiveNoteProps): JSX.Element => {
  const InactiveNoteComponent = props.error.errorDescription === ''
    ? InactiveNoteViewer
    : InactiveNoteError;

  return <InactiveNoteComponent
    note={props.note}
    number={props.number}
  />;
};

InactiveNote.displayName = 'InactiveNote';

InactiveNote.propTypes = {
  note: NotePropType,
  number: PropTypes.number.isRequired,
};

export { InactiveNote };
