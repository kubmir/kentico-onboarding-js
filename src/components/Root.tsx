import * as React from 'react';
import { Provider } from 'react-redux';
import { createApplicationStore } from '../utils/createApplicationStore';
import { Start } from './Start';

const Root: React.StatelessComponent = (): JSX.Element => (
  <Provider store={createApplicationStore()}>
    <Start />
  </Provider>
);

Root.displayName = 'Root';

export { Root };
