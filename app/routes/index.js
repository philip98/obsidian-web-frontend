import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return Ember.RSVP.hash({
			backend: Ember.$.getJSON('https://api.github.com/repos/philip98/obsidian-web/commits?per_page=5')
				.then(this.prepareData),
			frontend: Ember.$.getJSON('https://api.github.com/repos/philip98/obsidian-web-frontend/commits?per_page=5')
				.then(this.prepareData)
		});
	},
	prepareData(data) {
		data.forEach((r) => {
			r.commit.author.date = (new Date(r.commit.author.date)).toLocaleString();
			r.sha = r.sha.substring(0, 6);
		});
		return data;
	}
});
