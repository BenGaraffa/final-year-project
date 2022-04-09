import { combineReducers } from 'redux';
import filmsReducer from './films'

const rootReducer = combineReducers({
    films: filmsReducer, 
});

export default rootReducer;
