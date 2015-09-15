import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('students', function() {
  	this.route('show', {path: '/:id'});
  	this.route('edit', {path: '/:id/edit'});
  });
});

export default Router;
