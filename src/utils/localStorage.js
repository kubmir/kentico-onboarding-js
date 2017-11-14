import {
  prepareNotesForStoring,
  prepareNotesForApplication,
} from './localStorageUtils';

export const saveNotesDataFactory = (saveFunction) => (key, dataToStore) => {
  try {
    const serializedNotes = JSON.stringify(prepareNotesForStoring(dataToStore));
    saveFunction(key, serializedNotes);
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while storing data to local storage! ' + error.message);
  }
};

export const saveNotesData = saveNotesDataFactory((key, dataToStore) => localStorage.setItem(key, dataToStore));

export const getSavedNotesFactory = (loadFunction) => (key) => {
  let serializedNotes;

  try {
    serializedNotes = loadFunction(key);
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while retrieving data from local storage! ' + error.message);
  }

  return serializedNotes === null
    ? undefined
    : prepareNotesForApplication(JSON.parse(serializedNotes));
};

export const getSavedNotes = getSavedNotesFactory((key) => localStorage.getItem(key));
