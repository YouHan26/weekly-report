import firebase from 'firebase';

import './authHelper';
import authHelper from "./authHelper";

const db = firebase.database();

const init = () => {
  // firebase.database.enableLogging(true);
};

init();

class refHelper {
  constructor(refName) {
    this.refName = refName;
    this.ref = db.ref().child(this.refName);
  }

  load() {
    return this.ref
    // .orderByChild('uid')
    // .equalTo(authHelper.getUid())
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });
  };

  add(data) {
    const key = this.ref.push().key;

    return this.update({...data, key});
  }

  update(data) {
    const {key} = data;
    return db.ref().update({
      [`/${this.refName}/${key}`]: {uid: authHelper.getUid(), ...data, key}
    })
      .then((error) => {
        return {
          error,
          key
        };
      });
  }

  remove(key) {
    return key && this.ref.child(key).remove();
  }
}

export const eventHelper = new refHelper('events');
export const projectHelper = new refHelper('projects');
export const mindMapHelper = new refHelper('mindMaps');
export const tagsHelper = new refHelper('tags');
export const userHelper = new refHelper('users');