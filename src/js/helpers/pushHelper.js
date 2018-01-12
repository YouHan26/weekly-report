import Push from 'push.js';
import moment from "moment";

export default class pushHelper {
  constructor() {
    
    this.interval = null;
    this.queue = [];
    this.waterAlert = null;
  }
  
  static notify(event) {
    Push.create(event.title, {
      body: event.desc,
      icon: 'notice.ico',
      onClick: function () {
        window.focus();
        this.close();
      }
    });
  }
  
  static init() {
    this.interval = setInterval(() => {
      if (this.queue.length <= 0) {
        return;
      }
      const current = this.queue[0];
      if (current.range[0].isSameOrAfter(moment(), 'minute')) {
        pushHelper.notify(current);
        this.queue.splice(0, 1);
      }
    }, 1000 * 60);
  }
  
  static clear() {
    this.queue = [];
    
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  
  static start(arr) {
    this.clear();
    this.queue = arr.sort((a, b) => {
      return a.range[0].isSameOrBefore(b.range[0], 'minute');
    })
      .filter((item) => {
        return item.notice && item.range[0].isSameOrAfter(moment(), 'minute');
      });
    pushHelper.init();
  }
  
  static push(arr) {
    this.queue = this.queue.concat(arr).sort((a, b) => {
      return a.range[0].isSameOrBefore(b.range[0], 'minute');
    });
  }
  
  static alertWater(alert) {
    if (alert) {
      if (!this.waterAlert) {
        this.waterAlert = setInterval(() => {
          console.log(new Date(), new Date().getMinutes());
          if (new Date().getMinutes() === 0) {
            pushHelper.notify({
              title: '喝水时间到',
              desc: ''
            });
          }
        }, 1000 * 60);
      }
    } else {
      if (this.waterAlert) {
        clearInterval(this.waterAlert);
        this.waterAlert = null;
      }
    }
  }
}