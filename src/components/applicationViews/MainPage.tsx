import * as React from 'react';
import { List } from '../../containers-redux/applicationViews/List';
import { ErrorWindow } from '../../containers-redux/applicationViews/ErrorWindow';

export interface IMainPageDataProps {
  readonly isLoadingFailed: boolean
}

const MainPage: React.StatelessComponent<IMainPageDataProps> = (props: IMainPageDataProps): JSX.Element => (
  props.isLoadingFailed
    ? <ErrorWindow />
    : <List />
);

MainPage.displayName = 'MainPage';

export { MainPage };
