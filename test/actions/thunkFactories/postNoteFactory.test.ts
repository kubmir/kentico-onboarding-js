import {
  postNoteFactory,
  repostNoteFactory
} from '../../../src/actions/thunkFactories/postNoteFactory';
import {
  IMockedResponse,
  mockRejectedRequest,
  mockResolvedRequest,
  mockServerNote,
  mockStoreState,
} from '../../testUtils/mocks';
import {
  SENDING_NOTE_TO_SERVER_FAILURE,
  SENDING_NOTE_TO_SERVER_SUCCESS,
  START_RESENDING_NOTE_TO_SERVER,
  START_SENDING_NOTE_TO_SERVER
} from '../../../src/constants/actionTypes';

const NOTE_TO_ADD_TEXT = 'test added text';
const NOTE_ID = '1';

const mockDependencies = (responsePromise: Promise<IMockedResponse>) => {
  return {
    apiAddress: 'test',
    convertNote: jest.fn().mockReturnValue({ text: NOTE_TO_ADD_TEXT, id: NOTE_ID }),
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
      generateLocalId: jest.fn().mockReturnValue(NOTE_ID),
    };

    return postNoteFactory(postNoteDependencies)({ text: NOTE_TO_ADD_TEXT })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_SENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_SUCCESS);
      });
  });

  it('PostNoteFactory - request to server is rejected', () => {
    const postNoteDependencies = {
      ...mockDependencies(mockRejectedRequest()),
      generateLocalId: jest.fn().mockReturnValue(NOTE_ID),
    };

    return postNoteFactory(postNoteDependencies)({ text: NOTE_TO_ADD_TEXT })(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_SENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_FAILURE);
      });
  });

  it('RepostNoteFactory - retry action remove failed note and add new note', () => {
    const responseBody = JSON.stringify(mockServerNote(NOTE_TO_ADD_TEXT, NOTE_ID));
    const postNoteDependencies = mockDependencies(mockResolvedRequest(responseBody));

    return repostNoteFactory(postNoteDependencies)({ text: NOTE_TO_ADD_TEXT }, NOTE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_RESENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_SUCCESS);
      });
  });

  it('RepostNoteFactory - request to server is rejected', () => {
    const postNoteDependencies = mockDependencies(mockRejectedRequest());

    return repostNoteFactory(postNoteDependencies)({ text: NOTE_TO_ADD_TEXT }, NOTE_ID)(dispatch, () => mockStoreState(), null)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0].type).toEqual(START_RESENDING_NOTE_TO_SERVER);
        expect(dispatch.mock.calls[1][0].type).toEqual(SENDING_NOTE_TO_SERVER_FAILURE);
      });
  });
});
