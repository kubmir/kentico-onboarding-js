import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { IKeyMap } from '../../models/IKeyMap';
import { Loader } from './Loader';
import { MainPage } from '../../containers-redux/applicationViews/MainPage';
import '../../sticky-footer.css';
import { IAction } from '../../models/IAction';

const keyMap: IKeyMap = {
  cancelEditing: 'esc',
  saveChanges: 'enter',
};

export interface IAppDataProps {
  readonly isLoadingNotes: boolean;
}

export interface IAppCallbacksProps {
  readonly loadNotesFromServer: () => Promise<IAction>;
}

type IAppProps = IAppDataProps & IAppCallbacksProps;

export class App extends React.PureComponent<IAppProps> {
  static displayName = 'App';

  static propTypes = {
    isLoadingNotes: PropTypes.bool.isRequired,
  };

  constructor(props: IAppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.loadNotesFromServer();
  }

  render() {
    const pageContent = this.props.isLoadingNotes
      ? <Loader />
      : <MainPage />;

    return (
      <div>
        <div className="container">
          <div className="header clearfix">
            <h3 className="text-muted">Kentico Academy</h3>
          </div>

          <div className="jumbotron">
            <h1>JS onboarding</h1>
            <p className="lead">
              We will implement simple task using
              <a href="https://facebook.github.io/react/docs/hello-world.html"> ReactJS</a> and later move on to refactor our app to use
              <a href="https://facebook.github.io/immutable-js/"> Immutable</a> and <a href="http://redux.js.org/"> Redux</a>.
            </p>
            <p>You can find all the relevant info in git repository.</p>
            <p>
              <a
                className="btn btn-lg btn-success"
                href="https://github.com/Suzii/kentico-onboarding-js"
                role="button"
              >
                Fork me on GitHub
              </a>
            </p>
          </div>

          <section id="app-content">
            <div className="container">
              <HotKeys keyMap={keyMap}>
                <div className="row">
                  <div className="col-sm-12 col-md-offset-1 col-md-10">
                    {pageContent}
                  </div>
                </div>
              </HotKeys>
            </div>
          </section>
        </div>
        <footer className="footer">
          <p>&copy; 2017 Kentico software, s.r.o</p>
        </footer>
      </div>
    );
  }
}
