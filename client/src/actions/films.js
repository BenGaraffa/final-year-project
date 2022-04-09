import * as api from '../api';

export const getFilms = (parameters={}) => async (dispatch) => {
    try {
        const { data } = await api.getFilms(parameters);
        dispatch({
            type: 'FETCH_SEARCH',
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
};
