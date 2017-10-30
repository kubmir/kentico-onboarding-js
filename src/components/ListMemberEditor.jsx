import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NonEmptyInput } from './NonEmptyInput';
import { ErrorMessageListMember } from './ErrorMessageListMember';

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
      isEditing: false,
    };
  }

  onNoteEditing = (event) => {
    this.setState({
      currentNoteText: event.target.value,
      isEditing: true,
    });
  };

  onDeleteClick = () => {
    this.props.onDeleteClick(this.props.note);
  };

  onSaveClick = () => {
    this.setState({
      isEditing: false,
    });
    this.props.onSaveClick(this.props.note, this.state.currentNoteText);
  };

  onCancelClick = () => {
    this.props.onEditModeChanges(this.props.note, false);
  };

  isEditingSet = (isInputEditing) => {
    this.setState({
      isEditing: isInputEditing,
    });
  };

  render() {
    const isNoteValid = this.state.currentNoteText.length > 0;

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
            checkIsEditing={this.isEditingSet}
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
          insertedText={this.state.currentNoteText}
          isEditing={this.state.isEditing}
        />
      </div>
    );
  }
}
