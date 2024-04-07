
import { Props } from './register.type'
import { FunctionComponent, useMemo, useEffect, useRef, useState } from "react";
import { Button, InputAdornment, IconButton, Grid, CircularProgress, Snackbar, Alert, FormControl, TextField, OutlinedInput, InputLabel, MenuItem, Select, Autocomplete, Chip, Stack } from '@mui/material';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FaceIcon from '@mui/icons-material/Face';
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
import DescriptionIcon from '@mui/icons-material/Description';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { ID_AMBULATORIO } from '@/toolbox/defaults/app';

const theme = createTheme();

export const RegisterView: React.FC<Props> = (props: any): JSX.Element => {

   const [data, setData] = useState({
      name: '',
      last_name: '',
      rut: '',
      date_birth: '',
      address: '',
      mail: '',
      especiality: '',
      textError: ''
   });

   const [error, setError] = useState('');
   const [fileDni, setFileDni] = useState<any>({});
   const [fileJob, setFileJob] = useState<any>({});
   const [fileCv, setFileCv] = useState<any>({});

   const limpiarData = () => {
      setData({
         name: '',
         last_name: '',
         rut: '',
         date_birth: '',
         address: '',
         mail: '',
         especiality: '',
         textError: ''
      })
      setFileDni({});
      setFileJob({});
      setFileCv({});
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         console.log('data', data);
         const { name, last_name, rut, date_birth, address, mail, especiality} = data;
         if (data.last_name === '') { return setError('last_name') }
         /*if (data.name === ''){return setError('name')}
         if (data.rut === '') { return setError('rut') }
         if (data.date_birth === '') { return setError('date_birth') }
         if (data.mail === '') { return setError('mail') }
         if (data.address === '') { return setError('address') }
         if (idMedicalCenter.name === '') { return setError('idMedicalCenter') }
         if (idDistrict.name === '') { return setError('idDistrict') }
         if (idArea.name === '') { return setError('idArea') }
         if (idEspeciality.name === '') { return setError('idEspeciality') }*/
         //const { name, last_name, rut, date_birth, mail, address, area, district, especiality } = data
         // const req = await doctorService.createDoctorIndependiente(data)
         // console.log('respuesta', req)

         const FormValue = new FormData();
         FormValue.append("medical_center",ID_AMBULATORIO)
         FormValue.append("name", name)
         FormValue.append("last_name", last_name)
         FormValue.append("rut",rut)
         FormValue.append("specialty",especiality)
         FormValue.append("mail",mail)
         FormValue.append("date_birth",date_birth)
         FormValue.append("address",address)
         FormValue.append("observations",'')
         FormValue.append("dni", fileDni ? fileDni.name  && fileDni: null)
         FormValue.append("job_tittle", fileJob && fileJob.name? fileJob : null)
         FormValue.append("curriculum", fileCv && fileCv.name ? fileCv : null)
         const res = await doctorService.createDoctorIndependiente(FormValue)
         if(res && res.data)
         {
            // setSnack
         }
         limpiarData();

      }
      catch (e) {
         console.log(e);
      }

   }

   const onChange = (e) => {
      const injectData = {
         ...data,
         [e.target.name]: e.target.value
      }
      setData(injectData)
   }

   const processImageCarnet  = async(event) => {
      if (event && event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         const fileUrl = URL.createObjectURL(file);
         console.log(file);
         setFileDni(file);
      }
   }

   const processImageJobTitle  = async(event) => {
      if (event && event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         const fileUrl = URL.createObjectURL(file);
         setFileJob(file);
      }
   }

   const processImageCV  = async(event) => {
      if (event && event.target.files && event.target.files.length > 0) {
         const file = event.target.files[0];
         const fileUrl = URL.createObjectURL(file);
         setFileCv(file);
      }
   }

   // useEffect(() => {
   // }, [])

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
                                          required
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
                                       <TextField

                                          id="last_name"
                                          placeholder={'Apellidos'}
                                          value={data.last_name}
                                          onChange={onChange}
                                          name='last_name'
                                          error={error == "last_name" ? true : false}
                                          helperText={error == "last_name" ? "Campo requerido" : ""}
                                       // startAdornment={
                                       //     <InputAdornment position='start'>
                                       //         <PersonIcon sx={{ color: "#28c4ac" }} />
                                       // </InputAdornment>}
                                       />
                                    </FormControl>
                                 </Grid>


                                 <Grid item xs={12} md={6}>
                                    <FormControl fullWidth variant="outlined" >
                                       <OutlinedInput
                                          required
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
                                       required
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
                                          required
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
                                          required
                                          id="especiality"
                                          placeholder={'Especialidad'}
                                          name='especiality'
                                          onChange={onChange}
                                          value={data.especiality}
                                          startAdornment={
                                             <InputAdornment position='start'>
                                                <HomeIcon sx={{ color: "#28c4ac" }} />
                                             </InputAdornment>}
                                       />
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={12} md={12}>
                                    <FormControl fullWidth variant="outlined" >
                                       <OutlinedInput
                                          required
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

                                 {/* <Grid mb={1} item xs={6}>
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
                                 </Grid> */}

                                 {/* <Grid mb={1} item xs={6}>
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
                                 </Grid> */}

                                 {/* <Grid mb={1} item xs={6}>
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
                                 </Grid> */}
                                 <Grid item xs={12}>
                                    <Typography>Cargar Documentos (opcionales)</Typography>
                                    <Divider />
                                 </Grid>
                                 <Grid container direction="row"
                                    sx={{
                                       mt: '10px',
                                       ml: '40px',
                                       width: '100%'
                                    }}>
                                    <Grid container item >
                                       <Grid container item alignItems='center' >
                                          <ul>
                                             <li>
                                             <Grid item xs={12} container direction={'row'} alignItems={'center'}>
                                                  <Grid>
                                                   <input style={{ display: 'none' }} id="dni" type="file" onChange={processImageCarnet} accept="image/*" />
                                                   <label htmlFor="dni">
                                                      <IconButton
                                                         component="span"
                                                         sx={{ p: "10px" }}>
                                                         <AssignmentIndIcon sx={{ color: "#28c4ac" }} />
                                                      </IconButton>
                                                      DNI
                                                   </label>
                                                </Grid>
                                                   {fileDni && fileDni.name && <Grid>
                                                  <Stack sx={{ml:3}} direction="row" spacing={1}>
                                                      <Chip label={fileDni.name} color="primary" />
                                                      <Chip label="X" color="error" onClick={()=>{setFileDni({})}} />
                                                   </Stack>
                                                  </Grid>}
                                                </Grid>
                                             </li>
                                             <li>
                                             <Grid item xs={12} container direction={'row'} alignItems={'center'}>
                                                  <Grid>
                                                   <input style={{ display: 'none' }} id="job_tittle" type="file" onChange={processImageJobTitle} accept="image/*" />
                                                   <label htmlFor="job_tittle">
                                                      <IconButton
                                                         component="span"
                                                         sx={{ p: "10px" }}>
                                                         <CreateNewFolderIcon sx={{ color: "#28c4ac" }} />
                                                      </IconButton>
                                                      JOB TITLE
                                                   </label>
                                                   </Grid>
                                                   {fileJob && fileJob.name && <Grid>
                                                  <Stack sx={{ml:3}} direction="row" spacing={1}>
                                                      <Chip label={fileJob.name} color="primary" />
                                                      <Chip label="X" color="error" onClick={()=>{setFileJob({})}}/>
                                                   </Stack>
                                                  </Grid>}
                                                </Grid>
                                             </li>
                                             <li>
                                                <Grid item xs={12} container direction={'row'} alignItems={'center'}>
                                                  <Grid>
                                                  <input style={{ display: 'none' }} id="curriculum" type="file" onChange={processImageCV} accept="image/*" />
                                                   <label htmlFor="curriculum">
                                                    <IconButton
                                                         component="span"
                                                         sx={{ p: "10px" }}>
                                                         <DescriptionIcon sx={{ color: "#28c4ac" }} />
                                                      </IconButton>
                                                      CURRICULUM
                                                   </label>
                                                  </Grid>
                                                 {fileCv && fileCv.name && <Grid>
                                                  <Stack sx={{ml:3}} direction="row" spacing={1}>
                                                      <Chip label={fileCv.name} color="primary" />
                                                      <Chip label="X" color="error" onClick={()=>{setFileCv({})}}/>
                                                   </Stack>
                                                  </Grid>}
                                                </Grid>
                                             </li>
                                          </ul>
                                       </Grid>
                                    </Grid>
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
                                          onClick={() => { handleSubmit }}
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
