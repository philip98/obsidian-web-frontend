import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.findRecord('school', this.get('auth.currentSchoolId')).catch(() => {
            if (!this.get('auth.isAuthenticated')) {
                this.get('flashMessages').warn('Sie müssen sich erst einloggen');
                return this.transitionTo('login');
            }
        });
    }
});
