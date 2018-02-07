import *as React from 'react';
import { Provider } from 'react-redux';
import { App } from '../containers-redux/App';
import { createAppStoreServer } from '../utils/createAppStoreServer';

const Root: React.StatelessComponent = (): JSX.Element => (
  <Provider store={createAppStoreServer()}>
    <App />
  </Provider>
);

Root.displayName = 'Root';

export { Root };
