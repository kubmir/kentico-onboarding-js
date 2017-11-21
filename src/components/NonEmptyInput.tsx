import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { FormEvent } from 'react';

interface NonEmptyInputDataProps {
  text: string;
  isError: boolean;
  inputClassName: string;
  enableAutoFocus: boolean;
}

interface NonEmptyInputCallbacksProps {
  updateInsertedText: (insertedText: string) => void;
  addInsertedText: () => void;
  onInputFocus?: () => void;
  onInputBlur?: () => void;
  onCancelEditing?: () => void;
}

type NonEmptyInputProps = NonEmptyInputDataProps & NonEmptyInputCallbacksProps;

export class NonEmptyInput extends React.PureComponent<NonEmptyInputProps> {

  static propTypes = {
    text: PropTypes.string.isRequired,
    updateInsertedText: PropTypes.func.isRequired,
    addInsertedText: PropTypes.func.isRequired,
    isError: PropTypes.bool.isRequired,
    inputClassName: PropTypes.string.isRequired,
    enableAutoFocus: PropTypes.bool.isRequired,
    onInputFocus: PropTypes.func,
    onInputBlur: PropTypes.func,
    onCancelEditing: PropTypes.func,
  };

  textInput: HTMLInputElement;

  onInputFocus = () => {
    if (this.props.onInputFocus !== undefined) {
      this.props.onInputFocus();
    }
  };

  onExitingInput = () => {
    if (this.props.onInputBlur !== undefined) {
      this.props.onInputBlur();
    }
  };

  onInputChange = (event: FormEvent<HTMLInputElement>) =>
    this.props.updateInsertedText(event.currentTarget.value);

  componentDidMount() {
    if (this.props.enableAutoFocus) {
      const length = this.textInput.value.length;
      this.textInput.focus();
      this.textInput.setSelectionRange(length, length);
    }
  }

  onCancelFocusOfInput = () => {
    if (this.props.onCancelEditing !== undefined) {
      this.props.onCancelEditing();
    } else {
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
            ref={(input: HTMLInputElement) => {
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

