export function initialize(container, application) {
	application.inject('controller', 'auth', 'service:auth');
}

export default {
	name: 'auth',
	initialize: initialize
};
