import { Note } from '../../../src/models/Note';
import {
  getNotesFactory,
  IGetNotesDependencies
} from '../../../src/actions/factories/getNotesFactory';
import {
  mockServerNote,
  mockRejectedRequest,
  mockResolvedRequest,
  START_ACTION,
  ERROR_ACTION,
  SUCCESS_ACTION,
  mockStoreState
} from '../../testUtils/mocks';
import Mock = jest.Mock;

const mockDependencies = (requestFunction: Mock<any>): IGetNotesDependencies => {
  return {
    apiAddress: 'test',
    onGettingStarted: jest.fn().mockReturnValue(START_ACTION),
    onGettingError: jest.fn().mockReturnValue(ERROR_ACTION),
    onGettingSuccessful: jest.fn().mockReturnValue(SUCCESS_ACTION),
    convertNotes: jest.fn().mockReturnValue(new Note()),
    sendRequest: requestFunction,
  };
};

describe('getNotesFactory tests', () => {
  let dispatch: Mock<any>;

  beforeEach(() => dispatch = jest.fn());

  it('notes are correctly loaded from server', () => {
    const responseBody = JSON.stringify([mockServerNote('first', '1'), mockServerNote('second', '2')]);
    const getNotesDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return getNotesFactory(getNotesDependencies)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(SUCCESS_ACTION);
      });
  });

  it('request to server is rejected', () => {
    const getNotesDependencies = mockDependencies(mockRejectedRequest());

    return getNotesFactory(getNotesDependencies)(dispatch, () => mockStoreState(), null)
      .catch(reject => {
        expect(reject).toBeTruthy();
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
