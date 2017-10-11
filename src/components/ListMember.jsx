import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class ListMember extends PureComponent {
  constructor() {
    super();
    this.state = {
      editable: false,
    };
    this.handleChangeModeStart = this.handleChangeModeStart.bind(this);
  }
  handleChangeModeStart() {
    this.setState({
      editable: true,
    });
  }
  render() {
    return (
      <li className="list-group-item">
        {
          this.state.editable ?
            <div>
              <input value={this.props.number + '. ' + this.props.note} />
              <button type="button" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-dark">Cancel</button>
              <button type="button" className="btn btn-danger">Delete</button>
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
};
