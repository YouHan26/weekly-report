/**
 * Created by YouHan on 2017/7/4.
 */
import envHelper from "./../helpers/envHelper";

const configureStore = () => {
  let store;
  if (envHelper.isDev()) {
    store = require('./store').default;
  } else {
    store = require('./store.prod').default;
  }
  return store;
};

export default configureStore;

