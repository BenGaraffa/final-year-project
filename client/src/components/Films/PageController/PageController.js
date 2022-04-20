import { Stack, Pagination, Container } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, setFilmsEmpty } from '../../../actions/films';
import { setFilters } from '../../../actions/filters';
import clone from 'just-clone'
import { Box } from '@mui/system';

const PageController = ({ films }) => {
    const filters = useSelector((state) => state.filters);
    const { page } = filters;
    const dispatch = useDispatch();
    const pageSpan = page.range[1] - page.range[0]

    const [pagination, setPagination] = useState(page.range[0]);
    
    const handleChange = (event, value) => {
        setPagination(value)
        let newPage = clone(page)
        newPage.range = [value, value + pageSpan]

        dispatch(setFilters("SET_PAGE", newPage))
        dispatch(setFilmsEmpty())
        dispatch(getFilms(filters))
    }

    return (
        <Box
            display='flex'
            justifyContent='center'
        >
            <Pagination 
                count={Math.floor(films.total_pages/(page.range[1]-page.range[0]))} 
                page={pagination} 
                onChange={handleChange} 
                sx={{paddingBottom:1, paddingTop:1}}
            />
        </Box>
    )
};
export default PageController;
