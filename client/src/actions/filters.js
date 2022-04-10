export const setFilters = (actionType, value) => async (dispatch) => {
        dispatch({ type: actionType, payload: value });
};
