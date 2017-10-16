import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './../inputStyle.css';


export class ListMemberEditMode extends PureComponent {

  constructor() {
    super();
    this.state = {
      changesOnNote: '',
    };

    this.handleNoteEditing = this.handleNoteEditing.bind(this);
  }

  handleNoteEditing(event) {
    this.setState({
      changesOnNote: event.target.value,
    });
  }

  render() {
    return (
      <div className="input-group input-width-bigger">
        <span className="input-group-addon">{this.props.number + '.'}</span>
        <input defaultValue={this.props.note.text} className="form-control" onChange={this.handleNoteEditing} />
        <span className="input-group-btn">
          <button type="button" className="btn btn-primary" onClick={() => this.props.handleSaveEdit(this.props.note, this.state.changesOnNote)}>Save</button>
          <button type="button" className="btn btn-dark" onClick={this.props.handleCancelClick}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={() => this.props.handleDeleteNotes(this.props.note)}>Delete</button>
        </span>
      </div>);
  }
}

ListMemberEditMode.propTypes = {
  note: PropTypes.object,
  number: PropTypes.number,
  handleDeleteNotes: PropTypes.func.isRequired,
  handleSaveEdit: PropTypes.func.isRequired,
  handleCancelClick: PropTypes.func.isRequired,
};
