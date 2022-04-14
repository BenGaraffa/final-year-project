import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormControl, InputLabel, Select, MenuItem, Typography, Stack, 
    TextField, Checkbox, Autocomplete, CircularProgress } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { setFilters } from '../../actions/filters';
import ISO6391 from 'iso-639-1';
import CountryLookup from 'country-code-lookup';

const Filters = ({ countries }) => {
    const filters = useSelector((state) => state.filters);
    const languageCodes = ISO6391.getAllCodes()
    const dispatch = useDispatch();

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    // React states for the components
    const [services, setServices] = useState(['netflix']);
    const [country, setCountry] = useState(filters.country);
    const [orderBy, setOrderBy] = useState(filters.order_by);
    const [language, setLanguage] = useState(filters.language);
    
    // Change handling functions for the components
    const handleServices = (e, value) => {
        if (value.length === 0) {
            setServices(['netflix']);
            dispatch(setFilters("SET_SERVICE", "netflix"));
            handleCountry({target: {value: "us"}});
        } else {
            setServices(value);
            dispatch(setFilters("SET_SERVICE", value.join(',')));
            handleCountry({target: {value: countries[value[0]][0]}});
        }
    };
    const handleCountry = (e) => {
        setCountry(e.target.value);
        dispatch(setFilters("SET_COUNTRY", e.target.value));
    }
    const handleOrderBy = (e) => {
        setOrderBy(e.target.value);
        dispatch(setFilters("SET_ORDER_BY", e.target.value));
    }
    const handleLanguage = (e) => {
        setLanguage(e.target.value);
        dispatch(setFilters("SET_LANG", e.target.value));
    }
  
    return (
        <Stack spacing={1} sx={{maxWidth: 300}}>
            <Typography 
                variant="body1" color="initial"
            >Filters</Typography>
            
            {/* If data hasn't been loaded yet */}
            {countries[services[0]] === undefined ? 
                <CircularProgress/> 
            : 
            <>

            {/* Platform Component */}
            <Autocomplete
                multiple
                value={services}
                size='small'
                options={Object.keys(countries)}
                disableCloseOnSelect
                getOptionLabel={option => option}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                        />
                            {option}
                    </li>
                )}
                onChange={handleServices}

                renderInput={(params) => (
                    <TextField {...params} 
                        label="Platforms" 
                        size='small'
                    />
                )}
            />

            {/* Country component */}
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel> Country </InputLabel>
                <Select
                    value={country}
                    label="country"
                    onChange={handleCountry}
                >

                    {countries[services[0]].map((country) => (
                        <MenuItem key={country} value={country}>
                            ({country}) {CountryLookup.byIso(country)['country']}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel> Order by </InputLabel>
                <Select
                    value={orderBy}
                    label="Order by"
                    onChange={handleOrderBy}
                >
                    <MenuItem key="title" value="original_title">
                        Title
                    </MenuItem>
                    <MenuItem key="year" value="year">
                        Year
                    </MenuItem>
                    <MenuItem key="imdbVoteCount" value="imdb_vote_count">
                        IMDB Vote Count
                    </MenuItem>
                    <MenuItem key="imdbRating" value="imdb_rating">
                        IMDB Rating
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel> Original Langauge </InputLabel>
                <Select
                    value={language}
                    label="Original Langauge"
                    onChange={handleLanguage}
                >
                    <MenuItem key="None" value="">
                        <em>None</em>
                    </MenuItem>
                    {languageCodes.map((code) => (
                        <MenuItem key={code} value={code}>
                            ({code}) {ISO6391.getName(code)}
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
            </>}
        </Stack>
    );
}

export default Filters;
