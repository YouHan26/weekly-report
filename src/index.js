import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import moment from "moment";

import "moment/locale/zh-cn";

import App from "./js/App";
import "./index.css";
import configureStore from "./js/store/configureStore";

moment.locale('zh-cn');

const Root = () => {
  
  return (
    <Provider store={configureStore()}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
