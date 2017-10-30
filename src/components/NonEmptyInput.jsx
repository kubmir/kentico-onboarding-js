import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

export class NonEmptyInput extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    updateInsertedText: PropTypes.func.isRequired,
    addInsertedText: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    checkIsTouched: PropTypes.func,
  };

  onInputClick = () => {
    if (this.props.checkIsTouched !== undefined) {
      this.props.checkIsTouched(true);
    }
  };

  onExitingInput = () => {
    if (this.props.checkIsTouched !== undefined) {
      this.props.checkIsTouched(false);
    }
  };

  onInputChange = (e) => {
    this.props.updateInsertedText(e);
  };

  componentDidMount() {
    const length = this.textInput.value.length;
    this.textInput.focus();
    this.textInput.setSelectionRange(length, length);
  }

  cancelFocusOfInput = () => {
    this.textInput.blur();
  };

  onEnterClick = () => {
    if (this.props.text) {
      this.textInput.blur();
      this.props.addInsertedText();
    }
  };

  render() {
    const handlers = {
      'cancelEditing': () => this.cancelFocusOfInput(),
      'saveChanges': () => this.onEnterClick(),
    };


    const inputErrorStyle = this.props.isError
      ? 'has-error'
      : '';

    return (
      <div className={inputErrorStyle}>
        <HotKeys handlers={handlers}>
          <input
            type="text"
            ref={(input) => {
              this.textInput = input;
            }}
            className="form-control"
            onChange={this.onInputChange}
            value={this.props.text}
            onKeyPress={this.onEnterPress}
            onClick={this.onInputClick}
            onBlur={this.onExitingInput}
          />
        </HotKeys>
      </div>
    );
  }
}

