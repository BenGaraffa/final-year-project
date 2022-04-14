
const emptyFilters = {
    country: 'us',
    services: 'netflix',
    type: 'movie',
    order_by: 'imdb_vote_count',
    // genre: '',
    page: '1',
    output_language: 'en',
    language: '',
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
