/**
 * Created by YouHan on 2017/6/26.
 */
import {combineEpics} from "redux-observable";

import {userEpic} from "./user";
import {calendarEpic} from './calendar';
import {projectEpic} from './project';


const rootEpic = combineEpics(
  userEpic,
  calendarEpic,
  projectEpic
);

export default rootEpic;
