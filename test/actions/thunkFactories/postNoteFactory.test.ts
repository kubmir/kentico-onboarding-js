import { Note } from '../../../src/models/Note';
import {
  postNoteFactory,
  repostNoteFactory
} from '../../../src/actions/thunkFactories/postNoteFactory';
import {
  ERROR_ACTION,
  IMockedResponse,
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
  START_ACTION,
  SUCCESS_ACTION
} from '../../testUtils/mocks';

const NOTE_TO_ADD_TEXT = 'test added text';
const NOTE_ID = '1';

const mockDependencies = (responsePromise: Promise<IMockedResponse>) => {
  return {
    apiAddress: 'test',
    onAddingStarted: jest.fn().mockReturnValue(START_ACTION),
    onAddingError: jest.fn().mockReturnValue(ERROR_ACTION),
    onAddingSuccessful: jest.fn().mockReturnValue(SUCCESS_ACTION),
    convertNote: jest.fn().mockReturnValue(new Note()),
    sendRequest: jest.fn().mockReturnValue(responsePromise),
  };
};

describe('Post note factories tests', () => {
  const dispatch = jest.fn();

  beforeEach(() => dispatch.mockReset());

  it('PostNoteFactory - note is correctly added to server', () => {
    const responseBody = JSON.stringify(mockServerNote(NOTE_TO_ADD_TEXT, NOTE_ID));
    const postNoteDependencies = {
      ...mockDependencies(mockResolvedRequest(responseBody)),
      generateLocalId: jest.fn(),
    };

    return postNoteFactory(postNoteDependencies)({ text: 'Resolved' })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(SUCCESS_ACTION);
      });
  });

  it('PostNoteFactory - request to server is rejected', () => {
    const postNoteDependencies = {
      ...mockDependencies(mockRejectedRequest()),
      generateLocalId: jest.fn(),
    };

    return postNoteFactory(postNoteDependencies)({ text: 'Rejected' })(dispatch, () => mockStoreState(), null)
      .catch(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });

  it('RepostNoteFactory - retry action remove failed note and add new note', () => {
    const responseBody = JSON.stringify(mockServerNote(NOTE_TO_ADD_TEXT, NOTE_ID));
    const postNoteDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return repostNoteFactory(postNoteDependencies)({ text: 'Resolved' }, '1')(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(SUCCESS_ACTION);
      });
  });

  it('RepostNoteFactory - request to server is rejected', () => {
    const postNoteDependencies = {
      ...mockDependencies(mockRejectedRequest()),
      generateLocalId: jest.fn(),
    };

    return repostNoteFactory(postNoteDependencies)({ text: 'Rejected' }, '1')(dispatch, () => mockStoreState(), null)
      .catch(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
