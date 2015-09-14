import DS from 'ember-data';
import Ember from 'ember';
import ENV from 'obsidian-web/config/environment'

export default DS.RESTAdapter.extend({
	host: ENV.data_host,
	pathForTypen(type) {
		return Ember.String.underscore(Ember.Inflector.pluralize(type));
	}
});
