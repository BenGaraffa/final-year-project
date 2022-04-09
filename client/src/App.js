import React, { useEffect } from "react";
import { Container } from '@mui/material';
import { useDispatch } from "react-redux";

import Films from './components/Films/Films';
import SearchBar from './components/SearchBar/SearchBar'
import { getFilms } from './actions/films'

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFilms());
    }, [dispatch])
    
    return (
        <Container>
            <SearchBar onSubmit={() => {
                dispatch(getFilms())
                }} />
            <Films />
        </Container>  
    );
}
export default App;
