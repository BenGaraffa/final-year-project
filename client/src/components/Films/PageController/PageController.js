import { Button, Stack, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, setFilmsEmpty } from '../../../actions/films';
import { setFilters } from '../../../actions/filters';
import clone from 'just-clone'

const PageController = ({ films }) => {
    const filters = useSelector((state) => state.filters);
    const { page } = filters;
    const dispatch = useDispatch();
    
    const handleNext = () => {
        let newPage = clone(page)
        newPage.direction = 1

        dispatch(setFilters("SET_PAGE", newPage))
        dispatch(setFilmsEmpty())
        dispatch(getFilms(filters))
    }
    const handlePrev = () => {
        let newPage = clone(page)
        newPage.direction = -1
        
        dispatch(setFilters("SET_PAGE", newPage))
        dispatch(setFilmsEmpty())
        dispatch(getFilms(filters))
    }

    return (
        <Stack 
            direction="row"
            alignItems="center"
            justifyContent="space-between"
        >
            <Button disabled={page.range[0] === 1} onClick={handlePrev}>
                PREV
            </Button>
            <Typography variant="subtitle2">
                pages {page.range[0]} of {Math.floor(films.total_pages/(page.range[1]-page.range[0]))}
            </Typography>
            <Button 
                disabled={page.range[1] === films.total_pages + 1}
                onClick={handleNext}
            >
                NEXT
            </Button>
        </Stack>
    )
};
export default PageController;
