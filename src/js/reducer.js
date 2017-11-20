/**
 * Created by YouHan on 2017/11/20.
 */
import {combineReducers} from 'redux';

import {reducer as user} from './user/index';

export default combineReducers({
  user
});
