
import * as React from 'react';
import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export const BodyModal = () => {

    const [data, setData] = useState([
        {
            id: 0,
            date: '02/05/2022',
            hour: '15:03',
            asunto: 'Solictud',
            name: 'Andres',
            mensaje: "Lorem Ipsum",
            url: ''
        },
        {
            id: 1,
            asunto: 'Mensaje',
            date: '03/05/2022',
            hour: '16:23',
            name: 'Vivian',
            mensaje: "Lorem Ipsum",
            url: ''
        },
        {
            id: 2,
            asunto: 'Mensaje',
            date: '04/05/2022',
            hour: '20:03',
            name: 'Tailandia',
            mensaje: "Lorem Ipsum",
            url: ''
        },
    ]);

    return (

        <>
            <Typography variant="h5">Notificaciones</Typography>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {
                    data?.map((e) => {

                        return (
                            <>
                                <Typography variant="subtitle1">{e.date}</Typography>
                                <Button variant="text" sx={{ width: '100%' }}>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                                        <Grid item >
                                            <ListItem alignItems="flex-start" >
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={e.asunto}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {e.name}
                                                            </Typography>
                                                            <Typography variant="body2" gutterBottom>
                                                                {e.mensaje}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={1} sx={{ color: 'black' }} justifyContent="flex-end">
                                            {e.hour}
                                        </Grid>

                                    </Grid>

                                    <Divider variant="inset" component="li" />
                                </Button>
                            </>
                        );

                    })
                }


            </List>
        </>

    );
}