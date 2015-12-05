import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('students', function() {
  	this.route('show', {path: '/:id'});
  	this.route('new');
  	this.route('lend-base', {path: '/:id/lend-base'});
  	this.route('return-base', {path: '/:id/return-base'});
  });
  this.route('books', function() {
  	this.route('new');
  	this.route('show', {path: '/:id'});
  });
  this.route('teachers', function() {
    this.route('new');
    this.route('show', {path: '/:id'});
  });
  this.route('lendings.lend', {path: '/:person_type/:person_id/lend'});
  this.route('lendings.return', {path: '/:person_type/:person_id/return'});
  this.route('login');
  this.route('register');
  this.route('settings');
  this.route('commits');
  this.route('about');
  this.route('help');
});

export default Router;
