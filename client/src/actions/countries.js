import * as api from '../api';

export const getCountries = () => async (dispatch) => {
    try {
        const { data } = await api.getCountries();
        dispatch({
            type: 'FETCH_COUNTRIES',
            payload: data
        });
    } catch (error) {
        console.log(error.message);
    }
};
