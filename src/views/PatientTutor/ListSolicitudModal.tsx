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
}

export const ListSolicitudModal: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {
    const { open, setOpen, actionSelect, recoveryData } = props
    const user_data = readLocalStorage(KEY_USER_DATA)
    const [messageCombinate, setMessageCombinate] = React.useState([]);
    const [cardSelect, setCardSelect] = React.useState(-1)

    const SaveRequest = (data, pos) => {
        console.log(data.detailMessage);
        setMessageCombinate(data.detailMessage)
        setCardSelect(pos)
    }
    const bodyModal = (
        <Box
            sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(60%, -50%)", width: 400, height: 670,
                bgcolor: "background.paper", boxShadow: 24, pt: 2, px: 4, pb: 3, borderRadius: 5,
            }}>

            <Grid item xs={12} md={12} mt={2} sx={{ height: 540 }} >
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                    }}>

                    {recoveryData && recoveryData.length > 0 ? recoveryData.map((e, i) => {
                        return (
                            <Grid container spacing={2} sx={{ p: 2 }}>
                                <Card onClick={() => { SaveRequest(e, i) }} sx={{ width: "100%", borderRadius: "10px", background: i == 0 ? "#28C4AC" : "#FEB4B3", p: 2, cursor: 'pointer' }}>
                                    <Grid container direction={'row'} alignItems={'center'} >
                                        {cardSelect == i ? <SendIcon sx={{ pr: 1 }} /> : <Box sx={{ pr: 4 }}></Box>}
                                        <Typography>
                                            {`SOLICITUD N° ${i + 1}`}
                                        </Typography>
                                    </Grid>
                                </Card>
                            </Grid>
                        )
                    }) :
                        // <Card sx={{ width: "100%", borderRadius: "10px", background: "#fff", p: 2}}>
                        <Grid container direction={'row'} justifyContent='center' alignItems={'center'} sx={{ textAlign: 'center' }}>
                            <Typography variant="h3">
                                SIN SOLICITUDES
                            </Typography>
                        </Grid>
                        // </Card>
                    }
                    <List
                        sx={{
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 400,
                        }}
                    >
                        {
                            messageCombinate.length > 0 && messageCombinate?.map(e => {
                                return (
                                    <Grid container spacing={2} sx={{ p: 2 }}>
                                        <Card sx={{ width: "100%", borderRadius: "10px", background: "#f3f3f3", p: 2 }}>
                                            {/* <CardActionArea > */}
                                            {e.idsend_type == 1 && <Typography>
                                                {e.send}
                                            </Typography>}
                                            {e.idsend_type == 3 &&
                                                <a href={`https://back.k-nela.cl/${e.send}`} target="_blank">
                                                    <img style={{ width: '50%', display: e.idsend_type == 3 ? 'flex' : 'none' }} src={`https://back.k-nela.cl/${e.send}`} />
                                                </a>
                                            }
                                            {/* </CardActionArea> */}
                                        </Card>
                                    </Grid>
                                );
                            })

                        }
                    </List>
                  
                </List>
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
