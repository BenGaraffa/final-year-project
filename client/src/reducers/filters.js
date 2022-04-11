
const emptyFilters = {
    country: 'us',
    service: 'netflix',
    type: 'movie',

    // genre: '',
    page: '1',
    output_language: 'en',
    language: 'en',
    keyword: ''
};

const filtersReducer = (filters = emptyFilters, action) => {
    switch (action.type) {
        case "SET_COUNTRY":
            filters['country'] = action.payload;
            return filters

        case "SET_SERVICE":
            filters['service'] = action.payload;
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
