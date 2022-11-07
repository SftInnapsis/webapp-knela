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


type ModalProps = {
    open: boolean,
    setOpen: any,
    actionSelect?: string,
    recoveryData?: any,
    //    savePatientMaster?: ({ }) => void,
    //    editPatientMaster?: ({ }) => void,
}

export const TutorModal: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {
    const { open, setOpen, actionSelect, recoveryData } = props
    console.log(open)
    const user_data = readLocalStorage(KEY_USER_DATA)

    const bodyModal = (
        <Box
            sx={{
                position: "absolute", top: "50%", left: "50%", transform: "translate(60%, -50%)", width: 400, height: 670,
                bgcolor: "background.paper", boxShadow: 24, pt: 2, px: 4, pb: 3, borderRadius: 5,
            }}>
            <Grid item xs={12} md={6} mt={1}>
                <Typography sx={{ color: '#28c4ac' }} fontSize='20px' fontWeight={'bold'} id="parent-modal-title">TUTOR</Typography>
            </Grid>
            <Grid item xs={12} md={12} mt={2} mb={54}>
                <Card
                    sx={{
                        width: "100%",
                        background: "#f3f3f3",
                        borderRadius: "10px",
                    }}
                >
                    <CardActionArea className="contenedor">
                        <Grid container className="texto-encima" p={2}>
                            <Grid item xs={12}>
                                <Grid display="flex" justifyContent="space-between">
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                        fontWeight={"bold"}
                                        color="#28c4ac"
                                    >
                                        Claudia Mantila
                                    </Typography>
                                </Grid>
                                <Typography gutterBottom>
                                    Hola Doctor! nos puede contar como salio la operacion?
                                    Gracias!
                                </Typography>
                                <Grid mt={1}>
                                    <Typography gutterBottom>
                                        08:30 AM
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid container item xs={12} md={12} mt={1} mb={10}>
                <Grid display="flex">
                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search">
                        <CameraAltOutlinedIcon sx={{ color: '#28c4ac' }} />
                    </IconButton>
                    <Paper component="form" sx={{ p: "0px 10px" }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Escribe un Mensaje"
                        />
                        <IconButton
                            type="button"
                            sx={{ p: "10px" }}
                            aria-label="search"
                        >
                            <SendIcon />
                        </IconButton>
                    </Paper>

                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <MicIcon sx={{ color: '#28c4ac' }} />
                    </IconButton>

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
