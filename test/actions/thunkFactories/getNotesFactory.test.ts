import { Note } from '../../../src/models/Note';
import {
  getNotesFactory,
  IGetNotesDependencies
} from '../../../src/actions/thunkFactories/getNotesFactory';
import {
  mockServerNote,
  mockRejectedRequest,
  mockResolvedRequest,
  START_ACTION,
  ERROR_ACTION,
  SUCCESS_ACTION,
  mockStoreState,
  IMockedResponse
} from '../../testUtils/mocks';

const mockDependencies = (responsePromise: Promise<IMockedResponse>): IGetNotesDependencies => {
  return {
    apiAddress: 'test',
    onGettingStarted: jest.fn().mockReturnValue(START_ACTION),
    onGettingError: jest.fn().mockReturnValue(ERROR_ACTION),
    onGettingSuccessful: jest.fn().mockReturnValue(SUCCESS_ACTION),
    convertNotes: jest.fn().mockReturnValue(new Note()),
    sendRequest: jest.fn().mockReturnValue(responsePromise),
  };
};

describe('getNotesFactory tests', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

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
