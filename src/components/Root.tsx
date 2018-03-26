import *as React from 'react';
import { Provider } from 'react-redux';
import { App } from '../containers-redux/applicationViews/App';
import { createApplicationStore } from '../utils/createApplicationStore';

const Root: React.StatelessComponent = (): JSX.Element => (
  <Provider store={createApplicationStore()}>
    <App />
  </Provider>
);

Root.displayName = 'Root';

export { Root };
