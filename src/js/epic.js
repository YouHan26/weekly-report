/**
 * Created by YouHan on 2017/6/26.
 */
import {combineEpics} from "redux-observable";

import {userEpic} from "./user";
import {calendarEpic} from './calendar';
import {projectEpic} from './project';
import {mindMapEpic} from './mindMap';
import {configEpic} from './config';


const rootEpic = combineEpics(
  userEpic,
  calendarEpic,
  projectEpic,
  mindMapEpic,
  configEpic,
);

export default rootEpic;
