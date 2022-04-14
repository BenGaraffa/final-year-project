const filmsReducer = (films = {results: []}, action) => {
    switch (action.type) {
        case "FETCH_SEARCH":
            return action.payload;
        case "EMPTY_CONTENTS":
            return {results: []};
        default:
            return films;
    }
};

export default filmsReducer;
