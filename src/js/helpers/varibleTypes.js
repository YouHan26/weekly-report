/**
 * Created by YouHan on 2017/6/27.
 */

export const userStatus = {
  init: 'init', //no token
  isLogin: 'isLogin', //has valid token
  needValidate: 'needValidate', // has token, need renewal
  needLogin: 'needLogin',  //has token, need login
  unKnow: 'unKnow'
};


export const taskPriority = [{
  name: '高',
  value: 1
}, {
  name: '中',
  value: 2
}, {
  name: '低',
  value: 3
}, {
  name: '无',
  value: 4
}];