const filmsReducer = (films = {results: []}, action) => {
    switch (action.type) {
        case "FETCH_SEARCH":
            return action.payload;
        default:
            return films;
    }
};

export default filmsReducer;
