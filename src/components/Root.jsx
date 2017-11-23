import React from 'react';
import { Provider } from 'react-redux';
import { App } from './App.tsx';
import {
  getSavedNotes,
  saveNotesData,
} from '../utils/localStorage.ts';
import { createApplicationStore } from '../utils/createApplicationStore.ts';

export const Root = () => (
  <Provider store={createApplicationStore(getSavedNotes, saveNotesData)}>
    <App />
  </Provider>
);
