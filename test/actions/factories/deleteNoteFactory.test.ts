import {
  deleteNoteFactory,
  IDeleteNoteDependencies
} from '../../../src/actions/factories/deleteNoteFactory';
import {
  ERROR_ACTION,
  START_ACTION,
  SUCCESS_ACTION,
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
} from '../../testUtils/mocks';
import Mock = jest.Mock;

const NOTE_TO_DELETE_TEXT = 'test added text';
const NOTE_TO_DELETE_ID = '1';

const mockDependencies = (requestFunction: Mock<any>): IDeleteNoteDependencies => {
  return {
    apiAddress: 'test',
    onDeletingStarted: jest.fn().mockReturnValue(START_ACTION),
    onDeletingError: jest.fn().mockReturnValue(ERROR_ACTION),
    onDeletingSuccessful: jest.fn().mockReturnValue(SUCCESS_ACTION),
    sendRequest: requestFunction,
    noteId: NOTE_TO_DELETE_ID,
  };
};

describe('deleteNoteFactory tests', () => {
  let dispatch: Mock<any>;

  beforeEach(() => dispatch = jest.fn());

  it('note is correctly deleted from server', () => {
    const responseBody = JSON.stringify(mockServerNote(NOTE_TO_DELETE_TEXT, NOTE_TO_DELETE_ID));
    const postNoteDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return deleteNoteFactory(postNoteDependencies)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(SUCCESS_ACTION);
      });
  });

  it('request to server is rejected', () => {
    const postNoteDependencies = mockDependencies(mockRejectedRequest());

    return deleteNoteFactory(postNoteDependencies)(dispatch, () => mockStoreState(), null)
      .catch(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
