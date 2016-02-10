import Ember from 'ember';

export default Ember.Mixin.create({
    searchedData: Ember.computed('data', 'searchQuery', function() {
		if (this.get('searchQuery')) {
			return this.get('data').filter((item) => {
				return item.get(this.get('searchField')).toLowerCase()
                    .indexOf(this.get('searchQuery').toLowerCase()) > -1;
			});
		} else {
			return this.get('data');
		}
	}),
    sortedData: Ember.computed('searchedData', 'sorting', function() {
        if (this.get('sorting')[0] === '-') {
            return this.get('searchedData').sortBy(this.get('sorting').slice(1))
                .reverseObjects();
        } else {
            return this.get('searchedData').sortBy(this.get('sorting'));
        }
    }),
    actions: {
        changeSorting: function(sorting) {
            this.set('sorting', sorting);
        }
    }
});
