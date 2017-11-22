import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AddListMemberInput } from '../containers-redux/AddListMemberInput';
import { ErrorMessageListMember } from './ErrorMessageListMember';
import { isNoteValid } from '../utils/isNoteValid';

export class AddListMember extends PureComponent {

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    isInputFocused: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      insertedText: '',
    };
  }

  updateInsertedText = (newText) =>
    this.setState({
      insertedText: newText,
    });

  addInsertedText = () => {
    this.props.onAddClick(this.state.insertedText);
    this.setState({
      insertedText: '',
    });
  };

  render() {
    const isValid = isNoteValid(this.state.insertedText);
    const isError = !isValid && this.props.isInputFocused;
    const errorMessage = 'Invalid note. You cannot add an empty note to list of notes.';

    return (
      <div>
        <div className="input-group">
          <AddListMemberInput
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
        <ErrorMessageListMember
          isError={isError}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
