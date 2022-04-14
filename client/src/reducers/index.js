import { combineReducers } from 'redux';
import countriesReducer from './countries';
import filmsReducer from './films'
import filtersReducer from './filters';

const rootReducer = combineReducers({
    films: filmsReducer, 
    filters: filtersReducer, 
    countries: countriesReducer
});

export default rootReducer;
