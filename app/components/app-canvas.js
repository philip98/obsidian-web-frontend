import Ember from "ember";
export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		Ember.run.schedule("afterRender", () => {
			Ember.$(document).foundation();
		});
	}
});
