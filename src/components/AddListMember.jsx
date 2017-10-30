import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NonEmptyInput } from './NonEmptyInput';
import { ErrorMessageListMember } from './ErrorMessageListMember';

export class AddListMember extends PureComponent {

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      insertedText: '',
      isEditing: false,
    };
  }

  updateInsertedText = (event) => {
    this.setState({
      insertedText: event.target.value,
      isEditing: true,
    });
  };

  addInsertedText = () => {
    this.props.onAddClick(this.state.insertedText);
    this.setState({
      insertedText: '',
      isEditing: false,
    });
  };

  isEditingSet = (isInputEditing) => {
    this.setState({
      isEditing: isInputEditing,
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
            checkIsEditing={this.isEditingSet}
          />
          <div className="input-group-btn">
            <button
              type="button"
              disabled={!isNoteValid}
              className="btn btn-default"
              onClick={this.addInsertedText}
            >
              Add
            </button>
          </div>
        </div>
        <ErrorMessageListMember
          insertedText={this.state.insertedText}
          isEditing={this.state.isEditing}
        />
      </div>
    );
  }
}
