import React, { useEffect } from "react";
import { Grid, Paper } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import Films from './components/Films/Films';
import SearchBar from './components/SearchBar/SearchBar'
import Filters from './components/Filters/Filters'
import { getFilms } from './actions/films'
import { setFilters } from './actions/filters'

const App = () => { 

    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filters)

    useEffect(() => {
        // replace with global filters
        dispatch(getFilms(filters));
    }, [dispatch, filters])

    return (
        <Grid container spacing={0.5} direction="row" m={1}>
            <Grid item xs='auto' p={2}>
                <Paper sx={{p:1}} elevation={5}>
                    <Filters />
                </Paper>
            </Grid>

            <Grid item md={7}>
                <Paper sx={{p:1}} elevation={5}>
                    <SearchBar onSubmit={(value) => {
                        dispatch(setFilters('SET_KEYWORD', value))
                        dispatch(getFilms(filters))
                        }}  sx={{margin: 1}} />
                    <Films  sx={{mmargin: 1}} />
                </Paper>
            </Grid>
        </Grid>
    );
}
export default App;
