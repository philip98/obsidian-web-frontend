export function initialize(container, application) {
	application.inject('route', 'auth', 'service:auth');
}

export default {
	name: 'auth',
	initialize: initialize
};
