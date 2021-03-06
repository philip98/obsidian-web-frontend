import Ember from "ember";
export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		Ember.run.schedule("afterRender", () => {
			Ember.$(document).foundation();
			/*
			let width = $('.grid-sizer').width();
			$('.grid-item').each(function() {
				if ($(this).hasClass('grid-item--height2')) {
					$(this).height(2 * width);
				} else {
					$(this).height(width);
				}
			});*/
			let colors = [
				'CadetBlue', 'SteelBlue','DodgerBlue',
				'RoyalBlue', 'MediumBlue',
				'MidnightBlue', 'DarkCyan', 'Teal',
				'Indigo', 'DarkSlateBlue'
			];
			$('.grid-item').each(function() {
				$(this).find('.button').css('background-color',
					colors[Math.floor(Math.random() * colors.length)]);
			});
		});
	}
});
