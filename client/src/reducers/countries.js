const countriesReducer = (countries = {}, action) => {
    switch (action.type) {
        case "FETCH_COUNTRIES":
            return action.payload;
        default:
            return countries;
    }
};

export default countriesReducer;
