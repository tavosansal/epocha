import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

export default Router.map(function() {
  this.resource('robot', function() {});
  this.resource('human', function() {});
  this.route('about');
});
