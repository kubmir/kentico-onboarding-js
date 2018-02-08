import { Promise } from 'es6-promise';
import { fetchFactory } from '../../../src/actions/factories/fetchFactory';
import { mockResponse } from '../../testUtils/mocks';

const mockResolvedFetch = (status: number, statusText: string) => {
  const mockedInjectedFetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(status, statusText)));

  return fetchFactory(mockedInjectedFetch);
};

const mockRejectedFetch = (status: number, statusText: string) => {
  const mockedInjectedFetch = jest.fn().mockImplementation(() => Promise.reject(mockResponse(status, statusText)));

  return fetchFactory(mockedInjectedFetch);
};


describe('FetchFactory tests', () => {
  it('throws error when promise is resolved but response ok is false - error 500', () => {
    const HTTP_ERROR_STATUS = 500;
    const saveFunction = mockResolvedFetch(HTTP_ERROR_STATUS, 'responseText');

    return saveFunction('test', 'GET')
      .then(
        response => fail('Expected error was not throw for status ' + response.status),
        error => expect(error).toBeTruthy()
      );
  });

  it('return correct response when response ok is true - status code 200', () => {
    const HTTP_SUCCESS_STATUS = 200;
    const expectedStatusText = 'response text';
    const saveFunction = mockResolvedFetch(HTTP_SUCCESS_STATUS, expectedStatusText);

    return saveFunction('test', 'GET')
      .then(response => {
          expect(response.status).toEqual(200);
          expect(response.statusText).toEqual(expectedStatusText);
        }
      );
  });

  it('throw error when fetch failed - promise is rejected', () => {
    const saveFunction = mockRejectedFetch(200, '');

    return saveFunction('test', 'GET')
      .catch(reject => expect(reject).toBeTruthy());
  });
});
