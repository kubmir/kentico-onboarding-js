import * as React from 'react';
import * as PropTypes from 'prop-types';
import { MdError } from 'react-icons/lib/md';

export interface IInactiveNoteErrorDataProps {
  readonly note: {
    readonly text: string;
    readonly isEditActive: boolean;
    readonly isCommunicating: boolean;
    readonly communicationError: string;
  };
  readonly number: number;
}

type InactiveNoteErrorProps = IInactiveNoteErrorDataProps;

const InactiveNoteError: React.StatelessComponent<InactiveNoteErrorProps> = (props: InactiveNoteErrorProps): JSX.Element => (
  <p>
    <span style={{color: 'grey'}}>{props.number + '. ' + props.note.text}</span>
    <MdError className="pull-right" size="25" color="red"/>
    <span className="pull-right" style={{color: 'red'}}>{props.note.communicationError}</span>
  </p>
);

InactiveNoteError.displayName = 'InactiveNote';

InactiveNoteError.propTypes = {
  note: PropTypes.shape({
    text: PropTypes.string.isRequired,
    isEditActive: PropTypes.bool.isRequired,
    isCommunicating: PropTypes.bool.isRequired,
    communicationError: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
};

export { InactiveNoteError };
