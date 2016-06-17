import Ember from 'ember';
import OrderSearch from 'obsidian-web/mixins/order-search';

export default Ember.Controller.extend(OrderSearch, {
	init() {
		this._super(...arguments);
		this.searchQuery = '';
		this.searchField = 'title';
		this.sorting = 'title';
	},
	data: Ember.computed.reads('model'),
	fileSaver: Ember.inject.service('file-saver'),
	actions: {
		reload() {
			this.get('model').update();
		},
		exportAliases() {
			Ember.RSVP.all(this.get('model').map((book) => {
				return book.get('aliases').then((aliases) => {
					return aliases.map((alias) => {
						return '  ' + alias.get('name');
					});
				}).then((lines) => {
					let line = lines.join('');
					if (line.length > 0) {
						line = book.get('title') + ': ' + line + '\n';
					}
					return line;
				});
			})).then((lines) => {
				this.get('fileSaver').save(lines.join(''), 'text/plain', 'aliasse.txt');
			});
		}
	}
});
