import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, List, FormControl, MenuItem, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Icon } from '@components/common/Icon';
import { Paper, Card, CardActionArea, InputBase, Box, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import { CancelIcon, SaveIcon } from "@toolbox/constants/icons";
import PersonIcon from '@mui/icons-material/Person';
// import './Modal.css';
import '@components/common/Modal/Modal.sass';
import EmailIcon from '@mui/icons-material/Email';
import { VALIDATORS } from '@/toolbox/helpers/validation-rules';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { authenticationRepository } from '@/service/repositories/Authentication.repository';
import { VisibilityIcon, VisibilityOffIcon } from '@toolbox/constants/icons';
import { professionalService } from '@/service/services/Professional.service';
import { ubigeoService } from '@/service/services/Ubigeo.service';
import { areaService } from '@/service/services/Area.service';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from '@mui/icons-material/Send';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from '@mui/icons-material/Delete';
import { CardComponent } from '@components/common/Card';
import { ROLE_PROFESSIONAL } from '@/toolbox/constants/role-type';

type ModalProps = {
    open: boolean,
    setOpen: any,
    dataInitial?: any,
    recoveryData?: any,
    setRecoveryData?: any,
    savePublication?: any,
    editPublication?: ({ }) => void,
    statusDefault?:any
}

export const PublicarModal: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {
    const { open, setOpen, dataInitial, recoveryData, setRecoveryData, savePublication, editPublication, statusDefault } = props;

    console.log(statusDefault)
    console.log(dataInitial)
    const [statusPatient, setStatusPatient] = useState(statusDefault);
    const [mensajeTemp, setMensajeTemp] = useState("")
    const [messageContent, setMessageContent] = React.useState([]);
    const [imageContent, setImageContent] = React.useState([]);
    const [messageCombinate, setMessageCombinate] = React.useState([]);
    const [statusText, setStatusText] = React.useState(false);
    const [statusFile, setStatusFile] = React.useState(false);
    const userData = readLocalStorage(KEY_USER_DATA);
    const [publication, setPublication] = useState(recoveryData.publication);


    const addContentText = (text) => {
        if (text) {
            const contador = messageContent.length;
            //----------------------------------------------------------------
            //Validar con el mensajeContent
            const obj = { key: `text${contador}`, value: text };
            if (contador < 1) {
                setMessageContent([...messageContent, obj])
                setMessageCombinate([
                    ...messageCombinate,
                    {
                        key: `text${contador}`,
                        message: text,
                        file: null,
                        img: null
                    }
                ])
                setMensajeTemp("")
            } else {
                setStatusText(true)
            }
        }
    }

    function addContentFile(file, fileUrl) {
        if (file && fileUrl) {
            const contador = imageContent.length;
            const obj = { key: `file${contador}`, value: file };
            if (contador < 1) {
                setImageContent([...imageContent, obj])
                setMessageCombinate([
                    ...messageCombinate,
                    {
                        key: `file${contador}`,
                        message: '',
                        file: file,
                        img: fileUrl
                    }
                ])
            } else {
                setStatusFile(true)
            }

        }
    }

    const onChange = (e) => {
        e.preventDefault();
        console.log(e?.target?.value)
        setMensajeTemp(e?.target?.value || "");
    }

    const handleSubmit = () => {
        if (recoveryData && recoveryData.action && recoveryData.action == 'edit') {
            editPublication({
                ...recoveryData,
                idstatus_patient: statusPatient,
                publication: publication
            });
            setPublication('')
            setStatusPatient(null)
            setRecoveryData({})
        } else {
            console.log(statusDefault)
            console.log(statusPatient)
            if (messageCombinate.length > 0 && statusPatient) {
                // savePublication({
                //     publication: publication,
                //     statusPatient: statusPatient,
                // });
                // setPublication('')
                // setStatusPatient(null)
                // setRecoveryData({})
                const cont_txt = messageContent.length;
                const cont_file = imageContent.length;
                console.log(messageCombinate)
                console.log(cont_txt)
                console.log(cont_file)
                savePublication(messageCombinate, cont_txt, cont_file, statusPatient)
                Limpiar();
            } else {
                alert('rellene todos los campos')
            }
        }
    }

    function processFile(event) {
        if (event && event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileUrl = URL.createObjectURL(file);
            addContentFile(file, fileUrl)
        }
    }

    const Limpiar = () => {
        setMensajeTemp("")
        setMessageContent([])
        setImageContent([])
        setMessageCombinate([])
        setStatusText(false)
        setStatusFile(false)
        // setPrintRequestError('')
    }
    useEffect(() => {
        console.log(statusDefault)
        setStatusPatient(statusDefault)
    }, [open])

    const bodyModal = (
        <Box  sx={{
            position: "absolute", top: "50%", left: "50%", transform: "translate(55%, -50%)", width: 430, height: 620,
            bgcolor: "background.paper", boxShadow: 24, pt: 2, px: 2, pb: 3, borderRadius: 5,
        }}>
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
                        value={statusPatient}
                        disabled={userData?.user?.role == ROLE_PROFESSIONAL?true:false}
                        onChange={(e) => { setStatusPatient(e.target.value) }}
                    >
                        {dataInitial.map((option: any) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            <Grid container item xs={12} md={12} mt={2} spacing={2}>
                <Grid item xs={6}>
                    <Button variant="contained" className="btn-login2" fullWidth onClick={() => { handleSubmit() }}>Publicar</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" className="btn-login2" fullWidth onClick={() => { Limpiar() }}>Limpiar</Button>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12} mt={2} sx={{ height: 350 }} >
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
                    {messageCombinate?.map(e => {
                        return (
                            <Grid container spacing={2} sx={{ p: 2 }} justifyContent='left' >
                                <Card sx={{ width: "auto", borderRadius: "10px", background: "#f3f3f3", p: 2, justifyContent: 'center' }}>
                                    {e.message && <Typography>
                                        {e.message}
                                    </Typography>}
                                    {e.img && <a href={e.img} target="_blank">
                                        <img style={{ width: '50%', display: e.img ? 'flex' : 'none' }} src={e.img} />
                                    </a>}

                                </Card>
                            </Grid>
                        );
                    })
                    }
                    {statusText &&
                        <Grid container spacing={2} sx={{ p: 2 }} justifyContent='right' >
                            <Card sx={{ width: "50%", borderRadius: "10px", background: "#F5AEAD", p: 2, justifyContent: 'center', textAlign: 'left' }}>
                                <Typography>
                                    Solo se puede hacer un envio de texto
                                </Typography>
                            </Card>
                        </Grid>
                    }
                    {statusFile &&
                        <Grid container spacing={2} sx={{ p: 2 }} justifyContent='right' >
                            <Card sx={{ width: "50%", borderRadius: "10px", background: "#F5AEAD", p: 2, justifyContent: 'center', textAlign: 'left' }}>

                                <Typography>
                                    Solo se puede enviar una imagen
                                </Typography>
                            </Card>
                        </Grid>
                    }


                </List>
            </Grid>

            {/* <Grid container mt={1}>
                <Grid item xs={12} mb={2} >
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="btn-login2"
                            onClick={() => { handleSubmit() }}
                        >
                            Publicar
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className='btn-login2'
                            onClick={() => {setOpen(false);
                            setPublication('');
                            setStatusPatient(null);
                            setRecoveryData({})}}
                        >
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </Grid> */}
            <Grid container xs={12} display="flex" justifyContent="space-between" >
                <Grid item xs={12} >
                    <Paper component="form" sx={{ height: '100px' }}>
                        <Grid container xs={12} display="flex" justifyContent="space-between" alignItems="center">
                            <Grid item xs={10}
                                sx={{
                                    overflow: 'auto',
                                    maxHeight: 100,
                                }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    multiline
                                    value={mensajeTemp}
                                    onChange={onChange}
                                    placeholder="Escribe un Mensaje"
                                    name='mensaje'
                                    id='mensaje'
                                />
                            </Grid>
                            <Grid item xs={1} >
                                <IconButton
                                    type="button"
                                    sx={{ p: "10px" }}
                                    aria-label="search"
                                    onClick={(e) => { addContentText(mensajeTemp) }}>
                                    <SendIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={1}>
                                <input style={{ display: 'none' }} id="upload-file" type="file" onChange={processFile} accept="image/*" />
                                <label htmlFor="upload-file">
                                    <IconButton
                                        component="span"
                                        sx={{ p: "10px" }}>
                                        <AttachFileIcon />
                                    </IconButton>
                                </label>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    )

    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setPublication('');
                    setStatusPatient(null);
                    setRecoveryData({})
                }}>
                {bodyModal}
            </Modal>
        </div>
    );
}
