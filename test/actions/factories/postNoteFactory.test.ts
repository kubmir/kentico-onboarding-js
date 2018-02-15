import { Note } from '../../../src/models/Note';
import {
  IPostNoteDependencies,
  postNoteFactory
} from '../../../src/actions/factories/postNoteFactory';
import {
  DELETE_ACTION,
  ERROR_ACTION,
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
  START_ACTION,
  SUCCESS_ACTION
} from '../../testUtils/mocks';
import Mock = jest.Mock;

const NOTE_TO_ADD_TEXT = 'test added text';

const mockDependencies = (requestFunction: Mock<any>): IPostNoteDependencies => {
  return {
    apiAddress: 'test',
    onAddingStarted: jest.fn().mockReturnValue(START_ACTION),
    onAddingError: jest.fn().mockReturnValue(ERROR_ACTION),
    onAddingSuccessful: jest.fn().mockReturnValue(SUCCESS_ACTION),
    convertNote: jest.fn().mockReturnValue(new Note()),
    sendRequest: requestFunction,
    data: {text: NOTE_TO_ADD_TEXT},
    generateLocalId: jest.fn(),
    deleteNote: jest.fn().mockReturnValue(DELETE_ACTION),
  };
};

describe('postNoteFactory tests', () => {
  let dispatch: Mock<any>;

  beforeEach(() => dispatch = jest.fn());

  it('note is correctly added to server', () => {
    const responseBody = JSON.stringify(mockServerNote(NOTE_TO_ADD_TEXT, '1'));
    const postNoteDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return postNoteFactory(postNoteDependencies)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(3);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(DELETE_ACTION);
        expect(dispatch.mock.calls[2][0]).toEqual(SUCCESS_ACTION);
      });
  });

  it('request to server is rejected', () => {
    const postNoteDependencies = mockDependencies(mockRejectedRequest());

    return postNoteFactory(postNoteDependencies)(dispatch, () => mockStoreState(), null)
      .catch(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
