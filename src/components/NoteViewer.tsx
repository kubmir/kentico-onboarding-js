import * as React from 'react';
import * as PropTypes from 'prop-types';
import '../styles/noteViewer.css';

export interface INoteViewerDataProps {
  readonly note: {
    readonly text: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
  };
  readonly number: number;
}

export interface INoteViewerCallbacksProps {
  readonly onTextClick: () => void;
}

type NoteViewerProps = INoteViewerDataProps & INoteViewerCallbacksProps;

const NoteViewer: React.StatelessComponent<NoteViewerProps> = (props: NoteViewerProps): JSX.Element => (
  props.note.isCommunicating
    ? <p className="inactive-line">
        {props.number + '. ' + props.note.text}
        <span className="glyphicon glyphicon-refresh glyphicon-refresh-animate pull-right"></span>
      </p>
    : <p onClick={props.onTextClick}>{props.number + '. ' + props.note.text}</p>
);

NoteViewer.displayName = 'NoteViewer';

NoteViewer.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
    isCommunicating: PropTypes.bool.isRequired,
    communicationError: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { NoteViewer };
