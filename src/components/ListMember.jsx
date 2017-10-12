import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListMember extends PureComponent {
  constructor() {
    super();
    this.state = {
      editable: false,
    };
    this.handleChangeModeStart = this.handleChangeModeStart.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }
  handleChangeModeStart() {
    this.setState({
      editable: true,
    });
  }
  handleCancelClick() {
    this.setState({
      editable: false,
    });
  }

  render() {
    return (
      <li className="list-group-item">
        {
          this.state.editable ?
            <div>
              <input defaultValue={this.props.number + '. ' + this.props.note} />
              <button type="button" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-dark" onClick={this.handleCancelClick}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => this.props.handleDeleteNotes(this.props.note)}>Delete</button>
            </div> :
            <p onClick={this.handleChangeModeStart}>{this.props.number + '. ' + this.props.note}</p>
        }
      </li>
  );
  }
}

ListMember.propTypes = {
  note: PropTypes.string,
  number: PropTypes.number,
  handleDeleteNotes: PropTypes.func.isRequired,
};
