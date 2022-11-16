import { useState } from 'react';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import Divider from '@mui/material/Divider';

import { Grid, Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Protected } from '@/components/layout/Protected';

export const AccountPerfil = () => {
    const data_user = readLocalStorage(KEY_USER_DATA);

    const [perfil, setPerfil] = useState([data_user.user]);
    const _namedefault = "Nombres y Apellidos";
    console.log(perfil[0].name);


    return (
        <Protected>

            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{maxWidth: '80%'}}

            >
                {/*Primer Grid */}
                <Grid
                    container item xs={4}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        mt: '40px',
                        ml: '40px'
                    }}>

                    {/*User y Name*/}
                    <Grid
                        container item xs={9}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        {/*Use*/}
                        <AccountCircleIcon fontSize="large"
                            sx={{
                                width: '120px',
                                height: '120px',
                                color: '#A4AAAA',
                                ml: '40px'
                            }} />

                        {/*Name y Rut*/}
                        <Grid
                            container item xs={8}
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start">
                            <Grid item xs={6}>
                                <Typography variant="h4" noWrap>
                                    {
                                        perfil[0].name != "" && perfil[0].last_name != "" ?
                                            perfil[0].name + ' ' + perfil[0].last_name
                                            :
                                            _namedefault
                                    }

                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle2" noWrap>
                                    {perfil[0]?.rut}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/*Area y Especialidad*/}
                    <Grid
                        container item xs={3}
                        direction="column"
                        justifyContent="center"
                        alignItems="center">

                        <Grid item xs={6}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center">
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '20px', mr:'10px' }}>
                                Area:
                            </Typography>
                            <Typography variant="subtitle2" sx={{fontSize: '20px'}}>
                                {perfil[0]?.idarea}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center">
                            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr:'10px' }}>
                                Especialidad:
                            </Typography>
                            <Typography variant="subtitle2" noWrap sx={{fontSize: '20px'}}>
                                {perfil[0]?.idspecialty}
                            </Typography>
                        </Grid>

                    </Grid>


                </Grid>

                {/*Segundo Grid */}
                <Grid item xs={8}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        width: '100%',
                        mt: '70px',
                        ml: '40px'
                    }}>

                    {/*MiniHeader*/}
                    <Grid item xs={3}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start">
                        <Grid item
                            sx={{
                                width: '100%',
                                ml: '50px',

                            }}>
                            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '25px' }}>
                                Informacion Personal
                            </Typography>
                            <Divider />
                        </Grid>
                    </Grid>

                    {/*Datos*/}
                    <Grid item xs={9}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            mt: '35px',
                            ml: '15%',
                        }}>

                        <Grid item xs={5}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >

                            <Grid item xs={6}
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center">
                                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr:'10px' }}>
                                    Fecha:
                                </Typography>
                                <Typography variant="subtitle2" noWrap sx ={{ fontSize: '20px'}}>
                                    {perfil[0]?.date_birth}
                                </Typography>


                            </Grid>


                            <Grid item xs={6}
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center">

                                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr:'10px' }}>
                                    Correo:
                                </Typography>
                                <Typography variant="subtitle2" noWrap sx ={{ fontSize: '20px'}}>
                                    {perfil[0]?.mail}
                                </Typography>

                            </Grid>

                        </Grid>


                        <Grid item xs={6}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                            <Grid item xs={6}
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="flex-start">

                                <Grid item xs={6}
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center">
                                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' , fontSize: '20px', mr:'10px'}}>
                                        Centro Medico:
                                    </Typography>
                                    <Typography variant="subtitle2" noWrap sx={{fontSize: '20px'}}>
                                        {perfil[0].medical_center[0].name}
                                    </Typography>


                                </Grid>


                                <Grid item xs={6}
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center">

                                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr:'10px' }}>
                                        Direccion:
                                    </Typography>
                                    <Typography variant="subtitle2" noWrap sx={{fontSize: '20px'}}>
                                        {perfil[0]?.address}
                                    </Typography>

                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>

            </Grid>


        </Protected>
    )
}