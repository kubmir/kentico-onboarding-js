import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NonEmptyInput } from './NonEmptyInput';
import { ErrorMessageListMember } from './ErrorMessageListMember';
import isNoteValid from '../utils/noteValidator';

export class AddListMember extends PureComponent {

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    onInputTouch: PropTypes.func.isRequired,
    isInputTouched: PropTypes.bool.isRequired,
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
    const isValid = isNoteValid(this.state.insertedText);
    const isError = !isValid && this.props.isInputTouched;

    return (
      <div>
        <div className="input-group">
          <NonEmptyInput
            text={this.state.insertedText}
            updateInsertedText={this.updateInsertedText}
            addInsertedText={this.addInsertedText}
            checkIsTouched={this.props.onInputTouch}
            isError={isError}
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
        />
      </div>
    );
  }
}
