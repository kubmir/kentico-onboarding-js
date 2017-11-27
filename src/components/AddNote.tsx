import * as React from 'react';
import * as PropTypes from 'prop-types';
import { NoteErrorMessage } from './NoteErrorMessage';
import { AddNoteInput } from '../containers-redux/AddNoteInput';
import { isNoteValid } from '../utils/isNoteValid';

export interface IAddNoteDataProps {
  isInputFocused: boolean;
}

export interface IAddNoteCallbacksProps {
  onAddClick: (text: string) => void;
}

interface IAddNoteState {
  insertedText: string;
}

type IAddNoteProps = IAddNoteDataProps & IAddNoteCallbacksProps;

export class AddNote extends React.PureComponent<IAddNoteProps, IAddNoteState> {

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    isInputFocused: PropTypes.bool.isRequired,
  };

  constructor(props: IAddNoteProps) {
    super(props);
    this.state = {
      insertedText: '',
    };
  }

  updateInsertedText = (newText: string): void =>
    this.setState({
      insertedText: newText,
    });

  addInsertedText = (): void => {
    this.props.onAddClick(this.state.insertedText);
    this.setState({
      insertedText: '',
    });
  };

  render(): JSX.Element {
    const isValid = isNoteValid(this.state.insertedText);
    const isError = !isValid && this.props.isInputFocused;
    const errorMessage = 'Invalid note. You cannot add an empty note to list of notes.';

    return (
      <div>
        <div className="input-group">
          <AddNoteInput
            text={this.state.insertedText}
            updateInsertedText={this.updateInsertedText}
            addInsertedText={this.addInsertedText}
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
