import { FunctionComponent, useMemo, useEffect, useRef, useState } from "react";
import { Button, InputAdornment, IconButton, Grid, CircularProgress, Snackbar, Alert, FormControl, OutlinedInput, InputLabel, MenuItem, Select } from '@mui/material';
import { VALIDATORS } from '@toolbox/helpers/validation-rules';
import { Icon } from '@components/common/Icon';
import { Input } from '@components/common/Input';
import { InputRef } from '@components/common/Input/InputInterfaces';
import { Loading } from "@components/common/Loading";
import "./Login.css";
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/images/logoknela.png';
import logoLogin from "@assets/img/logo-login.jpg";
import { VisibilityIcon, VisibilityOffIcon } from '@toolbox/constants/icons';
import * as qs from 'qs'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ROUTE_ENTITY, ROUTE_HOME, ROUTE_LOGIN } from "@/toolbox/constants/route-map";
// import  logo from "@assets/svg/s-c-g-logo.svg";
import { authenticationService } from '@service/services/Authentication.service';
import { Link, Redirect, useHistory } from 'react-router-dom'
import { green } from '@mui/material/colors';
import { Props } from './login.type'
import LockIcon from '@mui/icons-material/Lock';
import { authenticationSoftnetService } from "@/service/api/services/AuthentificacionSoftnet.service";
// import { RecoverymailService } from "@/service/services/Recovery.service";
// import { notifyService } from "@/service/services/Notify.service";
// import { bypassService } from "@/service/services/Bypass.service";
import { KEY_BYPASS, KEY_TOKEN_KYTE, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { ROLE_ADMIN, ROLE_ADMIN_PROYECCION,  ROLE_PACIENTE,  ROLE_SUPER_ADMIN, ROLE_TRABAJADOR } from "@/toolbox/defaults/static-roles";
// import firebase from '@/config/firebase';
import Pusher from "pusher-js"
import Echo from 'laravel-echo'
import { Toaster, toast } from 'react-hot-toast';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const theme = createTheme();


// declare global {
//    interface Window { Pusher: any; Echo:any }
// }
// declare const window: WWindow &
//    typeof globalThis & {
//       Pusher: any,
//       Echo:any
//    }

// window['Pusher'] = require('pusher-js');

export const LoginView: React.FC<Props> = (props: any): JSX.Element => {
   const history = useHistory();
   const inputRefs = useRef<Array<InputRef | null>>([]);
   const [loadData, setLoadData] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false)
   const [tokenNotify, setTokenNotify] = useState<any>();
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState({
      rut: '',
      password: '',
      perfil: null,
      textError: '',
      showPassword: false
   });
   const name = props.location.pathname.split("/")[2];
   // const msg = firebase.messaging();
   console.log(name);
   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })
   const [verify, setVerify] = useState(false);

   // const ruta = props.location.search + '.';
   // const { rut, usuario, password } = props.location && qs.parse(ruta.slice(1, -1));
   const validateType = () => {
      switch (name) {
         case 'doctor':
            setData(prev => ({ ...prev, perfil: 4 }));
            break;
         case 'paciente':
            setData(prev => ({ ...prev, perfil: 5 }));
            break;
         case 'tutor':
            setData(prev => ({ ...prev, perfil: 6 }));
            break;
         default:
            setData(prev => ({ ...prev, perfil: 4 }));
            history.push(`/login/tutor`);
      }
   }
   useEffect(() => {
   validateType()
      // if (rut && usuario && password) {
      //    var decodeRut;
      //    var decodeUser;
      //    var decodePassword;

      //    try {
      //       decodeRut = atob(rut);
      //       decodeUser = atob(usuario);
      //       decodePassword = atob(password);
      //       authSubmit(decodeRut, decodePassword);
      //    } catch (error) {
      //    }
      // } 
   }, []);

   const rules = useMemo(() => ({
      user_nick: [
         VALIDATORS.REQUIRED,
         VALIDATORS.ONLY_LOWERCASE,
      ],
      password: [
         VALIDATORS.REQUIRED,
         VALIDATORS.PASSWORD.SIZE,
         VALIDATORS.PASSWORD.ALLOWED_CHARACTERS,
         VALIDATORS.PASSWORD.VALID,
      ],
      rut: [
         VALIDATORS.REQUIRED,
         // VALIDATORS.ONLY_LOWERCASE,
      ]
   }), []);

   const validate = () => {
      const refs = inputRefs.current;
      const valid = refs.reduce((prev, ref) => {
         const isValid = ref && ref.validate(true) || false
         return prev && isValid;
      }, true);

      return valid;
   }

   const handleInput = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      console.log(value);
      switch (name) {
         case 'password':
            if (/^.{0,15}$/.test(value)) {
               setData(prev => ({ ...prev, password: value, textError: '' }));
            }
            break;
         case 'perfil':
            setData(prev => ({ ...prev, perfil: value, textError: '' }));
            break;
         case 'rut':
            setVerify(false)
            var Fn = {
               // Valida el rut con su cadena completa "XXXXXXXX-X"
               validaRut: function (rutCompleto) {
                  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                     return false;
                  var tmp = rutCompleto.split('-');
                  var digv = tmp[1];
                  var rut = tmp[0];
                  if (digv == 'K') digv = 'k';
                  return (Fn.dv(rut) == digv);
               },
               dv: function (T) {
                  var M = 0, S = 1;
                  for (; T; T = Math.floor(T / 10))
                     S = (S + T % 10 * (9 - M++ % 6)) % 11;
                  return S ? S - 1 : 'k';
               }
            }

            var foo = value.split("-").join("")
            if (foo.length > 0 && foo.length < 10) {
               foo = foo.match(new RegExp('.{1,8}', 'g')).join("-");
               setData(prev => ({ ...prev, rut: foo, textError: '' }))
            } else if (foo.length == 0) {
               setData(prev => ({ ...prev, rut: "", textError: '' }))
            }

            break;
         default:
            break;
      }
   };

   const handleInputBlur = (event: any) => {
      const newVal = (event.target.value).trim();
      const name = event.target.name;
      setData(prev => ({ ...prev, [name]: newVal }));
   }

   const handleSubmit = (event: React.SyntheticEvent) => {
      event.preventDefault();

      const { rut, password, perfil } = data;
      try {
         if (validate()) {
            authSubmit(rut, password, perfil);
         }
      } catch (error) {
         setData(prev => ({ ...prev, textError: 'Lo sentimos, ocurrió un error inesperado.' }));
      } finally {

      }
   }

   const authSubmit = async (rut, password, perfil) => {
      setLoading(true);
      const response = await authenticationService.login(rut, password, perfil);
      if (response.data?.token == '') {
         setSnackBarConfig(prev => ({
            ...prev,
            open: true,
            message: response.data.message,
         }));
      } else {
         const data = readLocalStorage(KEY_USER_DATA)
         if (data.user.role == ROLE_SUPER_ADMIN) {
            history.push(ROUTE_HOME);
         }
         if (data.user.role == ROLE_ADMIN) {
            history.push(ROUTE_HOME)
         }
         if (data.user.role == ROLE_PACIENTE) {
            history.push(ROUTE_HOME)
         }

         // props.$action.actionSetListNotification(2)
         // if (data) {
         //    window['Echo'] = new Echo({
         //       broadcaster: 'pusher',
         //       key: 'crm_key',
         //       wsHost: window.location.hostname,
         //       wsPort: 6002,
         //       cluster: 'mt1',
         //       wssPort: 6002,
         //       disableStats: true,
         //       forceTLS: false,
         //       enabledTransports: ['ws', 'wss'],
         //       authEndpoint: `${process.env.REACT_APP_API_URL}/api/broadcasting/auth`,
         //       auth: {
         //          headers: {
         //             Accept: 'application/json',
         //             Authorization: `${readLocalStorage(KEY_TOKEN_KYTE)}`
         //          }
         //       },
         //    });
         // }
      }

      setLoading(false);
   }
   const handleClickShowPassword = () => {
      setData({ ...data, showPassword: !data.showPassword });
   };
   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

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
                           <form onSubmit={handleSubmit} >
                              <Grid container >

                                 {/* <Grid mb={2} item xs={12}>
                                    <FormControl fullWidth variant="outlined" >
                                       <InputLabel id="demo-simple-select-label">perfil</InputLabel>
                                       <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          value={data.perfil}
                                          label="perfil"
                                          name='perfil'
                                          onChange={handleInput}
                                          // sx={{ color: "#28c4ac" }} 
                                          startAdornment={
                                             <InputAdornment position='start'>
                                                <AssignmentIndIcon sx={{ color: "#28c4ac" }} />
                                             </InputAdornment>
                                          }
                                       >
                                          <MenuItem value={4}>Doctor</MenuItem>
                                          <MenuItem value={5}>Paciente</MenuItem>
                                          <MenuItem value={6}>Tutor</MenuItem>
                                       </Select>
                                    </FormControl>
                                 </Grid> */}

                                 <Grid mb={2} item xs={12}>
                                    <FormControl fullWidth variant="outlined" >
                                       <OutlinedInput
                                          id="outlined-adornment-password"
                                          placeholder={'rut'}
                                          name='rut'
                                          value={data.rut}
                                          onChange={handleInput}
                                          onBlur={handleInputBlur}
                                          startAdornment={
                                             <InputAdornment position='start'>
                                                <PersonIcon sx={{ color: "#28c4ac" }} />
                                             </InputAdornment>}
                                       />
                                    </FormControl>
                                 </Grid>

                                 <Grid item xs={12} mb={2}>
                                    <FormControl fullWidth variant="outlined">

                                       <OutlinedInput
                                          id="outlined-adornment-password"
                                          type={data.showPassword ? 'text' : 'password'}
                                          value={data.password}
                                          placeholder={'contraseña'}
                                          name="password"
                                          onChange={handleInput}
                                          onBlur={handleInputBlur}
                                          startAdornment={
                                             <InputAdornment position='start'  >
                                                <LockIcon sx={{ color: "#28c4ac" }} />
                                             </InputAdornment>}
                                          endAdornment={
                                             <InputAdornment position="end">
                                                <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}
                                                   edge="end"
                                                   sx={{ color: "#28c4ac" }}
                                                >
                                                   {data.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                             </InputAdornment>

                                          }
                                       />
                                    </FormControl>
                                 </Grid>

                                 <Grid mb={2} container justifyContent='end'>
                                    <a className='forgot-password1' >
                                       ¿Olvidaste tu contraseña?
                                    </a>
                                 </Grid>

                                 <Grid container spacing={1} >
                                    <Grid item xs={12} md={12}>
                                       <Button
                                          type="submit"
                                          fullWidth
                                          variant="contained"
                                          className='btn-login'
                                          onClick={handleSubmit}
                                       >
                                          Iniciar sesión
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
      </ThemeProvider>
   )
}