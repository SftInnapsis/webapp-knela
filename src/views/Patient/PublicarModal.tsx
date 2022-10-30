import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, FormControl, MenuItem, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
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
    dataInitial?: any,
    recoveryData?: any,
    setRecoveryData?:any,
    savePublication?: ({ }) => void,
    editPublication?: ({ }) => void,
}

export const PublicarModal: React.FC<ModalProps> = (
    props: ModalProps
): JSX.Element => {
    const { open, setOpen, dataInitial, recoveryData ,setRecoveryData, savePublication, editPublication } = props;
    console.log(recoveryData)

    const [publication, setPublication] =useState(recoveryData.publication);
    const [statusPatient, setStatusPatient] =useState(recoveryData.idstatus_patient);
    const user_data = readLocalStorage(KEY_USER_DATA)

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
            if (publication && statusPatient) {
                savePublication({
                    publication: publication,
                    statusPatient: statusPatient,
                });
                setPublication('')
                setStatusPatient(null)
                setRecoveryData({})
            } else {
                alert('rellene todos los campos')
            }
        }
    }
    useEffect(()=>{
        setPublication(recoveryData.publication)
        setStatusPatient(recoveryData.idstatus_patient)
    },[recoveryData.publication])

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
        }}
        >

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


            <Grid item xs={12} md={12} mt={2}>
                <Card
                    //key={item.id}
                    sx={{
                        width: "100%",
                        background: "#f3f3f3",
                        borderRadius: "10px",
                        //background: item.color,
                    }}
                >
                    <CardActionArea className="contenedor">
                        <Grid container p={2} >
                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <InputBase
                                        id="outlined-multiline-static"
                                        placeholder="Descripcion del Paciente"
                                        multiline
                                        rows={5}
                                        value={publication}
                                        onChange={(e) => { setPublication(e.target.value) }}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid container mt={1}>
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
            </Grid>
        </Box>
    )

    return (
        <div>
            <Modal
                open={open}
                onClose={() => { setOpen(false); 
                    setPublication('');
                    setStatusPatient(null);
                    setRecoveryData({})}}>
                {bodyModal}
            </Modal>
        </div>
    );
}
