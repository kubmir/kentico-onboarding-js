import * as React from 'react';
import '../../styles/loader.css';

const Loader: React.StatelessComponent = (): JSX.Element => (
  <div>
    <p className="info-text"> Notes are loading from server. Please wait. </p>
    <div className="loader" />
  </div>
);

Loader.displayName = 'Loader';

export { Loader };
