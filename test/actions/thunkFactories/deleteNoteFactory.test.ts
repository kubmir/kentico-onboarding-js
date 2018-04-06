import {
  deleteNoteFactory,
  IDeleteNoteDependencies
} from '../../../src/actions/thunkFactories/deleteNoteFactory';
import {
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
  IMockedResponse,
} from '../../testUtils/mocks';
import {
  DELETING_NOTE_FROM_SERVER_FAILURE,
  DELETING_NOTE_FROM_SERVER_SUCCESS,
  START_DELETING_NOTE_FROM_SERVER
} from '../../../src/constants/actionTypes';

const NOTE_TO_DELETE_TEXT = 'test added text';
const NOTE_TO_DELETE_ID = '1';

const mockDependencies = (responsePromise: Promise<IMockedResponse>): IDeleteNoteDependencies => {
  return {
    apiPrefix: 'test',
    sendRequest: jest.fn().mockReturnValue(responsePromise),
  };
};

describe('deleteNoteFactory tests', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('note is correctly deleted from server', () => {
    const responseBody = JSON.stringify(mockServerNote(NOTE_TO_DELETE_TEXT, NOTE_TO_DELETE_ID));
    const postNoteDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return deleteNoteFactory(postNoteDependencies)(NOTE_TO_DELETE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_DELETING_NOTE_FROM_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(DELETING_NOTE_FROM_SERVER_SUCCESS);
      });
  });

  it('request to server is rejected', () => {
    const postNoteDependencies = mockDependencies(mockRejectedRequest());

    return deleteNoteFactory(postNoteDependencies)(NOTE_TO_DELETE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_DELETING_NOTE_FROM_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(DELETING_NOTE_FROM_SERVER_FAILURE);
      });
  });
});
