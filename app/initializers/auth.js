import ENV from 'obsidian-web/config/environment';

export function initialize(container, application) {
	application.inject('controller', 'auth', 'service:auth');
	$.ajax({
		url: ENV.data_host,
		method: 'options'
	});
}

export default {
	name: 'auth',
	initialize: initialize
};
