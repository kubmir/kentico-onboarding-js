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
    throw new Error('Error while saving data to storage!');
  }
};

export const getSavedNotesFactory = (loadFunction) => (key) => {
  let serializedNotes;

  try {
    serializedNotes = loadFunction(key);
  }
  catch (error) {
    throw new Error('Error while retrieving data from storage!');
  }

  return serializedNotes && prepareNotesForApplication(JSON.parse(serializedNotes));
};

export const getSavedNotes = getSavedNotesFactory((key) => localStorage.getItem(key));
export const saveNotesData = saveNotesDataFactory((key, dataToStore) => localStorage.setItem(key, dataToStore));
