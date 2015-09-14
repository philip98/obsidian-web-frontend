import Ember from 'ember';

export default Ember.Service.extend({
	setData(school, token, id) {
		window.sessionStorage.secretToken = token;
		window.sessionStorage.currentSchoolId = school;
		window.sessionStorage.secretId = id;
	},
	secretToken() {
		if (window.sessionStorage.secretToken) {
			return window.sessionStorage.secretToken;
		} else {
			return '';
		}
	},
	secretId() {
		if (window.sessionStorage.secretId) {
			return window.sessionStorage.secretId;
		} else {
			return '';
		}
	},
	currentSchoolId() {
		if (window.sessionStorage.currentSchoolId) {
			return window.sessionStorage.currentSchoolId;
		} else {
			return '';
		}
	},
	isAuthenticated() {
		return (this.currentSchoolId() && this.secretId() && this.secretToken());
	},
	authenticate(name, password) {
		return Ember.$.ajax({
			type: 'POST',
			url:'/schools/sign_in', 
			dataType: 'json',
			contentType: 'application/json',
			data: {
				name: name,
				password: password
			}
		}).then((response) => {
			this.setData(response.school_id, response.token, response.secret_id);
			return true;
		}, () => {
			return false;
		});
	},
	invalidate() {
		return Ember.$.ajax({
			type: 'DELETE',
			url: '/schools/sign_out',
			headers: {
				Authorization: 'Token token="' + this.secretToken() + '", secret_id="' + 
					this.secretId() + '"'
			}
		}).then(() => {
			this.setData('', '', '');
			return true;
		}, () => {
			return false;
		});
	},
	init() {
		Ember.$.ajaxPrefilter((options, originalOptions, jqXHR) => {
			if (this.isAuthenticated()) {
				jqXHR.setRequestHeader('Authorization', 'Token token="' + this.secretToken() + 
					'", secret_id="' + this.secretId() + '"');
			}
		});
	}
});
