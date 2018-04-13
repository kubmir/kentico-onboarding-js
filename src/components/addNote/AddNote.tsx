import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AddNoteInput } from '../../containers-redux/addNote/AddNoteInput';
import { isNoteValid } from '../../utils/isNoteValid';
import { IAction } from '../../actions/IAction';
import { NoteErrorMessage } from '../note/NoteErrorMessage';

export interface IAddNoteDataProps {
  readonly isInputFocused: boolean;
  readonly text: string;
}

export interface IAddNoteCallbacksProps {
  readonly onAddClick: (text: string) => Promise<IAction>;
}

type AddNoteProps = IAddNoteDataProps & IAddNoteCallbacksProps;

export class AddNote extends React.PureComponent<AddNoteProps> {
  static displayName = 'AddNote';

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    isInputFocused: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  };

  private errorMessage = 'Invalid note. You cannot add an empty note to list of notes.';

  _addInsertedText = (): Promise<IAction> =>
    this.props.onAddClick(this.props.text);

  render(): JSX.Element {
    const isValid = isNoteValid(this.props.text);
    const isError = !isValid && this.props.isInputFocused;

    return (
      <div>
        <div className="input-group">
          <AddNoteInput
            inputClassName="form-control"
            isError={isError}
          />
          <div className="input-group-btn">
            <button
              type="button"
              disabled={!isValid}
              className="btn btn-default"
              onClick={this._addInsertedText}
            >
              Add
            </button>
          </div>
        </div>
        <NoteErrorMessage
          isError={isError}
          errorMessage={this.errorMessage}
        />
      </div>
    );
  }
}
