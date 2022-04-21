import React, { useState } from 'react';
import { ButtonBase, Card, CardMedia, Dialog, DialogContent, DialogTitle, 
    Slide, Typography, Grid, DialogContentText, CardContent, Button, DialogActions} from '@mui/material'

// Transition animation used
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" unmountOnExit ref={ref} {...props} />;
});

const Film = ({ film }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return  (
        <>
        <Card>
            <ButtonBase 
                sx={{width:'100%', height:'100%'}}
                onClick={handleClick}
            >
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
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            PaperProps={{
                sx: {
                  width: "60%",
                  minHeight: 'auto',
                  maxHeight: '60%'
                }
              }}
        >
            <DialogTitle>{film.title}</DialogTitle>
            <DialogContent>
                <Grid 
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs='25%'>
                        <Card >
                            <CardMedia 
                                image={film.posterURLs["185"]} 
                                component='img'
                            />
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <DialogContentText >
                            {film.overview}
                        </DialogContentText>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    {Object.keys(film.streamingInfo).map((service) => (
                        <Grid item key={service}>
                            <Button 
                                variant="contained" 
                                size="large"
                                target='_blank'
                                href={Object.values(film.streamingInfo[service])[0].link}
                            >
                                {service}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </DialogActions>
        </Dialog>
        </>
    );
}
export default Film;
