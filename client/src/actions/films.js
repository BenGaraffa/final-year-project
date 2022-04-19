import * as api from '../api';
import { setFilters } from './filters';

export const getFilms = (parameters={}) => async (dispatch) => {
    try {
        const { data } = await api.getFilms(parameters);
        let { results, total_pages, page } = data;
        dispatch(setFilters("SET_PAGE", page));
        dispatch({
            type: 'FETCH_SEARCH',
            payload: {results, total_pages},
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const setFilmsEmpty = () => (dispatch) => {
    dispatch({
        type: 'EMPTY_CONTENTS'
    })
}
