import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        didTransition() {
            Ember.run.scheduleOnce('afterRender', this, function() {
                let width = $('.grid-sizer').width();
    			$('.grid-item').each(function() {
    				if ($(this).hasClass('grid-item--height2')) {
    					$(this).height(2 * width);
    				} else {
    					$(this).height(width);
    				}
    			});
    			Ember.$('.grid').masonry({
    				itemSelector: '.grid-item',
    				percentPosition: true,
    				columnWidth: '.grid-sizer'
    			});
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
    }
});
