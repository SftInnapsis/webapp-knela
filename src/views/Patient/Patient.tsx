import React, { useState } from "react";
import { Card, CardActionArea, CardMedia, Grid, IconButton, MenuItem, Modal, TextField, Typography, Box, InputBase, Button, } from "@mui/material";
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
import { EquipoModal } from "./EquipoModal";
import { PublicarModal } from "./PublicarModal";
import "./Patient.css";
import { ROLE_DOCTOR,ROLE_TUTOR } from '@/toolbox/defaults/static-roles';
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_USER_DATA } from "@/toolbox/constants/local-storage";

export const PatientView = (props) => {
    const item = props.location.state.dataPaciente;
    const { MedicalCenterReducer = '' } = props;
    const [showModalEquipo, setModalEquipo] = React.useState(false);
    const [showModalTutor, setModalTutor] = React.useState(false);
    const [showChatEquipo, setshowChatEquipo] = useState(false);
    const [showModalIngresoPaciente, setModalIngresoPaciente] = React.useState(false);

    const [mensajePaciente, setmensajePaciente] = React.useState([]);
    const [statusDefault, setstatusDefault] = React.useState(null)
    const [statusName,setStatusName] = useState(null)
    const [estado, setEstado] = React.useState([])
    const [recoveryData, setRecoveryData] = React.useState({})
    const dataUser:any = readLocalStorage(KEY_USER_DATA)

    const savePublication = async (data) => {
        const publication = {
            medical_center: MedicalCenterReducer.id_medical_center,
            idattention: item?.id,
            idstatus_patient: data?.statusPatient,
            iddoctor: item?.iddoctor,
            publication: data.publication,
            doctorName: item?.doctorName,
        }
        console.log(publication)
        const res = await attentionService.createStatusUpdatePatient(publication);
        if (res.data) {
            setModalIngresoPaciente(false)
            getStatusPatient()
            setstatusDefault(data?.statusPatient)
        }
    }

    const editPublication = async (data) => {
        const publication = {
            medical_center: MedicalCenterReducer.id_medical_center,
            idattention: data?.idattention,
            idstatus_patient: data?.idstatus_patient,
            iddoctor: data?.iddoctor,
            publication: data.publication,
            doctorName: data?.doctorName,
        }
        const res = await attentionService.updateStatusUpdatePatient(data.id, publication);
        if (res.data) {
            setModalIngresoPaciente(false)
            getStatusPatient()
            // setstatusDefault(data?.idstatus_patient)
        }

    }

    const getStatusPatient = async () => {
        console.log(MedicalCenterReducer.id_medical_center)
        const res = await attentionService.getStatusUpdatePatient(item?.id, MedicalCenterReducer.id_medical_center);
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
    const recoveryDataClick = (row) =>{
        setRecoveryData({ ...row, action: 'edit' }); 
        setModalIngresoPaciente(true)
    }

    React.useEffect(() => {
        dataInitialStatusPatient()
        getStatusPatient()
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
                                                            
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} md={4} direction={'row'} justifyContent={'flex-end'} spacing={1}>
                                 { dataUser?.user?.role ==ROLE_DOCTOR &&  <Grid item xs={4} md={2} mt={1}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: "#afaff4",
                                                borderRadius: "10px"
                                            }}
                                            onClick={() => setModalEquipo(true)}>
                                            <CardActionArea className="contenedor">
                                                <CardMedia component="text" height="90" />
                                                <Grid container className="texto-encima">
                                                    <Grid item container xs={12} justifyContent='center' alignItems='center'>
                                                        <PeopleIcon
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
                                            Equipo
                                        </Typography>
                                    </Grid>
}
                                    {dataUser?.user?.role == ROLE_TUTOR || ROLE_DOCTOR  && <Grid item xs={4} md={2} mt={1}>
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
                                            Tutor
                                        </Typography>
                                    </Grid>}
                                    <Grid item xs={4} md={2} mt={1}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: "#21c6ab",
                                                borderRadius: "10px"
                                            }}>
                                            <CardActionArea className="contenedor">
                                                <Grid container className="texto-encima">
                                                    <Grid item container xs={12} justifyContent='center' alignItems='center' >
                                                        <Typography
                                                            sx={{ fontWeight: "bold", color: "white" }}
                                                            fontSize="30px" >
                                                            29
                                                        </Typography>
                                                        <Grid mt={-1}>
                                                            <Typography
                                                                sx={{ fontWeight: "bold", color: "white" }}>
                                                                Abril
                                                            </Typography>
                                                        </Grid>
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
                                            Ingreso
                                        </Typography>
                                    </Grid>
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
                                </Grid>
                             {dataUser?.user?.role ==ROLE_DOCTOR ? <Grid
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
                                </Grid>:
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
                                            }}
                                            onClick={() => { dataUser?.user?.role ==ROLE_DOCTOR && recoveryDataClick(item2) }}>
                                            <CardActionArea className="contenedor">
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
                                                                {item2.nameDoctor}
                                                            </Typography>
                                                            <Grid >
                                                                <Typography
                                                                    gutterBottom
                                                                    fontWeight={"bolder"}>
                                                                    {item2.creation_date}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Typography gutterBottom >
                                                            {item2.publication}
                                                        </Typography>
                                                        
                                                    </Grid>
                                                </Grid>
                                            </CardActionArea>
                                            {/* <Grid item container direction='row' justifyContent="center" spacing={2}>
                                                <Grid item>
                                                    <Button variant='outlined' color='secondary' >EDITAR</Button>
                                                </Grid> 
                                                <Grid item>
                                                    <Button variant='outlined' color='error'>ELIMINAR</Button>
                                                </Grid>
                                            </Grid> */}
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid >

            <PublicarModal
                open={showModalIngresoPaciente}
                setOpen={setModalIngresoPaciente}
                savePublication={savePublication}
                editPublication={editPublication}
                dataInitial={estado}
                recoveryData={recoveryData}
                setRecoveryData={setRecoveryData}
            />
            <EquipoModal
                open={showModalEquipo}
                setOpen={setModalEquipo}
            />
            <TutorModal
                open={showModalTutor}
                setOpen={setModalTutor}
            />
        </>
    );
};
