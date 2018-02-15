import * as React from 'react';
import * as PropTypes from 'prop-types';
import { InactiveNoteViewer } from './InactiveNoteViewer';
import { InactiveNoteError } from './InactiveNoteError';

export interface IInactiveNoteDataProps {
  readonly note: {
    readonly text: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
  };
  readonly number: number;
}

type InactiveNoteProps = IInactiveNoteDataProps;

const InactiveNote: React.StatelessComponent<InactiveNoteProps> = (props: InactiveNoteProps): JSX.Element => {
  const InactiveNoteComponent = props.note.communicationError === ''
    ? InactiveNoteViewer
    : InactiveNoteError;

  return <InactiveNoteComponent
    note={props.note}
    number={props.number}
  />;
};

InactiveNote.displayName = 'InactiveNote';

InactiveNote.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
    isCommunicating: PropTypes.bool.isRequired,
    communicationError: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
};

export { InactiveNote };
