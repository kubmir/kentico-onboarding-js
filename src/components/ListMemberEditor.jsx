import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListMemberEditMode extends PureComponent {

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

  constructor() {
    super();
    this.state = {
      noteChanges: '',
    };
  }

  onNoteEditing = (event) => {
    this.setState({
      noteChanges: event.target.value,
    });
  };

  onDeleteClick = () => {
    this.props.onDeleteClick(this.props.note);
  };

  onSaveClick = () => {
    this.props.onSaveClick(this.props.note, this.state.noteChanges);
  };

  onCancelClick = () => {
    this.props.onEditModeChanges(this.props.note, false);
  };

  componentDidMount() {
    const length = this.textInput.value.length;
    this.textInput.focus();
    this.textInput.setSelectionRange(length, length);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-addon">{this.props.number + '.'}</span>
            <input
              ref={(input) => {
                this.textInput = input;
              }}
              defaultValue={this.props.note.text}
              className="form-control"
              onChange={this.onNoteEditing}
            />
          </div>
        </div>
        <div className="col-md-4">
          <button
            type="button"
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
    );
  }
}
