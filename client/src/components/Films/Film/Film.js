import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const Film = ({ film }) => {

    return  (
        <Card sx={{paddingBottom: 0}}>
            <CardMedia
                component="img"
                height="200"
                image={film.posterURLs["185"]}
            />
            <CardContent sx={{p:0.5}}>
            <Typography 
                variant="caption" 
                component="div"
                align='center' 
            >
                {film.title}
            </Typography>
            </CardContent>
        </Card>
    )
}
export default Film;
