import { urlBuilder } from '../../src/utils/urlBuilder';
import { API_PREFIX } from '../../src/constants/apiPrefix';

describe('urlBuilder ->', () => {
  it('return correct url with id', () => {
    const NOTE_ID = '1';
    const expectedUrl = API_PREFIX + '/' + NOTE_ID;

    const actualUrl = urlBuilder(NOTE_ID);

    expect(actualUrl).toEqual(expectedUrl);
  });
});
