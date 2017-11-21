/**
 * Created by YouHan on 2017/6/26.
 */
import {combineEpics} from "redux-observable";

import {userEpic} from "./user";
import {calendarEpic} from './calendar';


const rootEpic = combineEpics(
  userEpic,
  calendarEpic
);

export default rootEpic;
