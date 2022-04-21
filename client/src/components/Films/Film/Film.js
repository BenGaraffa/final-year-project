import React from 'react';
import { ButtonBase, Card, CardMedia, Typography } from '@mui/material'

const Film = ({ film }) => {

    return  (
        <Card>
            <ButtonBase sx={{width:'100%', height:'100%'}}>
                <CardMedia
                    component="img"
                    height="200"
                    image={film.posterURLs["185"]}
                />
            </ButtonBase>
            <Typography 
                variant="caption" 
                component="div"
                align='center' 
                padding={1}
            >
                {film.title}
            </Typography>
        </Card>
    )
}
export default Film;
