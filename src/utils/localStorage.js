export const saveNotesData = (state) => {
  const notes = state.notes;

  try {
    const serializedNotes = JSON.stringify(prepareNotesForStoring(notes));
    localStorage.setItem('notes', serializedNotes);
  }
  catch (err) {
    console.error('Error while storing data to local storage!');
  }
};

export const getSavedNotes = () => {
  try {
    const serializedNotes = localStorage.getItem('notes');

    if (serializedNotes === null) {
      return undefined;
    }

    return prepareNotesForApplication(JSON.parse(serializedNotes));
  }
  catch (err) {
    console.error('Error while retrieving data from local storage!' + err.message);
    return undefined;
  }
};

const prepareNotesForStoring = (notes) => {
  return notes
    .valueSeq()
    .map(note => ({
      text: note.text,
      uid: note.uid,
    }));
};

const prepareNotesForApplication = (notes) => {
  return notes
    .map(note => {
      return [note.uid,
        {
          ...note,
          isEditActive: false,
        },
      ];
    });
};
