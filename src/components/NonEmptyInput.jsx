import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';

export class NonEmptyInput extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
    updateInsertedText: PropTypes.func.isRequired,
    addInsertedText: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    inputClassName: PropTypes.string.isRequired,
    checkIsFocused: PropTypes.func,
    onCancelEditing: PropTypes.func,
  };

  onInputFocus = () => {
    if (this.props.checkIsFocused !== undefined) {
      this.props.checkIsFocused(true);
    }
  };

  onExitingInput = () => {
    if (this.props.checkIsFocused !== undefined) {
      this.props.checkIsFocused(false);
    }
  };

  onInputChange = (event) => {
    this.props.updateInsertedText(event.target.value);
  };

  componentDidMount() {
    const length = this.textInput.value.length;
    this.textInput.focus();
    this.textInput.setSelectionRange(length, length);
  }

  onCancelFocusOfInput = () => {
    if (this.props.onCancelEditing !== undefined) {
      this.props.onCancelEditing();
    }
    else {
      this.textInput.blur();
    }
  };

  onSaveChanges = () => {
    if (this.props.text) {
      this.textInput.blur();
      this.props.addInsertedText();
    }
  };

  render() {
    const handlers = {
      'cancelEditing': () => this.onCancelFocusOfInput(),
      'saveChanges': () => this.onSaveChanges(),
    };

    const inputErrorCssClass = this.props.isError
      ? 'has-error'
      : '';

    return (
      <div className={inputErrorCssClass}>
        <HotKeys handlers={handlers}>
          <input
            type="text"
            ref={(input) => {
              this.textInput = input;
            }}
            className={this.props.inputClassName}
            onChange={this.onInputChange}
            value={this.props.text}
            onFocus={this.onInputFocus}
            onBlur={this.onExitingInput}
          />
        </HotKeys>
      </div>
    );
  }
}

