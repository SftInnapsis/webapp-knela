import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Icon } from '@components/common/Icon';
import { Paper, Card, CardActionArea, InputBase, Box, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import { CancelIcon, SaveIcon } from "@toolbox/constants/icons";
import PersonIcon from '@mui/icons-material/Person';
// import './Modal.css';
import '@components/common/Modal/Modal.sass';
import EmailIcon from '@mui/icons-material/Email';
import { VALIDATORS } from '@/toolbox/helpers/validation-rules';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
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
import "./PatientTutor.css";


type ModalProps = {
    open: boolean,
    setOpen: any,
    actionSelect?: string,
    recoveryData?: any,
    SaveSolicitud?: any,
    printRequestError?: any,
    setPrintRequestError?:any
    //    editPatientMaster?: ({ }) => void,
}

export const SolicitudModal: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {
    const { open, setOpen, actionSelect, recoveryData, SaveSolicitud, printRequestError,setPrintRequestError } = props
    const user_data = readLocalStorage(KEY_USER_DATA)
    const [mensajeTemp, setMensajeTemp] = useState("")
    const [messageContent, setMessageContent] = React.useState([]);
    const [imageContent, setImageContent] = React.useState([]);
    const [messageCombinate, setMessageCombinate] = React.useState([]);

    const addContentText = (text) => {
        if (text) {
            const contador = messageContent.length;
            const obj = { key: `text${contador}`, value: text };
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
        }
    }

    function addContentFile(file, fileUrl) {
        if (file && fileUrl) {
            const contador = imageContent.length;
            const obj = { key: `file${contador}`, value: file };
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
        }
    }

    const handleSubmit = () => {
        const cont_txt = messageContent.length;
        const cont_file = imageContent.length;
        SaveSolicitud(messageCombinate, cont_txt, cont_file)
    }

    const onChange = (e) => {
        e.preventDefault();
        setMensajeTemp(e?.target?.value || "");
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
        setPrintRequestError('')
    }

    const bodyModal = (
        <Box
            sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(60%, -50%)", width: 400, height: 620,
                bgcolor: "background.paper", boxShadow: 24, pt: 2, px: 4, pb: 3, borderRadius: 5,
            }}>
            <Grid container spacing={2} display="flex" justifyContent="space-between">
                <Grid item xs={4}>
                    <Typography sx={{ color: '#28c4ac' }} fontSize='20px' fontWeight={'bold'} id="parent-modal-title">SOLICITUD</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Button variant="contained" className="btn-login2" fullWidth onClick={() => { handleSubmit() }}>Enviar Solicitud</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" className="btn-login2" fullWidth onClick={() => { Limpiar() }}>Limpiar</Button>
                </Grid>
            </Grid>
            <Divider sx={{ pt: 2 }} />
            <Divider />
            <Grid item xs={12} md={12} mt={2} sx={{ height: 480 }} >
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 480,
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
                    {messageCombinate.length > 0 && messageCombinate?.map(e => {
                        return (
                            <Grid container spacing={2} sx={{ p: 2 }}>
                                <Card sx={{ width: "100%", borderRadius: "10px", background: "#f3f3f3", p: 2 }}>
                                    {e.message && <Typography>
                                        {e.message}
                                    </Typography>}
                                    {e.img &&
                                        <a href={e.img} target="_blank">
                                            <img style={{ width: '50%', display: e.img ? 'flex' : 'none' }} src={e.img} />
                                        </a>
                                    }
                                </Card>
                            </Grid>
                        );
                    })
                    }
                    {printRequestError &&
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Card sx={{ width: "100%", borderRadius: "10px", background: "#feb4b3", p: 2 }}>
                                <Typography>
                                    {printRequestError}
                                </Typography>
                            </Card>
                        </Grid>
                    }
                </List>
            </Grid>
            <Grid container xs={12} display="flex" justifyContent="space-between" >
                <Grid item xs={11} >
                    <Paper component="form" sx={{ p: "0px 10px" }} >
                        <Grid container xs={12} display="flex" justifyContent="space-between">
                            <Grid item xs={11}>
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
                        </Grid>
                    </Paper>
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
        </Box>
    )

    return (
        <div>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}>
                {bodyModal}
            </Modal>
        </div>
    );
}
