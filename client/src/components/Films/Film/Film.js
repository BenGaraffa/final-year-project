import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const Film = ({ film }) => {

    return  (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="250"
                image={film.posterURLs["185"]}
            />
            <CardContent>
            <Typography gutterBottom variant="body2" component="div">
                {film.title}
            </Typography>
            </CardContent>
        </Card>
    )
}
export default Film;
