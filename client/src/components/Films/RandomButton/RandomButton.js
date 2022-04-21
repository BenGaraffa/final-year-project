import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

const RandomButton = ({ total_pages }) => {
    const [range, setRange] = useState(25);

    const handleRange = (e) => {
        setRange(e.target.value);
    }

    const handleClick = () => {
        //Random number
        //Random Film
        console.log(range)
    }

    return (
        <Grid container>
            <Grid item width='75%'>
                <Button
                    variant='contained'
                    fullWidth
                    onClick={handleClick}
                >
                    Give me something to watch
                </Button>  
            </Grid>
            
            <Grid item width='25%'>
                <FormControl size="small" sx={{width:'100%'}}>
                    <InputLabel> Within: </InputLabel>
                    <Select
                        value={range}
                        label="Within:"
                        onChange={handleRange}
                        color='primary'
                    >
                        <MenuItem defaultChecked key={25} value={25}>
                            first 25 titles
                        </MenuItem>
                        <MenuItem key={50} value={50}>
                            first 50 titles
                        </MenuItem>
                        <MenuItem key={100} value={100}>
                            first 100 titles
                        </MenuItem>
                        <MenuItem key={total_pages} value={total_pages}>
                            all the titles
                        </MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};
export default RandomButton;
