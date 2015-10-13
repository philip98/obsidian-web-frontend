export default {
	name: 'auth',
	initialize(app) {
		app.inject('controller', 'auth', 'service:auth');
		app.inject('route', 'auth', 'service:auth');
	}
};
