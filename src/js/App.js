import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import G6 from '@antv/g6';

import LoginModal from "./user/views/LoginModal";
import CalendarPage from "./calendar/views/CalendarPage";
import Header from "./app/views/Header";

import styles from './App.css';
import HomePage from "./app/views/HomePage";
import ChangeLog from "./app/views/ChangeLog";
import UtilsPage from "./UtilsPage/views/UtilsPage";
import QRcodePage from "./UtilsPage/views/QRcodePage";
import UrlCollectionPage from "./UtilsPage/views/UrlCollectionPage";
import TomatoPage from "./UtilsPage/views/TomatoPage";
import MindMap from "./mindMap/views/MindMap";
import MindMapList from "./mindMap/views/MindMapList";
import ConfigPage from "./config/views/ConfigPage";
import ConstantListPage from "./constant/views/ConstantListPage";
import ConstantNewPage from "./constant/views/ConstantNewPage";

G6.track(false);

// const Protected = () => <h3>Protected</h3>;

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    false ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }} />
    )
  )} />
);

const App = (props) => {
  return (
    <div className={styles.root}>
      <Header />
      <LoginModal />
      <div className={styles.content}>
        <Switch>
          <Route exact={true} path={`/`} component={CalendarPage} />
          <PrivateRoute path="/calendar" component={CalendarPage} />
          <Route exact={true} path="/changelog" component={ChangeLog} />
          <Route exact={true} path="/config" component={ConfigPage} />
          <Route exact={true} path="/helpers" component={UtilsPage} />
          <Route exact={true} path="/mindMap" component={MindMapList} />
          <Route exact={true} path="/mindMap/new" component={MindMap} />
          <Route exact={true} path="/mindMap/:id" component={MindMap} />
          <Route exact={true} path="/helpers/qrcode" component={QRcodePage} />
          <Route exact={true} path="/helpers/locations" component={UrlCollectionPage} />
          <Route exact={true} path="/helpers/tomato" component={TomatoPage} />
          
          <Route exact={true} path={"/constants"} component={ConstantListPage} />
          <Route exact={true} path={"/constants/new"} component={ConstantNewPage} />
          <Route component={HomePage} />
        </Switch>
      </div>
    </div>
  );
};

export default () => {
  return (
    <Router basename="/weekly-report">
      <Route path='/*' component={App} />
    </Router>
  );
};