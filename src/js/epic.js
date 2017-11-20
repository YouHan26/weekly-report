/**
 * Created by YouHan on 2017/6/26.
 */
import {combineEpics} from "redux-observable";

import {userEpic} from "./user";


const rootEpic = combineEpics(
  userEpic
);

export default rootEpic;
