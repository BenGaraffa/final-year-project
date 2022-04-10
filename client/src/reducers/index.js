import { combineReducers } from 'redux';
import filmsReducer from './films'
import filtersReducer from './filters';

const rootReducer = combineReducers({
    films: filmsReducer, 
    filters: filtersReducer
});

export default rootReducer;
