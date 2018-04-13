import { HttpMethods } from '../../enums/HttpMethods';
import { IServerNote } from '../../models/Note';
import { IPostNote } from './postNoteFactory';

export interface IRequestInit {
  readonly method: HttpMethods;
  readonly body: string;
  readonly headers: { 'content-type': string };
}

export interface INoteDto {
  readonly text: string;
  readonly id: string;
}

const checkResponseStatus = (response: Response): Response => {
  if (!response.ok) {
    throw Error('Server error. Error  ' + response.status + ' ' + response.statusText);
  } else {
    return response;
  }
};

export const fetchFactory = <TType>(injectedFetch: (requestInit: IRequestInit) => Promise<Response>, httpMethod: HttpMethods) =>
  (data?: INoteDto | IPostNote): Promise<TType> => {
    const requestInitialization = {
      method: httpMethod,
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' },
    };

    return injectedFetch(requestInitialization)
      .then(response => checkResponseStatus(response))
      .then(response => response.json());
  };

export const fetchWithIdFactory = (fetchBuilder: (url: string, requestInit: IRequestInit) => Promise<Response>, urlBuilder: (id: Guid) => string,
  httpMethod: HttpMethods) =>
  (id: Guid, data?: INoteDto | IPostNote): Promise<IServerNote> => {
    const url = urlBuilder(id);
    const fetchToInject = (requestInit: IRequestInit) => fetchBuilder(url, requestInit);

    return fetchFactory<IServerNote>(fetchToInject, httpMethod)(data);
  };
