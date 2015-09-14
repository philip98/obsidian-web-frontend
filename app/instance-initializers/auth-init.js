export function initialize(application) {
	application.container.lookup('service:auth').init();
}

export default {
	name: 'auth-init',
	initialize: initialize
};