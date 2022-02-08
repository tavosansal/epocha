import { later } from '@ember/runloop';
import Service from '@ember/service';
import moment from 'moment-timezone';

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export default class CurrentTimeService extends Service {
  get timezones() {
    return moment.tz.names();
  }

  get currentTimezone() {
    return moment.tz.guess();
  }

  constructor(...args) {
    super(...args);
    this.updateTime();
  }

  updateTime() {
    // Update the time every second.
    const updateClock = later(() => {
      this.set('currentTime', moment().unix());
      this.updateTime();
    }, 1000);
    this.set('updateClock', updateClock);
  }
}
