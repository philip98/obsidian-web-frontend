import Ember from 'ember';
import ENV from 'obsidian-web/config/environment';

export default Ember.Service.extend({
	changed: false,
	setData(school, token, id) {
		window.sessionStorage.secretToken = token;
		window.sessionStorage.currentSchoolId = school;
		window.sessionStorage.secretId = id;
	},
	secretToken: function() {
		if (window.sessionStorage.secretToken) {
			return window.sessionStorage.secretToken;
		} else {
			return '';
		}
	}.property().volatile(),
	secretId: function() {
		if (window.sessionStorage.secretId) {
			return window.sessionStorage.secretId;
		} else {
			return '';
		}
	}.property().volatile(),
	currentSchoolId: function() {
		if (window.sessionStorage.currentSchoolId) {
			return window.sessionStorage.currentSchoolId;
		} else {
			return '';
		}
	}.property().volatile(),
	isAuthenticated: Ember.computed('secretToken', 'secretId', 'currentSchoolId', 'changed', function() {
		return this.get('secretToken') && this.get('secretId') && this.get('currentSchoolId');
	}),
	authenticate(name, password) {
		return Ember.$.ajax({
			type: 'POST',
			url: ENV.data_host + '/schools/sign_in', 
			dataType: 'json',
			accepts: {
				json: 'application/json'
			},
			contentType: 'application/json',
			data: JSON.stringify({
				name: name,
				password: password
			})
		}).then((response) => {
			this.setData(response.school_id, response.token, response.secret_id);
			this.toggleProperty('changed');
			return true;
		}, () => {
			throw new Error('Falsches Passwort');
		});
	},
	invalidate() {
		return Ember.$.ajax({
			type: 'DELETE',
			url: ENV.data_host + '/schools/sign_out'
		}).then(() => {
			this.setData('', '', '');
			this.toggleProperty('changed');
			return true;
		}, () => {
			throw new Error('Ein Fehler beim Ausloggen ist aufgetreten');
		});
	},
	init() {
		Ember.$.ajaxPrefilter((options, originalOptions, jqXHR) => {
			if (this.isAuthenticated && options.url.indexOf(ENV.data_host) > -1) {
				jqXHR.setRequestHeader('Authorization', 'Token token="' + this.secretToken + 
					'", secret_id="' + this.secretId + '"');
			}
		});
	}
});
