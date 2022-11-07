import React, { useState } from "react";
import { Card, CardActionArea, CardMedia, Grid, IconButton, Snackbar, Alert, MenuItem, Modal, TextField, Typography, Box, InputBase, Button, } from "@mui/material";
import { ROUTE_HOME } from '@constants/route-map';
import { Link } from "react-router-dom";
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
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from '@mui/icons-material/Delete';
import { InputOutlined, Padding } from "@mui/icons-material";
import { attentionService } from '@/service/services/Attention.service';
import { Protected } from "@/components/layout/Protected";
import { TutorModal } from "./TutorModal";
import { SolicitudModal } from "./SolicitudModal";
import { ListSolicitudModal } from "./ListSolicitudModal";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { RequestService } from '@/service/services/Request.service';
//import {GenerarSolicitud} from "../../assets/img/generar-solicitud.png" ;
// import "./PatientTutor.css";
import { ROLE_DOCTOR, ROLE_TUTOR, ROLE_PACIENTE } from '@/toolbox/defaults/static-roles';
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_USER_DATA } from "@/toolbox/constants/local-storage";

export const PatientTutorView = (props) => {
    const item = props.location.state.dataPacientes;
    const { MedicalCenterReducer = '' } = props;
    const [showModalEquipo, setModalEquipo] = React.useState(false);
    const [showModalTutor, setModalTutor] = React.useState(false);
    const [showChatEquipo, setshowChatEquipo] = useState(false);
    const [showModalIngresoPaciente, setModalIngresoPaciente] = React.useState(false);

    const [mensajePaciente, setmensajePaciente] = React.useState([]);
    const [statusDefault, setstatusDefault] = React.useState(null)
    const [typePublication, setTypePublication] = React.useState('')
    const [statusName, setStatusName] = useState(null)
    const [estado, setEstado] = React.useState([])
    const [recoveryData, setRecoveryData] = React.useState({})
    const dataUser: any = readLocalStorage(KEY_USER_DATA)
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'error',
        message: 'Error',
        autoHideDuration: 3000,
    })

    const [showModalSolicitud, setModalSolicitud] = React.useState(false);
    const [printRequest, setPrintRequest] = React.useState([]);
    const [printRequestError, setPrintRequestError] = React.useState('');

    const getStatusPatient = async (id_typePublication) => {
        console.log(MedicalCenterReducer.id_medical_center)
        const res = await attentionService.getStatusUpdatePatient([item?.idpatients], MedicalCenterReducer.id_medical_center, id_typePublication);
        if (res.data && res.data.status !== false) {
            console.log(res.data.length);
            setstatusDefault(res.data[res.data.length - 1].idstatus_patient)
            setmensajePaciente(res.data)
        } else {
            setmensajePaciente([])
        }
    }

    const dataInitialStatusPatient = async () => {
        const res = await attentionService.getStatusPatient(MedicalCenterReducer.id_medical_center);
        if (res.data && res.data.status !== false) {
            setEstado(res.data)
        } else {
            setEstado([])
        }
    }

    const handleChange = (event) => {
        //     console.log(event.target.value);
        //     const filname:any = estado.find((valuee) => valuee.id == event.target.value)
        //     console.log(filname)
        //     setStatusName(filname.name)
    };

    const handleChangePublication = (event) => {
        const value = event.target.value;
        console.log(value)
        setTypePublication(value);
        getStatusPatient(value)
    };

    const getSendRequest = async () => {
        const res = await RequestService.getRequest(item.id, MedicalCenterReducer.id_medical_center)
        if (res.data) {
            setPrintRequest(res.data)
        }
    }

    const SaveSolicitud = async (data, cont_txt, cont_file) => {
        const formData = new FormData();
        data && data.length > 0 && data.map((row, i) => {
            if (row.message) {
                formData.append(row.key, row.message);
            }
            if (row.file) {
                formData.append(row.key, row.file);
            }
        })
        if (data && data.length > 0) {
            const res = await RequestService.createRequest(MedicalCenterReducer.id_medical_center, item.id, item.idtutor, cont_txt, cont_file, formData)
            if (res?.data?.message && res?.data?.detail) {
                const { message = '' } = res.data;
                setSnackBarConfig(prev => ({
                    ...prev,
                    open: true,
                    message: message,
                    severity: 'success'
                }));
                setModalSolicitud(false)
                setPrintRequestError('');
            } else {
                const { message = '' } = res.data;
                setPrintRequestError(message);
            }
        }
    }
    React.useEffect(() => {
        dataInitialStatusPatient()
        getStatusPatient(typePublication)
        getSendRequest()
    }, [MedicalCenterReducer.id_medical_center])




    return (
        <>
            <Grid container className="containerInvite">
                <Grid container justifyContent={"center"}>
                    <Grid item xs={12} md={11}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={3} mt={2}>
                                <Link to={ROUTE_HOME} className="link__css">
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        className="link__css-back">
                                        <ArrowBackIosIcon className="icon_back" />
                                        Volver
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item container direction={'row'} justifyContent='space-between'>
                                <Grid item>
                                    <Typography
                                        sx={{ color: "#28c4ac", textTransform: 'uppercase' }}
                                        variant={"h4"}
                                        className="title__main" >
                                        Paciente {item.patientsName}{" "}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid item container direction={'row'} justifyContent='center' alignItems={'center'} spacing={1}>
                                        <Grid item xs={6} >
                                            <Typography
                                                variant={"subtitle1"}
                                                sx={{ color: "#28c4ac" }}
                                                className="subtitle_doctor">
                                                Estado del Paciente
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                id="outlined-select-ubicationclinica"
                                                select
                                                sx={{ width: "200px" }}
                                                size="small"
                                                disabled
                                                value={statusDefault}
                                                onChange={handleChange}
                                            >
                                                {estado.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <Grid item xs={12} md={8} mt={1}>
                                    <Grid item xs={6}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: '#feb4b3',
                                                borderRadius: "10px"
                                            }}>
                                            <CardActionArea className="contenedor">
                                                <Grid container className="texto-encima">
                                                    <Grid item xs={12} sx={{ p: 1 }}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            p={'3px'}
                                                            className="texto-card2"
                                                            sx={{ textTransform: 'uppercase' }}>
                                                            {`ÁREA: ${item.nameArea}`}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            p={'3px'}
                                                            className="texto-card2"
                                                            sx={{ textTransform: 'uppercase' }}>
                                                            {`TIPO ATENCIÓN: ${item.attentionTypeName}`}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h6"
                                                            component="div"
                                                            p={'3px'}
                                                            className="texto-card3"
                                                            sx={{ textTransform: 'uppercase' }}>
                                                            {`TIPO SEGURO: ${item.nameTypeSeguro}`}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                    {item?.observation && <Grid item xs={4}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: '#feb4b3',
                                                borderRadius: "10px"
                                            }}>
                                            <CardActionArea className="contenedor">
                                                <Grid container className="texto-encima">
                                                    <Grid item xs={12} sx={{ p: 1 }}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            p={'3px'}
                                                            className="texto-card2"
                                                            sx={{ textTransform: 'uppercase' }}>
                                                            {`OBSERVACIÓN:`}
                                                        </Typography>

                                                        <Typography gutterBottom >
                                                            {item?.observation}
                                                        </Typography>
                                                       
                                                    </Grid>
                                                </Grid>
                                            </CardActionArea>
                                            
                                        </Card>
                                    </Grid>}
                                </Grid>
                                <Grid item container xs={12} md={4} direction={'row'} justifyContent={'flex-end'} spacing={1}>
                                    {dataUser?.user?.role == ROLE_TUTOR &&
                                        <Grid item xs={4} md={2} mt={1}>
                                            <Card
                                                key={item.id}
                                                sx={{
                                                    width: "100%",
                                                    background: "#21c6ab",
                                                    borderRadius: "10px",
                                                }}
                                                onClick={() => setModalSolicitud(true)}>
                                                <CardActionArea className="contenedor">
                                                    <CardMedia component="text" height="90" />
                                                    <Grid container className="texto-encima">
                                                        <Grid item container xs={12} justifyContent='center' alignItems='center'>
                                                            <AssignmentIcon
                                                                sx={{ fontSize: 60, color: "white" }} />
                                                        </Grid>
                                                    </Grid>
                                                </CardActionArea>
                                            </Card>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                component="div"
                                                textAlign="center"
                                                color="#28c4ac"
                                                mt={1}
                                                className="texto-card2">
                                                Generar Solicitud
                                            </Typography>
                                        </Grid>}
                                    {<Grid item xs={4} md={2} mt={1}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: "#f25ba7",
                                                borderRadius: "10px",
                                            }}
                                            onClick={() => setModalTutor(true)}>
                                            <CardActionArea className="contenedor">
                                                <CardMedia component="text" height="90" />
                                                <Grid container className="texto-encima">
                                                    <Grid item container xs={12} justifyContent='center' alignItems='center'>
                                                        <FavoriteBorderIcon
                                                            sx={{ fontSize: 60, color: "white" }} />
                                                    </Grid>
                                                </Grid>
                                            </CardActionArea>
                                        </Card>
                                        <Typography
                                            align={"center"}
                                            gutterBottom
                                            variant="body2"
                                            component="div"
                                            color="#28c4ac"
                                            mt={1}
                                            className="texto-card2">
                                            Solicitud Enviada
                                        </Typography>
                                    </Grid>}
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid container spacing={1} justifyContent={"center"}>
                            <Grid container spacing={1} item xs={12} md={12} mt={2}>
                                <Grid item xs={6} md={6} mb={2}>
                                    <Typography
                                        variant={"body1"}
                                        sx={{
                                            textAlign: "start",
                                            color: "#3b3b3b",
                                            fontWeight: "bolder",
                                        }}>
                                        Ultimas Actualizaciones
                                    </Typography>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-select-ubicationclinica"
                                            select
                                            sx={{ width: "200px" }}
                                            size="small"
                                            value={typePublication}
                                            onChange={handleChangePublication}
                                        >
                                            <MenuItem value={''}>
                                                All
                                            </MenuItem>
                                            <MenuItem value={1}>
                                                Publicación médica
                                            </MenuItem>
                                            <MenuItem value={2}>
                                                Publicación administrativo
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                {dataUser?.user?.role == ROLE_DOCTOR ? <Grid
                                    item
                                    xs={6}
                                    md={6}
                                    mb={2}
                                    display="flex"
                                    justifyContent={"flex-end"}
                                    onClick={() => setModalIngresoPaciente(true)}>
                                    <IconButton sx={{ color: "#28c4ac" }}>
                                        <AddCircleSharpIcon />
                                        <Typography
                                            variant={"body1"}
                                            className="subtitle_doctor">
                                            Nuevo
                                        </Typography>
                                    </IconButton>
                                </Grid> :
                                    <Grid
                                        item
                                        xs={6}
                                        md={6}
                                        mb={2}
                                        display="flex"
                                        justifyContent={"flex-end"}
                                    >

                                    </Grid>}
                                {mensajePaciente.map((item2) => (
                                    <Grid item xs={12} md={4}>
                                        <Card
                                            key={item2.id}
                                            sx={{
                                                width: "100%",
                                                background: '#c3e6ce',
                                                borderRadius: "10px",
                                                height: '150px',
                                                overflow: 'auto'
                                            }}>

                                            {/* <CardActionArea className="contenedor"> */}
                                            <CardMedia
                                                component="text"
                                                height="90"
                                                name={item2.subtitle} />
                                            <Grid container className="texto-encima" p={2}>
                                                <Grid item xs={12}>
                                                    <Grid display="flex" justifyContent="space-between">
                                                        <Typography
                                                            gutterBottom
                                                            variant="subtitle1"
                                                            fontWeight={"bolder"}
                                                        >
                                                            {/* {`DOCTOR(A): ${item2.nameDoctor}`} */}
                                                            {item2.nameDoctor ? `DOCTOR(A): ${item2.nameDoctor}` : `PROFESIONAL(A): ${item2.nameProfessional}`}
                                                        </Typography>
                                                        <Grid >
                                                            <Typography
                                                                gutterBottom
                                                                fontWeight={"bolder"}
                                                            >
                                                                {item2.creation_date}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Typography gutterBottom sx={{ textTransform: 'uppercase' }}>
                                                        {item2.publication}
                                                    </Typography>

                                                </Grid>
                                            </Grid>
                                            {/* </CardActionArea> */}
                                            {/* <Grid item container direction='row' justifyContent="center" spacing={2}>
                                                <Grid item>
                                                    <Button variant='outlined' color='secondary' >EDITAR</Button>
                                                </Grid> 
                                                <Grid item>
                                                    <Button variant='outlined' color='error'>ELIMINAR</Button>
                                                </Grid>
                                            </Grid> */}
                                            {/* <span style={{padding:'10px',fontSize:'15px'}}>
                                                {`ESTADO: ${item2.nameStatusPatient}`}
                                            </span> */}
                                            <Typography fontWeight={"bolder"} gutterBottom sx={{ pl:2, textTransform: 'uppercase',color:'red' }}>
                                                {`ESTADO: ${item2.nameStatusPatient}`}
                                            </Typography>

                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >
            {/* <TutorModal
                open={showModalTutor}
                setOpen={setModalTutor}
            /> */}
            <SolicitudModal
                open={showModalSolicitud}
                setOpen={setModalSolicitud}
                SaveSolicitud={SaveSolicitud}
                printRequestError={printRequestError}
                setPrintRequestError={setPrintRequestError}
            />
            <ListSolicitudModal
                open={showModalTutor}
                setOpen={setModalTutor}
                recoveryData={printRequest}
            />

            <Snackbar
                open={snackBarConfig.open}
                autoHideDuration={snackBarConfig.autoHideDuration}
                onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackBarConfig(prev => ({ ...prev, open: false }))}
                    severity={snackBarConfig.severity}
                    variant="filled"
                >
                    {snackBarConfig.message}
                </Alert>
            </Snackbar>
        </>
    );
};
