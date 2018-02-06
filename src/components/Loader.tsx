import * as React from 'react';
import '../styles/loader.css';

const Loader: React.StatelessComponent = (): JSX.Element => (
  <div>
    <p> Notes are loading from server. Please wait. </p>
    <div className="loader" />
  </div>
);

export { Loader };
