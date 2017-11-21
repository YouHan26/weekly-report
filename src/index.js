import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import moment from "moment";
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import "moment/locale/zh-cn";

import App from "./js/App";
import configureStore from "./js/store/configureStore";

moment.locale('zh-cn');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const store = configureStore();

const Root = () => {
  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
