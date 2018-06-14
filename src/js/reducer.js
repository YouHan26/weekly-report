/**
 * Created by YouHan on 2017/11/20.
 */
import {combineReducers} from 'redux';

import {userReducer} from './user';
import {calendarReducer} from './calendar';
import {projectReducer} from './project';
import {mindMapReducer} from './mindMap';
import {configReducer} from './config';

import constant from './constant/redux';

export default combineReducers({
  user: userReducer,
  calendar: calendarReducer,
  projects: projectReducer,
  mindMap: mindMapReducer,
  config: configReducer,
  constant
});
