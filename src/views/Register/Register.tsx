
import { Props } from './register.type'
import { FunctionComponent, useMemo, useEffect, useRef, useState } from "react";
import { Button, InputAdornment, IconButton, Grid, CircularProgress, Snackbar, Alert, FormControl, TextField, OutlinedInput, InputLabel, MenuItem, Select, Autocomplete } from '@mui/material';
import { VALIDATORS } from '@toolbox/helpers/validation-rules';
import { Icon } from '@components/common/Icon';
import { Input } from '@components/common/Input';
import { InputRef } from '@components/common/Input/InputInterfaces';
import { Loading } from "@components/common/Loading";
import "./Register.css";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/images/logoknela.png';
import logoLogin from "@assets/img/logo-login.jpg";
import Divider from '@mui/material/Divider';

import * as qs from 'qs'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ROUTE_ENTITY, ROUTE_HOME, ROUTE_LOGIN, ROUTE_REGISTER } from "@/toolbox/constants/route-map";
// import  logo from "@assets/svg/s-c-g-logo.svg";
import { authenticationService } from '@service/services/Authentication.service';
import { Link, Redirect, useHistory } from 'react-router-dom'
import { green } from '@mui/material/colors';
import LockIcon from '@mui/icons-material/Lock';
import { authenticationSoftnetService } from "@/service/api/services/AuthentificacionSoftnet.service";
// import { RecoverymailService } from "@/service/services/Recovery.service";
// import { notifyService } from "@/service/services/Notify.service";
// import { bypassService } from "@/service/services/Bypass.service";
import { KEY_BYPASS, KEY_RUTA, KEY_TOKEN_KYTE, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { ROLE_ADMIN, ROLE_ADMIN_PROYECCION, ROLE_DOCTOR, ROLE_DOCTOR_IND, ROLE_FAMILIAR, ROLE_PACIENTE, ROLE_SUPER_ADMIN, ROLE_TRABAJADOR, ROLE_TUTOR } from "@/toolbox/defaults/static-roles";
// import firebase from '@/config/firebase';
import Pusher from "pusher-js"
import Echo from 'laravel-echo'
import { Toaster, toast } from 'react-hot-toast';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { doctorService } from '@/service/services/Doctor.service';


const theme = createTheme();

const area = ['Area 1', 'Area 2'];
const especialidad = ['Especialidad 1', 'Especialidad 2'];
const distrito = ['Distrito 1', 'Distrito 2'];
const centroMedico = ['CentroMedico 1', 'CentroMedico 2'];


export const RegisterView: React.FC<Props> = (props: any): JSX.Element => {

    const [valueFoto, setValueFoto] = useState('Subir fotografia');
    const [valuePDF, setValuePDF] = useState('Subir archivo PDF');

    const [valueArea, setValueArea] = useState<string | null>(area[0]);
    const [inputValueArea, setInputValueArea] = useState('');


    const [valueEspecialidad, setValueEspecialidad] = useState<string | null>(especialidad[0]);
    const [inputValueEspecialidad, setInputValueEspecialidad] = useState('');


    const [valueDistrito, setValueDistrito] = useState<string | null>(distrito[0]);
    const [inputValueDistrito, setInputValueDistrito] = useState('');

    const [valueMedicalCenter, setValueMedicalCenter] = useState<string | null>(centroMedico[0]);
    const [inputValueMedicalCenter, setInputValueMedicalCenter] = useState('');


    const [data, setData] = useState({
        name: '',
        lastname: '',
        rut: '',
        date_birth: '',
        address: '',
        mail: '',
        medicalCenter: 0,
        district: 0,
        area: 0,
        especiality: 0,

        textError: ''
    });

    const [idDistrict, setIdDistrict] = useState({ id: 0, name: '' });
    const [idArea, setIdArea] = useState({ id: 0, name: '' });
    const [idEspeciality, setIdEspeciality] = useState({ id: 0, name: '' });
    const [idMedicalCenter, setIdMedicalCenter] = useState({ id: 0, name: '' });

    const [error, setError] = useState<any>('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        if (data.name === '') { return setError('name') }
        if (data.lastname === '') { return setError('lastname') }
        if (data.rut === '') { return setError('rut') }
        if (data.date_birth === '') { return setError('date_birth') }
        if (data.mail === '') { return setError('mail') }
        if (data.address === '') { return setError('address') }

        if (idMedicalCenter.name ==='') {return setError('idMedicalCenter') }
        if (idDistrict.name === '') { return setError('idDistrict') }
        if (idArea.name === '') { return setError('idArea') }
        if (idEspeciality.name === '') { return setError('idEspeciality') }

        //const { name, last_name, rut, date_birth, mail, address, area, district, especiality } = data

        try {
            const req = await doctorService.createDoctorIndependiente(data)
        }
        catch (e) {

        }

    }


    const onChange = (e) => {
        const injectData = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(injectData)
    }


    useEffect(() => {
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }} justifyContent="center" >
                <CssBaseline />
                <Grid
                    item
                    container
                    xs={12}
                    justifyContent="center"
                    sx={{

                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#28c4ac',
                        //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Grid item container xs={12} sm={8} md={10}>
                        <Grid
                            container
                            item
                            alignItems={'center'}
                        >

                            <Grid p={1} justifyContent={"center"} container>
                                <Grid item xs={12} md={7} sx={{ display: { md: 'block', xs: 'none' }, textAlign: 'center' }} >
                                    <Grid justifyContent={"center"} container>
                                        <Grid item xs={12}>
                                            <img style={{ width: "95%" }} src={logo} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item container xs={12} md={5} sx={{ background: "rgb(255, 255, 255)", borderRadius: "20px" }} p={2}>
                                    <Grid sx={{ background: "#ed6566", height: "5px", borderRadius: "10px 10px 0px 0px ", width: "100%" }}></Grid>
                                    <form onSubmit={handleSubmit}>
                                        <Grid container direction="row" spacing={2} >

                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <OutlinedInput
                                                        id="name"
                                                        value={data.name}
                                                        onChange={onChange}
                                                        placeholder={'Nombres'}
                                                        name='name'
                                                        startAdornment={
                                                            <InputAdornment position='start'>
                                                                <PersonIcon sx={{ color: "#28c4ac" }} />
                                                            </InputAdornment>}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <OutlinedInput
                                                        id="last_name"
                                                        placeholder={'Apellidos'}
                                                        value={data.lastname}
                                                        onChange={onChange}
                                                        name='last_name'
                                                        startAdornment={
                                                            <InputAdornment position='start'>
                                                                <PersonIcon sx={{ color: "#28c4ac" }} />
                                                            </InputAdornment>}
                                                    />
                                                </FormControl>
                                            </Grid>


                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <OutlinedInput
                                                        id="rut"
                                                        placeholder={'Rut'}
                                                        value={data.rut}
                                                        onChange={onChange}
                                                        name='rut'
                                                        startAdornment={
                                                            <InputAdornment position='start'>
                                                                <AssignmentIndIcon sx={{ color: "#28c4ac" }} />
                                                            </InputAdornment>}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <OutlinedInput
                                                    fullWidth
                                                    type="date"
                                                    id="date_birth"
                                                    value={data.date_birth}
                                                    placeholder={'Fecha de Nacimiento'}
                                                    onChange={onChange}
                                                    name='date_birth'
                                                    startAdornment={
                                                        <InputAdornment position='start'>
                                                            <CalendarTodayIcon sx={{ color: "#28c4ac" }} />
                                                        </InputAdornment>}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <OutlinedInput
                                                        id="mail"
                                                        value={data.mail}
                                                        placeholder={'Correo electronico'}
                                                        onChange={onChange}
                                                        name='mail'
                                                        startAdornment={
                                                            <InputAdornment position='start'>
                                                                <EmailIcon sx={{ color: "#28c4ac" }} />
                                                            </InputAdornment>}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <OutlinedInput
                                                        id="address"
                                                        placeholder={'Direccion'}
                                                        name='address'
                                                        onChange={onChange}
                                                        value={data.address}
                                                        startAdornment={
                                                            <InputAdornment position='start'>
                                                                <HomeIcon sx={{ color: "#28c4ac" }} />
                                                            </InputAdornment>}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid mb={1} item xs={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <Autocomplete
                                                        value={valueDistrito}
                                                        onChange={(event: any, newValue: string | null) => {
                                                            setValueDistrito(newValue);
                                                        }}
                                                        inputValue={inputValueDistrito}
                                                        onInputChange={(event, newInputValue) => {
                                                            setInputValueDistrito(newInputValue);
                                                        }}
                                                        id="iddistrict"
                                                        options={distrito}
                                                        renderInput={(params) => (
                                                            <div>
                                                                <TextField
                                                                    {...params}
                                                                    label="Distrito"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <BusinessIcon sx={{ color: "#28c4ac" }} />
                                                                            </InputAdornment>
                                                                        )
                                                                    }}
                                                                    fullWidth
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid mb={1} item xs={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <Autocomplete
                                                        value={valueMedicalCenter}
                                                        onChange={(event: any, newValue: string | null) => {
                                                            setValueMedicalCenter(newValue);
                                                        }}
                                                        inputValue={inputValueMedicalCenter}
                                                        onInputChange={(event, newInputValue) => {
                                                            setInputValueMedicalCenter(newInputValue);
                                                        }}
                                                        id="idMedicalCenter"
                                                        options={centroMedico}
                                                        renderInput={(params) => (
                                                            <div>
                                                                <TextField
                                                                    {...params}
                                                                    label="Centro Medico"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <BusinessIcon sx={{ color: "#28c4ac" }} />
                                                                            </InputAdornment>
                                                                        )
                                                                    }}
                                                                    fullWidth
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>

                                            <Grid mb={1} item xs={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <Autocomplete
                                                        value={valueArea}
                                                        onChange={(event: any, newValue: string | null) => {
                                                            setValueArea(newValue);
                                                        }}
                                                        inputValue={inputValueArea}
                                                        onInputChange={(event, newInputValue) => {
                                                            setInputValueArea(newInputValue);
                                                        }}
                                                        id="idArea"
                                                        options={area}
                                                        renderInput={(params) => (
                                                            <div>
                                                                <TextField
                                                                    {...params}
                                                                    label="Area"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <MonitorHeartIcon sx={{ color: "#28c4ac" }} />
                                                                            </InputAdornment>
                                                                        )
                                                                    }}
                                                                    fullWidth
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>
                                            </Grid>


                                            <Grid mb={1} item xs={6}>
                                                <FormControl fullWidth variant="outlined" >
                                                    <Autocomplete
                                                        value={valueEspecialidad}
                                                        onChange={(event: any, newValue: string | null) => {
                                                            setValueEspecialidad(newValue);
                                                        }}
                                                        inputValue={inputValueEspecialidad}
                                                        onInputChange={(event, newInputValue) => {
                                                            setInputValueEspecialidad(newInputValue);
                                                        }}
                                                        id="idEspeciality"
                                                        options={especialidad}
                                                        renderInput={(params) => (
                                                            <div>
                                                                <TextField
                                                                    {...params}
                                                                    label="Especialidad"
                                                                    InputProps={{
                                                                        ...params.InputProps,
                                                                        startAdornment: (
                                                                            <InputAdornment position="start">
                                                                                <VolunteerActivismIcon sx={{ color: "#28c4ac" }} />
                                                                            </InputAdornment>
                                                                        )
                                                                    }}
                                                                    fullWidth
                                                                />
                                                            </div>
                                                        )}
                                                    />
                                                </FormControl>

                                            </Grid>
                                            <Grid item xs={12}>
                                            <Typography>Cargar Documentos</Typography>
                                                <Divider />
                                                </Grid>


                                            <Grid container direction="row" >
                                                <Grid container item xs={6} md={6} >
                                                    <Grid container item alignItems='center' >
                                                        <Grid item xs={2}>
                                                            <IconButton aria-label="AddAPhotoIcon" size="large">
                                                                <AddAPhotoIcon sx={{ color: "#28c4ac" }} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton aria-label="PictureAsPdfIcon" size="large">
                                                                <PictureAsPdfIcon sx={{ color: "#28c4ac" }} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={8} >
                                                            <Button
                                                            fullWidth
                                                                variant='outlined'
                                                                size='small' >
                                                                 DNI
                                                            </Button>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container item alignItems='center' >
                                                        <Grid item xs={2}>
                                                            <IconButton aria-label="AddAPhotoIcon" size="large">
                                                                <AddAPhotoIcon sx={{ color: "#28c4ac" }} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton aria-label="PictureAsPdfIcon" size="large">
                                                                <PictureAsPdfIcon sx={{ color: "#28c4ac" }} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={8} >
                                                            <Button
                                                            fullWidth
                                                                variant='outlined'
                                                                size='small' >
                                                                 Titulo de Trabajo
                                                            </Button>
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container item alignItems='center' >
                                                        <Grid item xs={2}>
                                                            <IconButton aria-label="AddAPhotoIcon" size="large">
                                                                <AddAPhotoIcon sx={{ color: "#28c4ac" }} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <IconButton aria-label="PictureAsPdfIcon" size="large">
                                                                <PictureAsPdfIcon sx={{ color: "#28c4ac" }} />
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item xs={8} >
                                                            <Button
                                                            fullWidth
                                                                variant='outlined'
                                                                size='small' >
                                                                 Curriculum
                                                            </Button>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                {/*  <Grid item xs={12} md={6} alignItems='center'>
                                                    <IconButton aria-label="AddAPhotoIcon" size="large">
                                                        <AddAPhotoIcon sx={{ color: "#28c4ac" }} />
                                                        <Typography>{valueFoto}</Typography>
                                                    </IconButton>
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <IconButton aria-label="PictureAsPdfIcon" size="large">
                                                        <PictureAsPdfIcon sx={{ color: "#28c4ac" }} />
                                                        <Typography>{valuePDF}</Typography>
                                                    </IconButton>
                                                </Grid>*/}
                                                    <Grid container item xs={6} md={6} >
                                                        <Grid container item  >
                                                        </Grid>
                                                    </Grid>

                                            </Grid>




                                            <Grid container>
                                                <Grid item xs={11} md={11}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        className='btn-register'
                                                    // onClick={handleSubmit}
                                                    >
                                                        Registrarse
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </ThemeProvider>
    );

}
