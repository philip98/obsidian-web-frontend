import ENV from 'obsidian-web/config/environment';

export function initialize(container, application) {
	application.inject('controller', 'auth', 'service:auth');
	$.get(ENV.data_host + '/schools').fail();
}

export default {
	name: 'auth',
	initialize: initialize
};
