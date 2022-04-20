import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FormControl, InputLabel, Select, MenuItem, 
    Typography, Stack, TextField, Checkbox, Autocomplete, 
    CircularProgress, RadioGroup, FormControlLabel, Radio, Slider, FormLabel } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { setFilters } from '../../actions/filters';
import ISO6391 from 'iso-639-1';
import CountryLookup from 'country-code-lookup';

const Filters = ({ countries, genreList }) => {
    const filters = useSelector((state) => state.filters);
    const languageCodes = ISO6391.getAllCodes()
    const dispatch = useDispatch();

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const minSliderDistance = 1;

    // React states for the components
    const [services, setServices] = useState(['netflix']);
    const [type, setType] = useState(filters.type);
    const [country, setCountry] = useState(filters.country);
    const [orderBy, setOrderBy] = useState(filters.order_by);
    const [descending, setDescending] = useState(filters.desc);
    const [genres, setGenres] = useState([]);
    const [genreRelation, setGenreRelation] = useState('or');
    const [language, setLanguage] = useState(filters.language);
    const [ratingSlider, setRatingSlider] = React.useState([
        parseInt(filters.min_imdb_rating),
        parseInt(filters.max_imdb_rating)
    ]);
    const [yearSlider, setYearSlider] = React.useState([
        parseInt(filters.year_min),
        parseInt(filters.year_max)
    ]);
    
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
    const handleType = (e) => {
        setType(e.target.value);
        dispatch(setFilters("SET_TYPE", e.target.value));
    };
    const handleCountry = (e) => {
        setCountry(e.target.value);
        dispatch(setFilters("SET_COUNTRY", e.target.value));
    };
    const handleOrderBy = (e) => {
        setOrderBy(e.target.value);
        dispatch(setFilters("SET_ORDER_BY", e.target.value));
    };
    const handleDescending = (e) => {
        setDescending(e.target.value);
        dispatch(setFilters("SET_DESC", e.target.value));
    };
    const handleGenres = (e, value) => {
        if (value.length === 0) {
            setGenres([]);
            dispatch(setFilters("SET_GENRE", ''));
        } else {
            setGenres(value);
            dispatch(setFilters("SET_GENRE", value.join(',')));
        }
    };
    const handleGenreRelation = (e) => {
        setGenreRelation(e.target.value);
        dispatch(setFilters("SET_GENRE_RELATION", e.target.value));
    };
    const handleLanguage = (e) => {
        setLanguage(e.target.value);
        dispatch(setFilters("SET_LANG", e.target.value));
    };
    const handleRatingSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setRatingSlider(
                [Math.min(newValue[0], ratingSlider[1] - minSliderDistance), 
                ratingSlider[1]]
            );
        } else {
            setRatingSlider(
                [ratingSlider[0], Math.max(newValue[1], 
                ratingSlider[0] + minSliderDistance)]
            );
        }
        dispatch(setFilters("SET_MIN_RATING", ratingSlider[0].toString()))
        dispatch(setFilters("SET_MAX_RATING", ratingSlider[1].toString()))
    };
    const handleYearSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setYearSlider(
                [Math.min(newValue[0], yearSlider[1] - minSliderDistance), 
                yearSlider[1]]
            );
        } else {
            setYearSlider(
                [yearSlider[0], Math.max(newValue[1], 
                yearSlider[0] + minSliderDistance)]
            );
        }
        dispatch(setFilters("SET_YEAR_MIN", yearSlider[0].toString()))
        dispatch(setFilters("SET_YEAR_MAX", yearSlider[1].toString()))
    };
  
    return (
        <Stack spacing={1} sx={{maxWidth: 300, minWidth:300 }}>
            <Typography 
                variant="body1" color="initial"
            >Filters</Typography>
            
            {/* If data hasn't been loaded yet */}
            {countries[services[0]] === undefined 
             || genreList === undefined? 
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

            {/* Type component */}
            <FormControl sx={{paddingLeft:1, paddingRight:1}}>
                <RadioGroup
                    row
                    value={type}
                    onChange={handleType}
                >
                    <FormControlLabel 
                        value="Movie"
                        control={<Radio 
                            value='movie'
                            sx={{
                                '& .MuiSvgIcon-root':{
                                    fontSize:18,
                            }}} />}  
                        label="Movie" 
                    />
                    <FormControlLabel 
                        value="TV Show"
                        control={<Radio 
                            value='series'
                            sx={{
                                '& .MuiSvgIcon-root':{
                                    fontSize:18,
                            }}} />} 
                        label="TV Show" 
                    />
                </RadioGroup>
            </FormControl>

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

            {/* OrderBy Component */}
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

            {/* Descending Order Component */}
            <FormControl sx={{paddingLeft:1, paddingRight:1}}>
                <RadioGroup
                    row
                    value={descending}
                    onChange={handleDescending}
                >
                    <FormControlLabel 
                        value="Descending"
                        control={<Radio 
                            value={true}
                            sx={{
                                '& .MuiSvgIcon-root':{
                                    fontSize:18,
                            }}} />}  
                        label="Descending" 
                    />
                    <FormControlLabel 
                        value="Ascending"
                        control={<Radio 
                            value={false}
                            sx={{
                                '& .MuiSvgIcon-root':{
                                    fontSize:18,
                            }}} />} 
                        label="Ascending" 
                    />
                </RadioGroup>
            </FormControl>

            {/* Genre Component */}
            <Autocomplete
                multiple
                value={genres}
                size='small'
                options={Object.keys(genreList)}
                disableCloseOnSelect
                getOptionLabel={option => genreList[option]}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            checked={selected}
                            label={genreList[option]}
                        />
                            {genreList[option]}
                    </li>
                )}
                onChange={handleGenres}

                renderInput={(params) => (
                    <TextField {...params} 
                        label="Genres" 
                        size='small'
                    />
                )}
            />

            {/* Genre Relation Component */}
            <FormControl sx={{paddingLeft:1, paddingRight:1}}>
                <RadioGroup
                    row
                    value={genreRelation}
                    onChange={handleGenreRelation}
                >
                    <FormControlLabel 
                        value="Inclusive"
                        control={<Radio 
                            value='or'
                            sx={{
                                '& .MuiSvgIcon-root':{
                                    fontSize:18,
                            }}} />}  
                        label="Inclusive" 
                    />
                    <FormControlLabel 
                        value="Exclusive"
                        control={<Radio 
                            value='and'
                            sx={{
                                '& .MuiSvgIcon-root':{
                                    fontSize:18,
                            }}} />} 
                        label="Exclusive" 
                    />
                </RadioGroup>
            </FormControl>

            {/* Year Range */}
            <FormControl  sx={{paddingLeft:2, paddingRight:2}}>
                <FormLabel>Year Range</FormLabel>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={yearSlider}
                    onChange={handleYearSlider}
                    valueLabelDisplay="auto"
                    getAriaValueText={value => value}
                    size='small'
                    disableSwap

                    min={1950}
                    max={new Date().getFullYear()}
                    marks={[
                        {
                            value: parseInt(filters.year_min),
                            label: filters.year_min
                        },
                        {
                            value: parseInt(filters.year_max),
                            label: filters.year_max
                        }
                    ]}
                   
                />
            </FormControl>

            {/* IMDB Rating Slider Component */}
            <FormControl  sx={{paddingLeft:2, paddingRight:2}}>
                <FormLabel>Imdb Rating Range</FormLabel>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    value={ratingSlider}
                    onChange={handleRatingSlider}
                    valueLabelDisplay="auto"
                    getAriaValueText={value => value}
                    size='small'
                    disableSwap
                    marks={[
                        {
                            value: parseInt(filters.min_imdb_rating),
                            label: filters.min_imdb_rating
                        },
                        {
                            value: parseInt(filters.max_imdb_rating),
                            label: filters.max_imdb_rating
                        }
                    ]}
                   
                />
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
