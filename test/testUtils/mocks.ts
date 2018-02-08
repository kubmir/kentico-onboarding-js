import 'isomorphic-fetch';
import { Promise } from 'es6-promise';

interface IMockedResponse {
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
