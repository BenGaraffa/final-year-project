import * as api from '../api';

export const getFilms = () => async (dispatch) => {
    try {
        const { data } = await api.getFilms();
        dispatch({
            type: 'FETCH_SEARCH',
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
};
