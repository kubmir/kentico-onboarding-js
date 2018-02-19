import {
  IPutNoteDependencies,
  putNoteFactory
} from '../../../src/actions/factories/putNoteFactory';
import {
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
  START_ACTION,
  ERROR_ACTION,
} from '../../testUtils/mocks';
import Mock = jest.Mock;
import { Note } from '../../../src/models/Note';

const BEFORE_UPDATE_TEXT = 'before update test';
const UPDATED_TEXT = 'test updated text';
const UPDATED_NOTE_ID = '1';

const mockDependencies = (requestFunction: Mock<any>): IPutNoteDependencies => {
  return {
    apiAddress: 'test',
    onUpdateStarted: jest.fn().mockReturnValue(START_ACTION),
    onUpdateError: jest.fn().mockReturnValue(ERROR_ACTION),
    onUpdateSuccessful: jest.fn().mockImplementation((note: Note) => ({type: 'TEST SUCCESSFUL', payload: { text: note.text }})),
    sendRequest: requestFunction,
    data: { text: UPDATED_TEXT, noteId: UPDATED_NOTE_ID },
  };
};

describe('putNoteFactory tests', () => {
  let dispatch: Mock<any>;

  beforeEach(() => dispatch = jest.fn());

  it('note is correctly updated on server', () => {
    const responseBody = JSON.stringify(mockServerNote(BEFORE_UPDATE_TEXT, UPDATED_NOTE_ID));
    const putNoteDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return putNoteFactory(putNoteDependencies)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual({ type: 'TEST SUCCESSFUL', payload: { text: UPDATED_TEXT }});
      });
  });

  it('request to server is rejected', () => {
    const putNoteDependencies = mockDependencies(mockRejectedRequest());

    return putNoteFactory(putNoteDependencies)(dispatch, () => mockStoreState(), null)
      .catch(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
