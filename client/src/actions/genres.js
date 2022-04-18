import * as api from '../api';

export const getGenres = () => async (dispatch) => {
    try {
        const { data } = await api.getGenres();
        dispatch({
            type: 'FETCH_GENRES',
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
};
