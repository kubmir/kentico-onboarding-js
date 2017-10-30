import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NonEmptyInput } from './NonEmptyInput';
import { ErrorMessageListMember } from './ErrorMessageListMember';
import isNoteValid from '../utils/noteValidator';

export class ListMemberEditor extends PureComponent {

  static propTypes = {
    note: PropTypes.shape({
      text: PropTypes.string.isRequired,
      isEditActive: PropTypes.bool.isRequired,
    }).isRequired,
    number: PropTypes.number.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    onEditModeChanges: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentNoteText: props.note.text,
    };
  }

  onNoteEditing = (event) => {
    this.setState({
      currentNoteText: event.target.value,
    });
  };

  onDeleteClick = () => {
    this.props.onDeleteClick(this.props.note);
  };

  onSaveClick = () => {
    this.props.onSaveClick(this.props.note, this.state.currentNoteText);
  };

  onCancelClick = () => {
    this.props.onEditModeChanges(this.props.note, false);
  };

  render() {
    const isValid = isNoteValid(this.state.currentNoteText);
    const isError = !isValid && this.props.note.isEditActive;

    return (
      <div>
        <div className="input-group">
          <div className="input-group-addon">
            <label>{this.props.number + '.'}</label>
          </div>
          <NonEmptyInput
            text={this.state.currentNoteText}
            addInsertedText={this.onSaveClick}
            updateInsertedText={this.onNoteEditing}
            isError={isError}
          />
          <div className="input-group-btn">
            <button
              type="button"
              disabled={!isNoteValid}
              className="btn btn-primary"
              onClick={this.onSaveClick}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.onCancelClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
        <ErrorMessageListMember
          isError={isError}
        />
      </div>
    );
  }
}
