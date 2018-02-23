import { Promise } from 'es6-promise';
import { OrderedMap } from 'immutable';
import { IStoreState } from '../../src/models/IStoreState';
import { IServerNote } from '../../src/models/IServerNote';

export interface IMockedResponse {
  readonly status: number;
  readonly ok: boolean;
  readonly json: () => Promise<string | undefined>;
}

const mockedJson = (body?: string) => (): Promise<string | undefined> =>
  Promise.resolve(body);

export const mockResponse = (status: number, ok: boolean, body?: string): Promise<IMockedResponse> =>
  Promise.resolve({ status, ok, json: mockedJson(body) });

export const mockServerNote = (text: string, id: Guid): IServerNote => ({
  text,
  id,
  lastModificationDate: new Date(2017, 12, 5),
  creationDate: new Date(2017, 12, 4),
});

export const mockResolvedRequest = (responseBody: string): Promise<IMockedResponse> =>
  Promise.resolve(mockResponse(200, true, responseBody));

export const mockRejectedRequest = (): Promise<IMockedResponse> =>
  Promise.reject(mockResponse(200, true));

export const START_ACTION = { type: 'TEST_STARTED' };
export const ERROR_ACTION = { type: 'TEST_ERROR' };
export const SUCCESS_ACTION = { type: 'TEST_SUCCESSFUL' };
export const FALSE_INITIAL_STATE = false;
export const TRUE_INITIAL_STATE = true;

export const mockStoreState = (): IStoreState =>
  ({
    notes: {
      listOfNotes: OrderedMap(),
      isAddingNote: false,
      addNoteText: '',
    },
    notesLoader: {
      isLoadingFailed: false,
      isLoadingNotes: false,
      isLoadingSuccessful: false,
      errorMessage: '',
    }
  });

