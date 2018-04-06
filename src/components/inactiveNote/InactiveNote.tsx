import * as React from 'react';
import * as PropTypes from 'prop-types';
import { InactiveNoteViewer } from './InactiveNoteViewer';
import { InactiveNoteError } from '../../containers-redux/inactiveNote/InactiveNoteError';
import { NotePropType } from '../../@types/notePropType';
import { FailedAction } from '../../enums/failedAction';

export interface IInactiveNoteDataProps {
  readonly note: {
    readonly visibleText: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
    readonly failedAction: FailedAction;
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
  note: NotePropType,
  number: PropTypes.number.isRequired,
};

export { InactiveNote };
