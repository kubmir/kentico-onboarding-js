import {
  deleteNoteFactory,
  IDeleteNoteDependencies
} from '../../../src/actions/thunkFactories/deleteNoteFactory';
import {
  ERROR_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
  IMockedResponse,
} from '../../testUtils/mocks';

const NOTE_TO_DELETE_TEXT = 'test added text';
const NOTE_TO_DELETE_ID = '1';

const mockDependencies = (responsePromise: Promise<IMockedResponse>): IDeleteNoteDependencies => {
  return {
    apiPrefix: 'test',
    onDeletingStarted: jest.fn().mockReturnValue(START_ACTION),
    onDeletingError: jest.fn().mockReturnValue(ERROR_ACTION),
    onDeletingSuccessful: jest.fn().mockReturnValue(SUCCESS_ACTION),
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
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(SUCCESS_ACTION);
      });
  });

  it('request to server is rejected', () => {
    const postNoteDependencies = mockDependencies(mockRejectedRequest());

    return deleteNoteFactory(postNoteDependencies)(NOTE_TO_DELETE_ID)(dispatch, () => mockStoreState(), null)
      .catch(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
