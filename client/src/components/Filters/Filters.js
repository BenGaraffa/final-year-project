import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../actions/filters';

const Filters = () => {
    const filters = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    const [service, setService] = useState(filters.service)
    const [country, setCountry] = useState(filters.country)
    const [language, setLanguage] = useState(filters.language)
    const [outputLanguage, setOutputLanguage] = useState(filters.output_language)
    console.log(filters)
    
    const handleService = (e) => {
        setService(e.target.value)
        console.log(e)
        dispatch(setFilters("SET_SERVICE", e.target.value))
    }
    const handleCountry = (e) => {
        setCountry(e.target.value)
        console.log(e)
        dispatch(setFilters("SET_COUNTRY", e.target.value))
    }
    const handleLanguage = (e) => {
        setLanguage(e.target.value)
        console.log(e)
        dispatch(setFilters("SET_LANGUAGE", e.target.value))
    }
    const handleOutputLang = (e) => {
        setOutputLanguage(e.target.value)
        console.log(e)
        dispatch(setFilters("SET_OUTPUT_LANG", e.target.value))
    }
  
    return (
        <Stack spacing={1}>
            <Typography 
                variant="body1" color="initial"
            >Filters</Typography>

            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel> Platform</InputLabel>
                <Select
                    value={service}
                    label="Platform"
                    onChange={handleService}
                >
                    <MenuItem value={"netflix"}     >Netflix</MenuItem>
                    <MenuItem value={"prime"}       >Prime</MenuItem>
                    <MenuItem value={"disney"}      >Disney</MenuItem>
                    <MenuItem value={"hbo"}         >HBO</MenuItem>
                    <MenuItem value={"hulu"}        >Hulu</MenuItem>
                    <MenuItem value={"peacock"}     >Peacock</MenuItem>
                    <MenuItem value={"paramount"}   >Paramount</MenuItem>
                    <MenuItem value={"starz"}       >Starz</MenuItem>
                    <MenuItem value={"showtime"}    >Showtime</MenuItem>
                    <MenuItem value={"apple"}       >Apple</MenuItem>
                    <MenuItem value={"mubi"}        >Mubi</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel> Country </InputLabel>
                <Select
                    value={country}
                    label="country"
                    onChange={handleCountry}
                >
                    <MenuItem value={""}>
                        <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel> Langauge </InputLabel>
                <Select
                    value={language}
                    label="language"
                    onChange={handleLanguage}
                >
                    <MenuItem value={""}>
                        <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel> Output Language </InputLabel>
                <Select
                    value={outputLanguage}
                    label="outputLanguage"
                    onChange={handleOutputLang}
                >
                    <MenuItem value={""}>
                        <em>None</em>
                    </MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
}

export default Filters;
