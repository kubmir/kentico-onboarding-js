import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MdAutorenew } from 'react-icons/lib/md';
import '../styles/noteViewer.css';

export interface InactiveNoteViewerDataProps {
  readonly note: {
    readonly text: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
  };
  readonly number: number;
}

type InactiveNoteViewerProps = InactiveNoteViewerDataProps;

const InactiveNoteViewer: React.StatelessComponent<InactiveNoteViewerProps> = (props: InactiveNoteViewerProps): JSX.Element => (
  <p className="inactive-line">
    {props.number + '. ' + props.note.text}
    <MdAutorenew className="pull-right refresh-animate" size="25" color="#3498db"/>
  </p>
);

InactiveNoteViewer.displayName = 'InactiveNote';

InactiveNoteViewer.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
    isCommunicating: PropTypes.bool.isRequired,
    communicationError: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
};

export { InactiveNoteViewer };
