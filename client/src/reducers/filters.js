
const emptyFilters = {
    country: 'us',
    services: 'netflix',
    type: 'movie',
    
    year_min: '1950',
    year_max: new Date().getFullYear(),
    
    page: {
		range: [1, 2],
		startIndex: 0,
		endIndex: 25,
		size: 25,
		direction: 0
	},

    desc: 'true',
    order_by: 'imdb_rating',

    genres: '',  
    genres_relation: 'or',

    min_imdb_rating: '0',
    max_imdb_rating: '100',
    min_imdb_vote_count: '0',
    max_imdb_vote_count: '3000000',

    language: '',
    output_language: 'en',
    keyword: ''
};

const filtersReducer = (filters = emptyFilters, action) => {
    switch (action.type) {
        case "SET_COUNTRY":
            filters['country'] = action.payload;
            return filters

        case "SET_SERVICE":
            filters['services'] = action.payload;
            return filters

        case "SET_TYPE":
            filters['type'] = action.payload;
            return filters

        case "SET_ORDER_BY":
            filters['order_by'] = action.payload;
            return filters

        case "SET_DESC":
            filters['desc'] = action.payload;
            return filters

        case "SET_GENRE":
            filters['genre'] = action.payload;
            return filters

        case "SET_PAGE":
            filters['page'] = action.payload;
            return filters

        case "SET_OUTPUT_LANG":
            filters['output_language'] = action.payload;
            return filters

        case "SET_LANG":
            filters['language'] = action.payload;
            return filters
            
        case "SET_KEYWORD":
            filters['keyword'] = action.payload['value'];
            return filters

        default:
            return filters;
    }
};

export default filtersReducer;
