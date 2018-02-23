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
  IMockedResponse,
} from '../../testUtils/mocks';
import { Note } from '../../../src/models/Note';

const BEFORE_UPDATE_TEXT = 'before update test';
const UPDATED_TEXT = 'test updated text';
const UPDATED_NOTE_ID = '1';

const mockDependencies = (responsePromise: Promise<IMockedResponse>): IPutNoteDependencies => {
  return {
    apiPrefix: 'test',
    onUpdateStarted: jest.fn().mockReturnValue(START_ACTION),
    onUpdateError: jest.fn().mockReturnValue(ERROR_ACTION),
    onUpdateSuccessful: jest.fn().mockImplementation((note: Note) => ({type: 'TEST SUCCESSFUL', payload: { text: note.text }})),
    sendRequest: jest.fn().mockReturnValue(responsePromise),
  };
};

describe('putNoteFactory tests', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('note is correctly updated on server', () => {
    const responseBody = JSON.stringify(mockServerNote(BEFORE_UPDATE_TEXT, UPDATED_NOTE_ID));
    const putNoteDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return putNoteFactory(putNoteDependencies)({ text: UPDATED_TEXT, noteId: UPDATED_NOTE_ID })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual({ type: 'TEST SUCCESSFUL', payload: { text: UPDATED_TEXT }});
      });
  });

  it('request to server is rejected', () => {
    const putNoteDependencies = mockDependencies(mockRejectedRequest());

    return putNoteFactory(putNoteDependencies)({ text: UPDATED_TEXT, noteId: UPDATED_NOTE_ID })(dispatch, () => mockStoreState(), null)
      .catch(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
