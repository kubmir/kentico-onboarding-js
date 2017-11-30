import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface INoteViewerDataProps {
 note: {
   text: string;
   isEditActive: boolean;
 };
 number: number;
}

export interface INoteViewerCallbacksProps {
  onTextClick: () => void;
}

type INoteViewerProps = INoteViewerDataProps & INoteViewerCallbacksProps;

const NoteViewer: React.StatelessComponent<INoteViewerProps>  = (props: INoteViewerProps): JSX.Element => (
  <p onClick={props.onTextClick}>{props.number + '. ' + props.note.text}</p>
);

NoteViewer.displayName = 'NoteViewer';

NoteViewer.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
  }),
  number: PropTypes.number.isRequired,
  onTextClick: PropTypes.func.isRequired,
};

export { NoteViewer };
