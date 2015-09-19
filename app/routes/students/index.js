import Ember from 'ember';
import ENV from 'obsidian-web/config/environment';

export default Ember.Route.extend({
	model() {
		return this.store.findAll('student');
	}
});