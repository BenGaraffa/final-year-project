import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Film from './Film/Film'

const Films = () => {
    const films = useSelector((state)=> state.films);
    console.log("Films", films)

    return  (
        !films.total_pages ? <p>no results found</p> : (
        !films.results.length ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={2} >
                {films.results.map((film) => (
                    <Grid key={film.imdbID} item xs={2} xm={4} >
                        <Film film={film} />
                    </Grid>
                ))}
            </Grid>
        ))
    );
}

export default Films;