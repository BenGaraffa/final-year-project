import { combineReducers } from 'redux';
import countriesReducer from './countries';
import filmsReducer from './films'
import filtersReducer from './filters';
import genresReducer from './genres';

const rootReducer = combineReducers({
    films: filmsReducer, 
    filters: filtersReducer, 
    countries: countriesReducer,
    genres: genresReducer
});

export default rootReducer;
