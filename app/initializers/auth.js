export default {
	name: 'auth',
	initialize(container, app) {
		app.inject('controller', 'auth', 'service:auth');
		app.inject('route', 'auth', 'service:auth');
	}
};
