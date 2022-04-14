import React from 'react';
import { LinearProgress, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Film from './Film/Film'

const Films = () => {
    const films = useSelector((state)=> state.films);
    console.log("Films", films)

    return  (
        films.total_pages === 0 ? 
            <Typography variant="body2" align='center'>no results found</Typography> 
        : (
            !films.results.length ? 
                <LinearProgress thickness={5}/> 
            : (
                <Grid container
                    spacing={1.5}
                    columns={10}
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
