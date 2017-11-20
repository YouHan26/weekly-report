import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import LoginPage from "./user/views/LoginPage";
import CalendarPage from "./calendar/views/CalendarPage";
import Header from "./app/views/Header";

import styles from './App.css';

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

const NoMatch = () => {
  return (
    <div>
      not match
    </div>
  );
};


const App = (props) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.content}>
        <Switch>
          <Route exact={true} path={`/`} component={CalendarPage} />
          <Route exact={true} path={`/login`} component={LoginPage} />
          <PrivateRoute path="/protected" component={Protected} />
          <Route component={NoMatch} />
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