import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import LoginModal from "./user/views/LoginModal";
import CalendarPage from "./calendar/views/CalendarPage";
import Header from "./app/views/Header";

import styles from './App.css';
import HomePage from "./app/views/HomePage";

const Protected = () => <h3>Protected</h3>;

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