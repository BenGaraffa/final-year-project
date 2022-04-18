const genresReducer = (genres = {}, action) => {
    switch (action.type) {
        case "FETCH_GENRES":
            return action.payload;
        default:
            return genres;
    }
};

export default genresReducer;
