import { convertNote } from '../../src/utils/noteConverter';
import { Note } from '../../src/models/Note';

describe('NoteCoverter tests', () => {
  it('Correctly convert server note to application note', () => {
    const text = 'Test visibleText';
    const id = '1';
    const expectedApplicationNote = new Note({
      visibleText: text,
      serverSynchronizedText: text,
      id,
      isEditActive: false,
    });
    const serverNote = {
      text,
      id,
      lastModificationDate: new Date(2017, 12, 5),
      creationDate: new Date(2017, 12, 4),
    };

    const actualApplicationNote = convertNote(serverNote);

    expect(actualApplicationNote).toEqual(expectedApplicationNote);
  });
});
