import EmberRouter from '@ember/routing/router';
import config from 'epocha/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('about', function() {});
  this.route('single');
  this.route('downloads');
});
