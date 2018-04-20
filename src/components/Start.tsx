import * as React from 'react';
import { App } from '../containers-redux/applicationViews/App';
import {
  BrowserRouter,
  Link
} from 'react-router-dom';
import { About } from './applicationViews/About';
import AppBar from 'material-ui/AppBar';
import { Route } from 'react-router';
import { MuiThemeProvider } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

interface IRootState {
  readonly open: boolean;
}

export class Start extends React.Component<{}, IRootState> {

  constructor() {
    super();
    this.state = { open: false };
  }

  _handleToggle = () =>
    this.setState({ open: !this.state.open });

  render() {
    return (
          <MuiThemeProvider>
            <BrowserRouter>
            <div>
              <AppBar title={'Notes'} onLeftIconButtonClick={() => this._handleToggle()} />
              <Drawer open={this.state.open}>
                <MenuItem>
                  <Link to="/notes" onClick={() => this._handleToggle()}>Notes</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/about" onClick={() => this._handleToggle()}>About</Link>
                </MenuItem>
              </Drawer>
              <Route exact path="/notes" render={props => (
                <App {...props}/>
              )} />
              <Route path="/about" component={About} />
            </div>
            </BrowserRouter>
          </MuiThemeProvider>
    );
  }
}
