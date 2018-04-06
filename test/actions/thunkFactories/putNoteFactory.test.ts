import {
  IPutNoteDependencies,
  putNoteFactory
} from '../../../src/actions/thunkFactories/putNoteFactory';
import {
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
  IMockedResponse,
} from '../../testUtils/mocks';
import {
  START_UPDATING_NOTE_ON_SERVER,
  UPDATING_NOTE_ON_SERVER_FAILURE,
  UPDATING_NOTE_ON_SERVER_SUCCESS,
} from '../../../src/constants/actionTypes';

const BEFORE_UPDATE_TEXT = 'before update test';
const UPDATED_TEXT = 'test updated text';
const UPDATED_NOTE_ID = '1';

const mockDependencies = (responsePromise: Promise<IMockedResponse>): IPutNoteDependencies => {
  return {
    apiPrefix: 'test',
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
        expect(dispatch.mock.calls[0][0].type).toEqual(START_UPDATING_NOTE_ON_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(UPDATING_NOTE_ON_SERVER_SUCCESS);
      });
  });

  it('request to server is rejected', () => {
    const putNoteDependencies = mockDependencies(mockRejectedRequest());

    return putNoteFactory(putNoteDependencies)({ text: UPDATED_TEXT, noteId: UPDATED_NOTE_ID })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_UPDATING_NOTE_ON_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(UPDATING_NOTE_ON_SERVER_FAILURE);
      });
  });
});
