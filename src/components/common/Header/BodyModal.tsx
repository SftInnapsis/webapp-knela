
import * as React from 'react';
import { useState, useEffect } from "react";
import { Card, CardActionArea } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Circle } from './Circle';
import './bodyModal.css';


export const BodyModal = () => {

    const [colorBg, setColorBg] = useState('#fff');

    /*const [color, setColor] = useState('#fff');
    const CambiarColor = () => { setColor('red') }*/

    //console.log("cambiocolor", CambiarColor)

    const [data, setData] = useState([
        {
            id: 0,
            state: false,
            date: '02/05/2022',
            hour: '15:03pm',
            asunto: 'Solictud',
            name: 'Andres',
            mensaje: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            url: ''
        },
        {
            id: 1,
            state: false,
            asunto: 'Mensaje',
            date: '03/05/2022',
            hour: '16:23pm',
            name: 'Vivian',
            mensaje: "Lorem Ipsum",
            url: ''
        },
        {
            id: 2,
            state: false,
            asunto: 'Mensaje',
            date: '04/05/2022',
            hour: '20:03pm',
            name: 'Tailandia',
            mensaje: "Lorem Ipsum",
            url: ''
        },
        {
            id: 3,
            state: false,
            asunto: 'Mensaje',
            date: '04/05/2022',
            hour: '20:03pm',
            name: 'Tailandia',
            mensaje: "Lorem Ipsum",
            url: ''
        },
        {
            id: 4,
            state: false,
            asunto: 'Mensaje',
            date: '04/05/2022',
            hour: '20:03pm',
            name: 'Tailandia',
            mensaje: "Lorem Ipsum",
            url: ''
        },
        {
            id: 5,
            state: false,
            asunto: 'Mensaje',
            date: '04/05/2022',
            hour: '20:03pm',
            name: 'Tailandia',
            mensaje: "Lorem Ips",
            url: ''
        },
    ]);

    const changeState = ({ id }) => {
        setData(data.map(item => {
            if (item.id === id) {
                return { ...item, state: true }
            } else {
                return item
            }
        }))
    }


    return (
        <div className='parent' >


            <Typography variant="h5">Notificaciones</Typography>

            {
                data?.map((e) => {

                    return (

                        <>

                            <Grid item xs={12} >

                                <Card
                                    //key={e.id}
                                    sx={{
                                        width: "100%",
                                        background: e.state === false ? '#D8EBD7' : 'white',
                                        borderRadius: "10px",
                                        height: '125px'
                                    }}
                                    onClick={() => changeState(e)}
                                >

                                    <CardActionArea sx={{ height: '120px' }}>

                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{
                                                pt: 2,
                                                pr: 2,
                                                pl: 2
                                            }}>

                                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: "#28c4ac" }}>{e.asunto}</Typography>
                                            <Typography variant='body1'>{e.hour + ' ' + e.date}</Typography>

                                        </Grid>

                                        <Grid container
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                            className='container-mensaje'
                                            sx={{
                                                pt: 1,
                                                pr: 2,
                                                pl: 2
                                            }}>
                                            <Typography className='mensaje' variant='subtitle1' sx={{ lineHeight: '1'}}> {e.name + ' - ' + e.mensaje} </Typography>
                                        </Grid>

                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-end"
                                            alignItems="flex-end"
                                        >
                                            <Typography sx={{pt:2 ,pr: 2, pb: 2 }}>
                                                {
                                                    e.state === false ? <Circle /> : ''
                                                }
                                            </Typography>

                                        </Grid>

                                    </CardActionArea>

                                </Card>

                            </Grid>

                            <br />

                        </>


                    )

                })

            }

            {/*<List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                {
                    data?.map((e) => {

                        return (
                            <Grid item xs={12}  p={1} sx = {{maxWidth: '100%'}}  >
                                <Card
                                    variant="outlined"
                                    sx={{
                                        display: 'inline-block',
                                        width: "100%",
                                        //background: '#feb4b3',
                                        borderRadius: "10px",
                                        
                                    }}>
                                    <CardActionArea
                                        className='childParent'
                                        key={e.id}
                                        
                                        sx={{ background: colorBg }}
                                    //onClick={() => changeColor(e.state)}   
                                    >
                                        <Grid
                                            container
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="flex-start" >

                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{ width: '100%' }}>

                                                <Typography variant='h6' sx={{ fontWeight: 'bold', color: "#28c4ac" }}>{e.asunto}</Typography>
                                                <Typography variant='body1'>{e.date}</Typography>

                                            </Grid>

                                            <Grid container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                sx={{ width: '90%' }}>
                                                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }} >{e.name}</Typography> -
                                                <Typography variant='subtitle1'>
                                                    {
                                                        e.mensaje
                                                    }
                                                </Typography>
                                            </Grid>

                                        </Grid>
                                    </CardActionArea>
                                </Card>
                                <br />
                            </Grid>

                        );

                    })
                }
            </List>*/}


        </div >


    );
}