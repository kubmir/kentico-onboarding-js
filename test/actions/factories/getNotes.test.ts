import { Note } from '../../../src/models/Note';
import {
  getNotesFactory,
  IGetNotesDependencies
} from '../../../src/actions/factories/getNotes';
import {
  mockResponse,
  mockServerNote
} from '../../testUtils/mocks';
import { Promise } from 'es6-promise';
import Mock = jest.Mock;

const START_ACTION = { type: 'TEST_STARTED' };
const ERROR_ACTION = { type: 'TEST_ERROR' };
const SUCCESS_ACTION = { type: 'TEST_SUCCESSFUL' };

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

const resolvedRequest = (responseBody: string): Mock<Promise<any>> =>
  jest.fn(() => Promise.resolve(mockResponse(200, true, responseBody)));

const rejectedRequest = (): Mock<any> =>
  jest.fn().mockImplementation(() => Promise.reject(mockResponse(200, true)));

describe('getNotesFactory tests', () => {
  let dispatch: Mock<any>;

  beforeEach(() => dispatch = jest.fn());

  it('notes are correctly loaded from server', () => {
    const responseBody = JSON.stringify([mockServerNote('first', '1'), mockServerNote('second', '2')]);
    const getNotesDependencies = mockDependencies(resolvedRequest(responseBody));

    return getNotesFactory(getNotesDependencies)(dispatch)
      .then(() => {
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(SUCCESS_ACTION);
      });
  });

  it('request to server is rejected', () => {
    const getNotesDependencies = mockDependencies(rejectedRequest());

    return getNotesFactory(getNotesDependencies)(dispatch)
      .catch(reject => {
        expect(reject).toBeTruthy();
        expect(dispatch.mock.calls.length).toEqual(2);
        expect(dispatch.mock.calls[0][0]).toEqual(START_ACTION);
        expect(dispatch.mock.calls[1][0]).toEqual(ERROR_ACTION);
      });
  });
});
