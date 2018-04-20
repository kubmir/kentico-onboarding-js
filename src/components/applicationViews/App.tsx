import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import { IKeyMap } from '../../models/IKeyMap';
import { Loader } from './Loader';
import { MainPage } from '../../containers-redux/applicationViews/MainPage';
import '../../sticky-footer.css';
import { IAction } from '../../actions/IAction';
import { HorizontalLinearStepper } from '../Stepper';
import { RouteComponentProps } from 'react-router';

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

type IAppProps = RouteComponentProps<{}> & IAppDataProps & IAppCallbacksProps;

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

    console.log(this.props.location);
    console.log(this.props.history);
    console.log(this.props.match);

    return (
      <section id="app-content">
        <div className="container">
          <HotKeys keyMap={keyMap}>
            <div className="row">
              <div className="col-sm-12 col-md-offset-1 col-md-10">
                <HorizontalLinearStepper />
                <div style={{ paddingBottom: 50 }}/>
                {pageContent}
                <div style={{ paddingBottom: 50 }}/>
              </div>
            </div>
          </HotKeys>
        </div>
      </section>
    );
  }
}
