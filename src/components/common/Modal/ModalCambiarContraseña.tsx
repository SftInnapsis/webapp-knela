import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Icon } from '@components/common/Icon';
import { Paper, Box, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
import { CancelIcon, SaveIcon } from "@toolbox/constants/icons";
import PersonIcon from '@mui/icons-material/Person';
import './Modal.css'
import './Modal.sass'
import EmailIcon from '@mui/icons-material/Email';
import { Input } from '../Input';
import { VALIDATORS } from '@/toolbox/helpers/validation-rules';
import { InputRef } from '../Input/InputInterfaces';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { authenticationRepository } from '@/service/repositories/Authentication.repository';
import { VisibilityIcon, VisibilityOffIcon } from '@toolbox/constants/icons';

type ModalProps = {
   open: boolean,
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCambiarContraseña: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
   //console.log(props.open)


   //const [error, setError] = useState(false)

   const dataInitial = {
         password:'',
         repit_password:'',
         new_password:'',
         textError: '',
         showPassword: false
      }

   const [openNew, setOpenNew] = useState<boolean>(false);
   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })
   const [verify, setVerify] = useState<boolean>(false);
   const [error, setError] = useState(null);
   const inputRefs = useRef<Array<InputRef | null>>([]);
   const [data, setData] = useState(dataInitial);




   const handleClickShowPassword = () => {
      setData({ ...data, showPassword: !data.showPassword });
   };

   const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
   };

   const rules = useMemo(() => ({
      email: [
         VALIDATORS.EMAIL.NAME_PONTS,
         VALIDATORS.EMAIL.POINTS_IN_A_ROW,
         VALIDATORS.EMAIL.NAME_SIZE,
         VALIDATORS.EMAIL.VALID,
      ],
      repit_password: [
         VALIDATORS.PASSWORD.EQUALS,
      ],
      new_password: [
         VALIDATORS.PASSWORD.SIZE
      ]
   }), []);

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      //console.log(value)
      switch (name) {
         case 'password':
            setVerify(false)
            setData(prev => ({ ...prev, password: value }));
               break;
         case 'new_password':
               setData(prev => ({ ...prev, new_password: value }));
               break;
         case 'repit_password':
               setData(prev => ({ ...prev, repit_password: value }));
                break;
            //setData(prev => ({ ...prev, email: value }));
         default:
               break;
      }
   }
   const handleInputBlur = (event: any) => {
      setVerify(false)
      const newVal = (event.target.value).trim();
      const name = event.target.name;
      setData(prev => ({ ...prev, [name]: newVal }));
   }
   const validate = () => {
      const refs = inputRefs.current;
      const valid = refs.reduce((prev, ref) => {
         const isValid = ref && ref.validate(true) || false
         return prev && isValid;
      }, true);
      return valid;
   }
   const handleSubmit = async(e) => {
      e.preventDefault();
      // if (validate()) {
      //    //console.log(data.email)
      // }

      if(data.new_password == data.repit_password && data.new_password!=''&& data.repit_password!=''){
         const resp = await authenticationRepository.changePassword(data.repit_password);

         if(resp.data){
            setSnackBarConfig(prev => ({ ...prev, open: true, severity:'info', message: 'Contraseña actualiza con Éxito' }))
         }else{
            setSnackBarConfig(prev => ({ ...prev, open: true, message: 'La contraseña ingresada es la misma a la anterior' }))
         }
         props.setOpen(false);
         setOpenNew(false)
         setData(dataInitial)
      }

   }

   const validatePassword = async(e) => {
      e.preventDefault();
   }

   return (
      <div>
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
         <Modal
            open={props.open}
            onClose={() => { props.setOpen(false)
            setData(dataInitial)
            setOpenNew(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={{
               position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '350px',
               bgcolor: 'background.paper', background: '#F5F5F5', borderRadius: 2, boxShadow: 24
            }}>
               <Box >
                  <div className="modal-header">
                     <PersonIcon />
                     <Typography style={{ fontSize: "18px", marginLeft: "5px" }}>Cambiar Contraseña</Typography>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <Grid className="modal-body">
                        <Grid
                           container
                           direction="row"
                           justifyContent="flex-end"
                           alignItems="center">
                           {/* <Grid xs={12}  >
                              <Typography className='modal-tittle' >La información será enviada a este correo electrónico</Typography>
                           </Grid> */}
                           <Grid container spacing={2} >
                              {openNew == true?(
                                   <>
                                   <Grid item xs={12}>
                                       <Input
                                             ref={ref => inputRefs.current[0] = ref}
                                             placeholder="Ingrese su nueva contraseña"
                                             type={data.showPassword ? 'text' : 'password'}
                                             height={35}
                                             prependInnerAdornment={
                                             <InputAdornment position="end">
                                             <VpnKeyIcon />
                                          </InputAdornment>
                                          }
                                          appendAdornment={
                                             <InputAdornment position="end">
                                                <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}
                                                >
                                                   {data.showPassword ? <Icon Svg={VisibilityIcon} /> : <Icon Svg={VisibilityOffIcon} />}
                                                </IconButton>
                                             </InputAdornment>
                                          }
                                             name="new_password"
                                             value={data.new_password}
                                             onChange={handleInputChange}
                                             onBlur={handleInputBlur}
                                             backgroundColor="#F3F3F3"
                                             // rules={rules.new_password}
                                             disableElevation
                                             validateOnBlur
                                             dense
                                          />
                                   </Grid>
                                   <Grid item xs={12}>
                                       <Input
                                             ref={ref => inputRefs.current[1] = ref}
                                             placeholder="Repita su nueva contraseña"
                                             type={data.showPassword ? 'text' : 'password'}
                                             height={35}
                                             prependInnerAdornment={
                                             <InputAdornment position="end">
                                             <VpnKeyIcon />
                                          </InputAdornment>
                                          }
                                          appendAdornment={
                                             <InputAdornment position="end">
                                                <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}
                                                >
                                                   {data.showPassword ? <Icon Svg={VisibilityIcon} /> : <Icon Svg={VisibilityOffIcon} />}
                                                </IconButton>
                                             </InputAdornment>
                                          }
                                             name="repit_password"
                                             value={data.repit_password}
                                             onChange={handleInputChange}
                                             onBlur={handleInputBlur}
                                             backgroundColor="#F3F3F3"
                                             rules={data.repit_password!==data.new_password?rules.repit_password:[]}
                                             disableElevation
                                             validateOnBlur
                                             dense
                                          />
                                   </Grid>
                                   </>
                              ):(
                                    <Grid item xs={12}>
                                       <Input
                                          ref={ref => inputRefs.current[2] = ref}
                                          placeholder="Ingrese su contraseña actual"
                                          type={data.showPassword ? 'text' : 'password'}
                                          height={35}
                                          prependInnerAdornment={
                                          <InputAdornment position="end">
                                          <VpnKeyIcon />
                                       </InputAdornment>
                                       }
                                          appendAdornment={
                                             <InputAdornment position="end">
                                                <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   onMouseDown={handleMouseDownPassword}
                                                >
                                                   {data.showPassword ? <Icon Svg={VisibilityIcon} /> : <Icon Svg={VisibilityOffIcon} />}
                                                </IconButton>
                                             </InputAdornment>
                                          }
                                          name="password"
                                          //placeholder="Email Contacto"
                                          value={data.password}
                                          onChange={handleInputChange}
                                          onBlur={handleInputBlur}
                                          backgroundColor="#F3F3F3"
                                          //rules={rules.email}
                                          disableElevation
                                          validateOnBlur
                                          dense
                                       />
                                       {verify?(<span style={{color:'red'}}>(*)La contraseña ingresada es incorrecta</span>):(<></>)}
                                    </Grid>
                              )}
                           </Grid>
                        </Grid>
                     </Grid>
                     <Divider style={{ marginBottom: "2vh" }} />
                     <Grid container direction='row' spacing={2} sx={{ mt: 0, mb: 1 }} justifyContent='flex-end' alignContent='center' >
                        <Button type={"button"} sx={{ borderRadius: '15px' }} size="small" onClick={()=>{setOpenNew(false)
                        setData(dataInitial)
                        props.setOpen(false)}}>
                           <span style={{ color: "gray" }}>Cancelar</span>
                        </Button>
                        <Grid xs={1} />
                        {openNew==true?(
                            <Button onClick={handleSubmit}sx={{ mr: 2, borderRadius: '15px', backgroundColor: "#1976D2", }} variant="contained" size="small" type='submit'>
                              Enviar
                           </Button>
                        ):(
                           <Button onClick={validatePassword}>
                              Siguiente
                           </Button>
                        )}

                     </Grid>
                  </form>
               </Box>
            </Box>

         </Modal>
      </div>
   );
}
