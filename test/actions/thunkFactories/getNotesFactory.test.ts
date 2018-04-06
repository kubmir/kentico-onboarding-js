import { Note } from '../../../src/models/Note';
import {
  getNotesFactory,
  IGetNotesDependencies
} from '../../../src/actions/thunkFactories/getNotesFactory';
import {
  mockServerNote,
  mockRejectedRequest,
  mockResolvedRequest,
  mockStoreState,
  IMockedResponse
} from '../../testUtils/mocks';
import {
  LOADING_NOTES_FAILURE,
  LOADING_NOTES_SUCCESS,
  START_LOADING_NOTES
} from '../../../src/constants/actionTypes';

const mockDependencies = (responsePromise: Promise<IMockedResponse>): IGetNotesDependencies => {
  return {
    apiAddress: 'test',
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
        expect(dispatch.mock.calls[0][0].type).toEqual(START_LOADING_NOTES);
        expect(dispatch.mock.calls[1][0].type).toEqual(LOADING_NOTES_SUCCESS);
      });
  });

  it('request to server is rejected', () => {
    const getNotesDependencies = mockDependencies(mockRejectedRequest());

    return getNotesFactory(getNotesDependencies)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_LOADING_NOTES);
        expect(dispatch.mock.calls[1][0].type).toEqual(LOADING_NOTES_FAILURE);
      });
  });
});
