import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class AddLine extends PureComponent {

  constructor() {
    super();
    this.state = {
      insertedText: '',
    };
  }

  updateInsertedText = (event) => {
    this.setState({
      insertedText: event.target.value,
    });
  }

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.addInsertedText();
    }
  }

  addInsertedText = () => {
    this.props.onAddClick(this.state.insertedText);
    this.setState({
      insertedText: '',
    });
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={this.updateInsertedText}
              value={this.state.insertedText}
              onKeyPress={this.handleEnterPress}
            />
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.addInsertedText}
            >Add
            </button>
          </div>
        </div>
      </li>
    );
  }
}

AddLine.PropTypes = {
  onAddClick: PropTypes.func.isRequired,
};
