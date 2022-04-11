export const setFilters = (actionType, value) => (dispatch) => {
        return dispatch({ type: actionType, payload: value });
};
