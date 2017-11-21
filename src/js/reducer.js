/**
 * Created by YouHan on 2017/11/20.
 */
import {combineReducers} from 'redux';

import {userReducer} from './user';
import {calendarReducer} from './calendar';

export default combineReducers({
  user: userReducer,
  calendar: calendarReducer
});
