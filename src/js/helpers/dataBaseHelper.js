import firebase from 'firebase';

import './authHelper';

const db = firebase.database();

const init = () => {
  firebase.database.enableLogging(true);
};

init();

class refHelper {
  constructor(refName) {
    this.refName = refName;
    this.ref = db.ref().child(this.refName);
  }
  
  load() {
    return this.ref.once('value')
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
      [`/${this.refName}/${key}`]: {...data, key}
    });
  }
  
  remove(key) {
    return key && this.ref.child(key).remove();
  }
}

export const eventHelper = new refHelper('events');
export const projectHelper = new refHelper('projects');