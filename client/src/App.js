import React, { useEffect } from "react";
import { Container } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import Films from './components/Films/Films';
import SearchBar from './components/SearchBar/SearchBar'
import { getFilms } from './actions/films'
import { setFilters } from './actions/filters'

const App = () => { 

    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters)
    console.log("Filters:", filters)

    useEffect(() => {
        // replace with global filters
        dispatch(getFilms(filters));
    }, [dispatch, filters])

    return (
        <Container>
            <SearchBar onSubmit={(value) => {
                dispatch(setFilters('SET_KEYWORD', value))
                dispatch(getFilms(filters))
                }} />
            <Films />
        </Container>  
    );
}
export default App;
