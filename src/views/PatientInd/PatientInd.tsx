import React, { useMemo, useState } from "react";
import { Card, CardActionArea, CardMedia, Grid, IconButton, MenuItem, Modal, TextField, Typography, Box, InputBase, Button, Snackbar, Alert, } from "@mui/material";
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
import { PublicarModal } from "./PublicarModal";
import "./Patient.css";
import { ROLE_DOCTOR, ROLE_TUTOR } from '@/toolbox/defaults/static-roles';
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ListSolicitudModal } from "@views/PatientTutor/ListSolicitudModal";
import { RequestService } from '@/service/services/Request.service';
import { ROLE_PROFESSIONAL } from "@/toolbox/constants/role-type";
import { CardComponent } from '@components/common/Card';
import { chatService } from "@/service/services/Chat.service";
import { ConfirmDialog } from "@/components/common/DialogConfirm";
import AssessmentIcon from '@mui/icons-material/Assessment';

export const PatientIndView = (props) => {
    const item = props.location.state.dataPaciente;
    const { MedicalCenterReducer = '' } = props;
    const [showModalEquipo, setModalEquipo] = React.useState(false);
    const [showModalTutor, setModalTutor] = React.useState(false);
    const [showChatEquipo, setshowChatEquipo] = useState(false);
    const [Dialog, setDialog] = useState<any>({
      open: false,
      title: 'Eliminar',
      confirm: false,
      id: null,
      message: ``
      })
      const [snackBarConfig, setSnackBarConfig] = useState<any>({
         open: false,
         severity: 'success',
         message: 'Error',
         autoHideDuration: 5000,
      })


    const [showModalIngresoPaciente, setModalIngresoPaciente] = React.useState(false);
    const [statusValidate, setStatusValidate] = React.useState(false);
    const [mensajePaciente, setmensajePaciente] = React.useState([]);
    const [statusDefault, setstatusDefault] = React.useState(null)
    const [statusName, setStatusName] = useState(null)
    const [estado, setEstado] = React.useState([])
    const [recoveryData, setRecoveryData] = React.useState({})
    const [printRequest, setPrintRequest] = React.useState([]);
    const [chatsId, setChatsId] = React.useState(null);
    const dataUser: any = readLocalStorage(KEY_USER_DATA)
    const userData = readLocalStorage(KEY_USER_DATA);
    const savePublication = async (data, cont_txt, cont_file, statusPatient) => {
        // const publication = {
        //     medical_center: MedicalCenterReducer.id_medical_center,
        //     idattention: item?.id,
        //     idstatus_patient: data?.statusPatient,
        //     iddoctor: userData?.user?.role == ROLE_PROFESSIONAL ? null: item?.iddoctor,
        //     idprofessional: userData?.user?.role == ROLE_PROFESSIONAL ? userData?.user?.id_professional: null,
        //     publication: data.publication,
        //     doctorName: item?.doctorName,
        //     typePublication: userData?.user?.role == ROLE_PROFESSIONAL && userData?.user?.name_area == 'Administrativo' ? 2:1
        // }
        // const res = await attentionService.createStatusUpdatePatient(publication);
        // if (res.data) {
        //     setModalIngresoPaciente(false)
        //     getStatusPatient()
        //     setstatusDefault(data?.statusPatient)
        // }
        console.log(userData)
        const formData = new FormData();
        formData.append('medical_center', MedicalCenterReducer.id_medical_center);
        formData.append('idattention', item?.id);
        formData.append('idstatus_patient',  userData?.user?.role == ROLE_PROFESSIONAL ? statusDefault: statusPatient);
        formData.append('iddoctor', userData?.user?.id_doctor);
        formData.append('idprofessional', userData?.user?.role == ROLE_PROFESSIONAL ? userData?.user?.id_professional : '');
        formData.append('idpublication_type', userData?.user?.role == ROLE_PROFESSIONAL && userData?.user?.name_area == 'Administrativo' ? '2' : '1');
        formData.append('countTexts', cont_txt);
        formData.append('countFiles', cont_file);
        data && data.length > 0 && data.map((row, i) => {
            if (row.message) {
                formData.append(row.key, row.message);
            }
            if (row.file) {
                formData.append(row.key, row.file);
            }
        })
        if (data && data.length > 0) {
            const res = await attentionService.createStatusUpdatePatient(formData);
            if (res?.data?.message && res?.data?.detail) {
                const { message = '' } = res.data;
                getStatusPatient()
                setModalIngresoPaciente(false)
                // setSnackBarConfig(prev => ({
                //     ...prev,
                //     open: true,
                //     message: message,
                //     severity: 'success'
                // }));
                // setModalSolicitud(false)
                // setPrintRequestError('');
            }
            //  else {
            //     const { message = '' } = res.data;
            //     setPrintRequestError(message);
            // }
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
        let res: any;
        if (userData?.user?.role == ROLE_PROFESSIONAL && userData?.user?.name_area == 'Administrativo') {
            res = await attentionService.getStatusUpdatePatient([item?.idpatients], MedicalCenterReducer.id_medical_center, 2, [item?.id]);
        } else {
            res = await attentionService.getStatusUpdatePatient([item?.idpatients], MedicalCenterReducer.id_medical_center, 1, [item?.id]);
        }
         console.log(res.data)
         console.log(item);
        if (res.data && res.data.status !== false) {
            setstatusDefault(res.data[0].data.idstatus_patient)
            setmensajePaciente(res.data)
        } else {
            setstatusDefault(item.idstatus_patient)
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

    const getSendRequest = async () => {
        const res = await RequestService.getRequest(item.id, MedicalCenterReducer.id_medical_center)
        if (res.data) {
            setPrintRequest(res.data)
        }
    }
    const handleChange = (event) => {
        //     console.log(event.target.value);
        //     const filname:any = estado.find((valuee) => valuee.id == event.target.value)
        //     console.log(filname)
        //     setStatusName(filname.name)
    };
    const recoveryDataClick = (row) => {
        setRecoveryData({ ...row, action: 'edit' });
        setModalIngresoPaciente(true)
    }

    const Delete = async () => {
      try {
          if (Dialog.confirm == true) {
              const resp_delete = await attentionService.deleteStatusUpdatePatient(Dialog.id, MedicalCenterReducer.id_medical_center)
              if(resp_delete.data.status){
                  setSnackBarConfig(prev => ({
                      ...prev,
                      open: true,
                      severity: 'success',
                      message: 'Se eliminó la publicación con éxito',
                   }));
              }else{
                  setSnackBarConfig(prev => ({
                      ...prev,
                      open: true,
                      severity: 'success',
                      message: 'No se eliminó la publicación',
                   }));
              }
            //   getDataInitial();
            getStatusPatient()
              console.log(resp_delete)
          }
      } catch (e) {
          console.log(e)
      }
  }

   const RecuperarData = async (data) => {
      if (data) {
         const { id } = data;
         setDialog(prev => ({ ...prev, message: ``, id: id, open: true, confirm: true }));
      }
   }

    React.useEffect(() => {
        dataInitialStatusPatient()
        getStatusPatient()
        getSendRequest()
    }, [MedicalCenterReducer.id_medical_center])

   // const validate = useMemo(() => {
   //    validateAtentiton()
   // }, [statusValidate]);

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
                              {/* <Grid item>
                                 <Button variant='contained' disabled={statusValidate} onClick={() => { InsertParticipantAtentiton()}}>
                                    {statusValidate ? 'PARTICIPANDO' : 'UNIRME'}
                                 </Button>
                              </Grid> */}
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
                                <Grid item xs={12} md={7} mt={2} container direction={'row'} spacing={1}>
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
                                                            variant="body2"
                                                            component="div"
                                                            p={'3px'}
                                                            className="texto-card2"
                                                            sx={{ textTransform: 'uppercase' }}>
                                                            {`TIPO SEGURO: ${item.nameTypeSeguro}`}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardActionArea>

                                        </Card>
                                    </Grid>

                                </Grid>
                                <Grid item container xs={12} md={4} direction={'row'} justifyContent={'flex-end'} spacing={1}>
                                        {/* <Grid item xs={4} md={2} mt={2}>
                                            <Card
                                                key={item.id}
                                                sx={{
                                                    width: "100%",
                                                    background: "#afaff4",
                                                    borderRadius: "10px"

                                                }}
                                               >
                                                <CardActionArea className="contenedor" disabled={!statusValidate} onClick={() => setModalEquipo(true)}>
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
                                                Chat
                                            </Typography>
                                        </Grid> */}
                                    {<Grid item xs={4} md={2} mt={2}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: "#f25ba7",
                                                borderRadius: "10px",
                                            }}
                                            >
                                            <CardActionArea className="contenedor" onClick={() => setModalTutor(true)}>
                                                <CardMedia component="text" height="90" />
                                                <Grid container className="texto-encima">
                                                    <Grid item container xs={12} justifyContent='center' alignItems='center'>
                                                        <AssessmentIcon
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
                                           Familia
                                        </Typography>
                                    </Grid>}
                                    {/* <Grid item xs={4} md={2} mt={2}>
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
                                    </Grid> */}
                                </Grid>
                            </Grid>

                        </Grid>

                        {item?.observation && <Grid item xs={3} sx={{ pt: 2 }}>
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

                        <Grid container justifyContent={"center"}>
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
                                <Grid
                                    item
                                    xs={6}
                                    md={6}
                                    mb={2}
                                    display="flex"
                                    justifyContent={"flex-end"}
                                    >
                                    <IconButton sx={{ color: "#28c4ac" }} onClick={() => setModalIngresoPaciente(true)}>
                                        <AddCircleSharpIcon />
                                        <Typography
                                            variant={"body1"}
                                            className="subtitle_doctor">
                                            Nuevo
                                        </Typography>
                                    </IconButton>
                                </Grid> :
                                {mensajePaciente.map((item2) => (
                                    <Grid item xs={12} md={4}>
                                        <CardComponent info={item2} RecuperarData={RecuperarData}/>
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
                statusDefault={statusDefault}
            />

            <ListSolicitudModal
                open={showModalTutor}
                setOpen={setModalTutor}
                recoveryData={printRequest}
            />
            <ConfirmDialog
                open={Dialog.open}
                title={Dialog.title}
                message={Dialog.message}
                onConfirm={() => Delete()}
                onClose={() => setDialog(prev => ({ ...prev, open: false }))}
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
