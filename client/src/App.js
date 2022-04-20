import React, { useEffect } from "react";
import { Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import Films from './components/Films/Films';
import SearchBar from './components/SearchBar/SearchBar';
import Filters from './components/Filters/Filters';
import { getFilms, setFilmsEmpty } from './actions/films';
import { getCountries } from './actions/countries';
import { getGenres } from './actions/genres';
import { setFilters } from './actions/filters';

const App = () => { 

    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters);

    useEffect(() => {
        dispatch(getFilms(filters));
        dispatch(getCountries());
        dispatch(getGenres());
    }, [dispatch, filters])

    const countries = useSelector((state) => state.countries);
    const genres = useSelector((state) => state.genres);

    return (
        <Grid container spacing={0.5} direction="row" m={1}>
            <Grid item xs='auto' p={2}>
                <Paper sx={{p:1}} elevation={5}>
                    <Filters countries={countries} genreList={genres}/>
                </Paper>
            </Grid>

            <Grid item md={7}>
                <Paper sx={{p:1}} elevation={5}>
                    <SearchBar
                        onSubmit={(value) => {
                            dispatch(setFilters('SET_KEYWORD', value))
                            dispatch(setFilmsEmpty())
                            dispatch(getFilms(filters))
                        }} 
                    />
                    <Films />
                </Paper>
            </Grid>
        </Grid>
    );
}
export default App;
