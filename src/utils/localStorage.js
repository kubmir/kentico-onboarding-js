export const saveNotesData = (state) => {
  const notes = state.notes;

  try {
    const serializedNotes = JSON.stringify(notes);
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

    return JSON.parse(serializedNotes);
  }
  catch (err) {
    console.error('Error while retrieving data from local storage!');
    return undefined;
  }
};
