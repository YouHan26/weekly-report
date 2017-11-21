import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import LoginModal from "./user/views/LoginModal";
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
      <LoginModal />
      <div className={styles.content}>
        <Switch>
          <Route exact={true} path={`/`} component={CalendarPage} />
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