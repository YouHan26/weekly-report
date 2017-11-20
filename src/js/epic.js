/**
 * Created by YouHan on 2017/6/26.
 */
import {combineEpics} from "redux-observable";

import {epic as userEpic} from "./user/index";


const rootEpic = combineEpics(
  userEpic
);

export default rootEpic;
