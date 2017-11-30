import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NoteErrorMessage } from './NoteErrorMessage';
import { AddNoteInput } from '../containers-redux/AddNoteInput';
import { isNoteValid } from '../utils/isNoteValid';

export interface IAddNoteDataProps {
  isInputFocused: boolean;
  text: string;
}

export interface IAddNoteCallbacksProps {
  onAddClick: (text: string) => void;
}

type AddNoteProps = IAddNoteDataProps & IAddNoteCallbacksProps;

export class AddNote extends React.PureComponent<AddNoteProps> {
  static displayName = 'AddNote';

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    isInputFocused: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  };

  addInsertedText = (): void => {
    this.props.onAddClick(this.props.text);
  };

  render(): JSX.Element {
    const isValid = isNoteValid(this.props.text);
    const isError = !isValid && this.props.isInputFocused;
    const errorMessage = 'Invalid note. You cannot add an empty note to list of notes.';

    return (
      <div>
        <div className="input-group">
          <AddNoteInput
            inputClassName="form-control"
            isError={isError}
            enableAutoFocus={false}
          />
          <div className="input-group-btn">
            <button
              type="button"
              disabled={!isValid}
              className="btn btn-default"
              onClick={this.addInsertedText}
            >
              Add
            </button>
          </div>
        </div>
        <NoteErrorMessage
          isError={isError}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
