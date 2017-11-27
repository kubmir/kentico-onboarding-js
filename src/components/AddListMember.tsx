import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ErrorMessageListMember } from './ErrorMessageListMember';
import { AddListMemberInput } from '../containers-redux/AddListMemberInput';
import { isNoteValid } from '../utils/isNoteValid';

export interface IAddListMemberDataProps {
  isInputFocused: boolean;
}

export interface IAddListMemberCallbacksProps {
  onAddClick: (text: string) => void;
}

interface IAddListMemberState {
  insertedText: string;
}

type IAddListMemberProps = IAddListMemberDataProps & IAddListMemberCallbacksProps;

export class AddListMember extends React.PureComponent<IAddListMemberProps, IAddListMemberState> {

  static propTypes = {
    onAddClick: PropTypes.func.isRequired,
    isInputFocused: PropTypes.bool.isRequired,
  };

  constructor(props: IAddListMemberProps) {
    super(props);
    this.state = {
      insertedText: '',
    };
  }

  updateInsertedText = (newText: string) =>
    this.setState({
      insertedText: newText,
    });

  addInsertedText = () => {
    this.props.onAddClick(this.state.insertedText);
    this.setState({
      insertedText: '',
    });
  };

  render() {
    const isValid = isNoteValid(this.state.insertedText);
    const isError = !isValid && this.props.isInputFocused;
    const errorMessage = 'Invalid note. You cannot add an empty note to list of notes.';

    return (
      <div>
        <div className="input-group">
          <AddListMemberInput
            text={this.state.insertedText}
            updateInsertedText={this.updateInsertedText}
            addInsertedText={this.addInsertedText}
            inputClassName="form-control"
            isError={isError}
            enableAutoFocus={false}
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
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}
