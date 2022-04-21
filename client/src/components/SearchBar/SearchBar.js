import React, { useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

const SearchBar = ({onSubmit}) => {
    const [state, setState] = useState('');
    
    const changeHandle = (e) => {
        setState(e.target.value);
    }
    
    const submit = () => {
        onSubmit(state)
    }

    // Check if Enter was pressed and update the state
    const keyPress = (e) => {
        if (e.key === "Enter") {
            submit()
        }
    }
    
    return  (
        <Stack direction='row' sx={{paddingBottom: 1}} >
            <TextField 
                id="search-bar" 
                label="Search" 
                variant="outlined" 
                size="small"
                fullWidth={true}
                onSubmit={(value) => {}} 

                // Update value on change
                value={state}
                // Submit the search on Enter
                onKeyDown={keyPress}
                onChange={changeHandle}
            />
            <Button 
                id='search-bar'
                variant="outlined"
                size='small'
                sx={{margin:0}}
                onClick={submit}
            ><SearchRoundedIcon /></Button>
        </Stack>
    )
}

export default SearchBar;
