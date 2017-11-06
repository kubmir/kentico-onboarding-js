import { generateUid } from '../../src/utils/generateUid';

describe('UID generator', () => {
  it('returns uid matching conditions for uuid4', () => {
    const uidRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

    const actualUid = generateUid();

    expect(uidRegex.test(actualUid)).toBeTruthy();
  });

  it('returns different uid in every call', () => {

    const firstUid = generateUid();
    const secondUid = generateUid();

    expect(firstUid).not.toEqual(secondUid);
  });
});
