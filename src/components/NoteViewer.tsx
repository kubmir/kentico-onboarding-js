import * as React from 'react';
import * as PropTypes from 'prop-types';
import { InactiveNote } from './InactiveNote';
import { NotePropType } from '../@types/notePropType';

export interface INoteViewerDataProps {
  readonly note: {
    readonly text: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
    readonly failedAction: FailedAction;
  };
  readonly number: number;
}

export interface INoteViewerCallbacksProps {
  readonly onTextClick: () => void;
}

type NoteViewerProps = INoteViewerDataProps & INoteViewerCallbacksProps;

const NoteViewer: React.StatelessComponent<NoteViewerProps> = (props: NoteViewerProps): JSX.Element => (
  props.note.isCommunicating || props.note.communicationError !== ''
    ? <InactiveNote note={props.note} number={props.number} />
    : <p onClick={props.onTextClick}>{props.number + '. ' + props.note.text}</p>
);

NoteViewer.displayName = 'NoteViewer';

NoteViewer.propTypes = {
  note: NotePropType,
  number: PropTypes.number.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { NoteViewer };
