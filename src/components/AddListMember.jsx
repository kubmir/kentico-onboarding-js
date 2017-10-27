import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NonEmptyInput } from './NonEmptyInput';

export class AddListMember extends PureComponent {

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
  };

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
  };

  addInsertedText = () => {
    this.props.onAddClick(this.state.insertedText);
    this.setState({
      insertedText: '',
    });
  };

  render() {
    const isNoteValid = this.state.insertedText.length > 0;

    return (
      <div>
        <div className="input-group">
          <NonEmptyInput
            text={this.state.insertedText}
            updateInsertedText={this.updateInsertedText}
            addInsertedText={this.addInsertedText}
          />
          <div className="input-group-btn">
            <button
              type="button"
              disabled={!isNoteValid}
              className="btn btn-default"
              onClick={this.addInsertedText}
              data-toggle="tooltip"
              title={this.state.insertedText === ''
                ? 'You cannot add empty note'
                : 'Add new note'}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}
