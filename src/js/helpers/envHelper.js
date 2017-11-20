/**
 * Created by YouHan on 2017/6/14.
 */

const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

const getPlatform = () => {
  //TODO return ios, android, web and electron
  return;
};

export default {
  isDev,
  getPlatform
};
