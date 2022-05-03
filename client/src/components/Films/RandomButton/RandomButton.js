import { Button, FormControl, Grid, InputLabel, MenuItem, Select,
    Card, CardMedia, Dialog, DialogContent, DialogTitle, Slide,
    DialogContentText, DialogActions, LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { getRandomFilm } from '../../../api'
import { useSelector } from 'react-redux';
import clone from 'just-clone';
import { posterSelection, Transition } from '../Film/Film';

// Random int range function
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const RandomButton = ({ total_pages }) => {
    const [range, setRange] = useState(25);
    const [open, setOpen] = useState(false);
    const filters = useSelector(state => state.filters);
    const films = useSelector(state => state.films);
    const [film, setFilm] = useState(
        films.results[getRandomInt(0, films.results.length-1)]);    

    const handleRange = (e) => {
        setRange(e.target.value);
    }

    const handleClick = async () => {
        if (range === 25) {
            // Get a random film from the page already loaded
            setFilm(films.results[getRandomInt(0, films.results.length-1)])
            // Select the right poster size
            setOpen(true);
        } else { //Load random film from requested range
            
            setFilm(undefined) // Ensures dialog goes to load while awaiting film
            setOpen(true)
            let tempFilters = clone(filters);
            let randIndex = getRandomInt(
                1, 
                // Ensures random page doesn't fall out of range
                total_pages < (range/25) ? total_pages: range/25 
            ); 
            tempFilters['page'] = randIndex
            setFilm( await getRandomFilm(tempFilters));
            console.log("RandomFilm", film)
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Grid container>
            <Grid item width='75%'>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={handleClick}
                >
                    Find me something to watch
                </Button>  
            </Grid>
            
            <Grid item width='25%'>
                <FormControl size="small" sx={{width:'100%'}}>
                    <InputLabel> Within the: </InputLabel>
                    <Select
                        value={range}
                        label="Within the:"
                        onChange={handleRange}
                        color='primary'
                    >
                        <MenuItem defaultChecked key={25} value={25}>
                            current page
                        </MenuItem>
                        <MenuItem key={50} value={50}>
                            first 50 titles
                        </MenuItem>
                        <MenuItem key={100} value={100}>
                            first 100 titles
                        </MenuItem>
                        <MenuItem key={250} value={250}>
                            first 250 titles
                        </MenuItem>
                        <MenuItem key={500} value={500}>
                            first 500 titles
                        </MenuItem>
                        <MenuItem key={total_pages} value={total_pages}>
                            all the titles
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            PaperProps={{
                sx: {
                  width: "60%",
                  minHeight: 'auto',
                  maxHeight: '60%'
                }
              }}
        >
            {film === undefined || film.posterURLs === undefined? 
                <LinearProgress /> :
            <>
            <DialogTitle>{film.title}</DialogTitle>
            <DialogContent>
                <Grid 
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs='25%'>
                        <Card >
                            <CardMedia 
                                image={posterSelection(film.posterURLs)} 
                                component='img'
                            />
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <DialogContentText >
                            {film.overview}
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    {Object.keys(film.streamingInfo).map((service) => (
                        <Grid item key={service}>
                            <Button 
                                variant="contained" 
                                size="large"
                                target='_blank'
                                href={Object.values(film.streamingInfo[service])[0].link}
                            >
                                {service}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </DialogActions>
            </>}
        </Dialog>
        </>
    );
};
export default RandomButton;
