
import * as React from 'react';
import { useState, useEffect } from "react";
import { Paper, Box, Grid, Typography, TextField, Button, List, Card, IconButton, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';


export const BodyModal = () => {

    const [mensaje, setMensaje] = useState('')
    const [mensajeCombinado, setMensajeCombinado] = React.useState([
        {
            valueMensaje: '',
            files: [
                {
                    file: null,
                    img: null
                }
            ]
        }
    ])


    const onChangeMensaje = (e) => {
        e.preventDefault();
        setMensaje(e?.target?.value || '');
    }

    const insertarMensaje = () => {

        const existsMessage = mensajeCombinado.find(msg => {
            return msg.valueMensaje == mensaje;

        });

        if (existsMessage) {
            //Existe el mensaje se añade un archivo
            let updateFiles = [...existsMessage.files]

            //Capturar el archivo
            let newFile = null;

            updateFiles.push(newFile)
            
            let updateMessages = mensajeCombinado.map((message) => {
                if (message.valueMensaje == mensaje){
                    return {
                        ...message,
                        files: updateFiles,
                    }
                }

                return message
            })

            setMensajeCombinado(updateMessages)
            
        } else {
            //Crea un nuevo registro
        }

        setMensaje("")
    }


    useEffect(() => {
    }, [])

    console.log(mensajeCombinado)
    return (

        <>
            <Grid container item xs={12} md={12} mt={2}>
                <Grid item xs={6} md={6} mt={1}>
                    <Typography sx={{ color: '#28c4ac' }} fontSize='18px' fontWeight={'bold'} id="parent-modal-title">Nueva Actualizacion:</Typography>
                </Grid>

                <Grid item xs={2} md={2} >
                    <TextField
                        id="outlined-select-ubicationclinica"
                        select
                        sx={{ width: "200px" }}
                        size="small"
                        label='Seleccione Estado'
                    //value={statusPatient}
                    //onChange={(e) => { setStatusPatient(e.target.value) }}
                    />
                </Grid>
            </Grid>

            <Grid container item xs={12} md={12} mt={2} spacing={2}>
                <Grid item xs={6}>
                    <Button variant="contained" className="btn-login2" fullWidth onClick={() => { /*handleSubmit()*/ }}>Publicar</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" className="btn-login2" fullWidth onClick={() => { /*Limpiar()*/ }}>Limpiar</Button>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12} mt={2} sx={{ height: '60%' }} >
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 380,
                        '& ul': { padding: 0 },
                    }}>

                    <Card
                        sx={{
                            width: "100%",
                            background: "#f3f3f3",
                            borderRadius: "10px",
                        }}
                    >
                    </Card>

                </List>
            </Grid>

            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    height: '12%',
                    width: '100%',
                    mb: '10px'
                }}>

                <Grid item
                    sx={{
                        overflow: 'auto',
                        width: '80%',
                        maxHeight: '100%',
                    }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1, width: '95%', }}
                        multiline
                        value={mensaje}
                        onChange={onChangeMensaje}
                        placeholder="Escribe un Mensaje"
                        name='mensaje'
                        id='mensaje'
                    />
                </Grid>



                <Grid
                    item
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: '20%', }}>

                    <Grid item>

                        <IconButton
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                            onClick={(e) => { insertarMensaje() }}
                        >
                            <SendIcon />
                        </IconButton>

                    </Grid>
                    <Grid item>
                        <input style={{ display: 'none' }} id="upload-file" type="file"
                            //onChange={processFile} 
                            accept="image/*" />
                        <label htmlFor="upload-file">
                            <IconButton
                                component="span"
                                sx={{ p: "10px" }}>
                                <AttachFileIcon />
                            </IconButton>
                        </label>
                    </Grid>

                </Grid>



            </Grid>
        </>

    );
}