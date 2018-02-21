import { addNoteText } from '../../../../src/reducers/notes/list/addingNoteText';
import { changeAddingNoteText } from '../../../../src/actions/actionCreators';

const EMPTY_STATE = '';

describe('addingNoteText reducer tests', () => {
  it('action ADD_NOTE_TEXT_CHANGE should add text to state', () => {
    const expectedState = 'Test';
    const addTextAction = changeAddingNoteText(expectedState);

    const actualState = addNoteText(EMPTY_STATE, addTextAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action ADD_NOTE_TEXT_CHANGE should remove text from state', () => {
    const expectedState = 'Tes';
    const addTextAction = changeAddingNoteText(expectedState);

    const actualState = addNoteText(EMPTY_STATE, addTextAction);

    expect(actualState).toEqual(expectedState);
  });

  it('action START_SENDING_NOTE_TO_SERVER should remove text from state', () => {
    const expectedState = EMPTY_STATE;
    const addTextAction = changeAddingNoteText(expectedState);

    const actualState = addNoteText(EMPTY_STATE, addTextAction);

    expect(actualState).toEqual(expectedState);
  });
});
