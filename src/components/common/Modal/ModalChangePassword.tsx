import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Fade, TextField, List, FormControl, MenuItem, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
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

type ModalProps = {
    open: boolean,
    setOpen: any,
    // recoveryData?: any,
    // setRecoveryData?: any,
    savePassword?: any,
}

export const ModalChangePassword: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {
    const { open, setOpen, savePassword } = props;
    const [externSelected, setExternSelected] = React.useState({
        password: ''
    })

    const bodyModal = (
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(50%, -50%)",
            width: 400,
            height: 670,
            bgcolor: "background.paper",
            boxShadow: 24,
            pt: 2,
            px: 4,
            pb: 3,
            borderRadius: 5,
        }}>
            <Typography
                textAlign="center"
                variant="h6"
                id="transition-modal-title"
                sx={{ color: "#000", fontWeight: "bold" }}>
                Agregar Contraseña
            </Typography>
            <Grid container spacing={1} mt={2} justifyContent="center">
                <Grid item xs={12}>
                    <TextField
                        type="text"
                        size="small"
                        name="password"
                        placeholder="Contraseña*"
                        fullWidth
                        value={externSelected.password}
                        onChange={(e) => { setExternSelected(prev => ({ ...prev, password: e.target.value })) }} />
                </Grid>
                <Grid container spacing={1} mt={2}>
                    <Grid item xs={6}>
                        {/* <Button fullWidth className="btn-cancelar" onClick={() => setOpenModal(false)}>Cancelar</Button> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => { savePassword(externSelected.password) }} fullWidth className="btn-aceptar" >Guardar Contraseña</Button>
                    </Grid>
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
