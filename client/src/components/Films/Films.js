import React from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Film from './Film/Film'

const Films = () => {
    const films = useSelector((state)=> state.films);
    console.log("Films", films)

    return  (
        films.total_pages === 0 ? 
            <p>no results found</p> 
        : (
            !films.results.length ? <CircularProgress /> : (
                <Grid container
                    spacing={1.5}
                    columns={12}
                >
                    {films.results.map((film) => (
                        <Grid 
                            key={film.imdbID} 
                            item xs={2} xm={4} 
                        >
                            <Film film={film} />
                        </Grid>
                    ))}
                </Grid>
            )
        )
    );
}

export default Films;
