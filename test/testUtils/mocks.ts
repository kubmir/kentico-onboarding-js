import 'isomorphic-fetch';
import { Promise } from 'es6-promise';
import { OrderedMap } from 'immutable';
import { IStoreState } from '../../src/models/IStoreState';

export interface IMockedResponse {
  readonly status: number;
  readonly ok: boolean;
  readonly json: () => Promise<string | undefined>;
}
export const mockResponse = (status: number, ok: boolean, body?: string): Promise<IMockedResponse> =>
  Promise.resolve({ status, ok, json: () => Promise.resolve(body) });

export const mockServerNote = (text: string, id: Guid) => ({
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

