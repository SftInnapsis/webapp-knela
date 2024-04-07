import { ConfirmDialog } from "@/components/common/DialogConfirm";
import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { doctorService } from "@/service/services/Doctor.service";
import { Button, Card, CardActions, CardContent, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArchiveIcon from '@mui/icons-material/Archive';
import { Link, useHistory } from "react-router-dom";
import { ROUTE_DETAIL_DOCTORES_INDEPENDIENTES, ROUTE_DOCTORES_INDEPENDIENTES, ROUTE_HOME } from "@/toolbox/constants/route-map";
import { API_URL_BASE } from "@/toolbox/defaults/app";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Snackbar, Alert} from '@mui/material';

export const DetailDoctorIndp = (props) => {
   let history = useHistory();

   const value_dr = props.location.state.data;
   // // if(!value_dr)
   // {
   //    console.log(value_dr)
   //    history.push(ROUTE_HOME);
   // }
   console.log(value_dr);
   const [data, setData] = useState<any>([]);
   const [actionSelect, setActionSelect] = useState<any>('');
   const [open, setOpen] = useState<boolean>(false);
   const [Dialog, setDialog] = useState<any>({
      open: false,
      title: 'Deshabilitar',
      confirm: false,
      id: null,
      message: `¿Desea eliminar al contacto --- con Rut ----?`
   })
   const {id, iddoctor, action, curriculum, dni,date_birth, front_photo, iduser, address,job_tittle, last_name, mail, name, rut, side_photo,specialty,userRut, status_validation }= value_dr;
   const [status, setStatus] = useState<any>(value_dr.status_validation)
   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })


   const getDataDoctorIndependiente = async () => {
      const resp = await doctorService.getDoctorIndependientePage();
      if (resp.data) {
         setData(resp.data);
      }
   }

   const RecuperarData = async (data) => {
      const { action, id, name } = data;
      setActionSelect(action)
      console.log(action)
      switch (action) {
         case 'Aceptar':
            //  setData(data);
            setDialog(prev => ({ ...prev, message: `¿Desea activar al Doctor ${name}?`, id: id, open: true, confirm: true }));
            break;
         case 'delete':
            setDialog(prev => ({ ...prev, message: `¿Desea desactivar al Doctor ${name}?`, id: id, open: true, confirm: true }));
            break;
         case 'view':
            history.push(ROUTE_DETAIL_DOCTORES_INDEPENDIENTES, { data: data });
            break;
         default:
            break;
      }
   }

   const Delete = async () => {
      try {
         if (Dialog.confirm == true) {
            console.log('eliminado')
         }
      } catch (e) {
         console.log(e)
      }
   }

   const AceptOrDenied = async(status) =>{
      const respAcept = await doctorService.aceptOrDeniedDoctorIndependent(iddoctor, status)
      setSnackBarConfig({...snackBarConfig, open:true,
              severity:respAcept.data.status ? 'success': 'error',
              message: respAcept.data.status ? 'Actualizado con éxito':'Ocurrio un problema'})
      respAcept.data.status && setStatus(status)
   }
   // useEffect(() => {
   //    // getDataDoctorIndependiente()
   //    console.log(value_dr)


   // }, [])

   console.log(data)

   return (
      <Protected>
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
         <ConfirmDialog
            open={Dialog.open}
            title={Dialog.title}
            message={Dialog.message}
            onConfirm={() => Delete()}
            onClose={() => setDialog(prev => ({ ...prev, open: false }))}
         />
         <Grid item xs={12} md={3} mt={2}>
            <Link to={ROUTE_DOCTORES_INDEPENDIENTES} className="link__css">
               <Typography
                  variant="h6"
                  gutterBottom
                  className="link__css-back">
                  <ArrowBackIosIcon className="icon_back" />
                  Volver
               </Typography>
            </Link>
         </Grid>
         <Grid container direction={'row'} justifyContent='center' xs={12} >
            <Grid item container spacing={2} xs={7} sx={{ m: 1, p: 2, height: '100%' }}>
               <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        DATOS PERSONALES
                     </Typography>
                     <Grid item container direction={'row'} justifyContent='space-between' sx={{ p: 2 }}>
                        <Typography variant="h6" component="div">
                         {`  DR. ${name} ${last_name}`}
                        </Typography>
                        <Grid>
                           {(status == "0" || status == "2") &&
                              <Button variant="outlined" sx={{ ml: 3, borderRadius: '10px' }} onClick={()=>{AceptOrDenied(1)}}>
                                 <Typography variant="inherit" component="div" >
                                    ACEPTAR
                                 </Typography>
                              </Button>}

                           {(status == "0" || status == "1") &&
                              <Button variant="outlined" sx={{ ml: 3, borderRadius: '10px' }} onClick={()=>{AceptOrDenied(2)}}>
                                 <Typography variant="inherit" component="div" >
                                    RECHAZAR
                                 </Typography>
                              </Button>
                           }
                        </Grid>
                     </Grid>
                     <Grid item container direction={'row'} spacing={2} sx={{ p: 2 }}>
                        <Grid item xs={12} md={6}>
                           <FormControl fullWidth variant="outlined" >
                              Rut
                              <OutlinedInput
                                 required
                                 id="rut"
                                 placeholder={'Rut'}
                                 disabled
                                 value={rut}
                                 // onChange={onChange}
                                 name='rut'
                              />
                           </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControl fullWidth variant="outlined" >
                              Correo
                              <OutlinedInput
                                 required
                                 id="outlined-helperText"
                                 placeholder={'correo'}
                                 disabled
                                 name='mail'
                              // onChange={onChange}
                                value={mail}

                              />
                           </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                           <FormControl fullWidth variant="outlined" >
                              Fecha de Nacimiento
                              <OutlinedInput
                                 required
                                 fullWidth
                                 type="date"
                                 id="date_birth"
                                 value={date_birth}
                                 disabled
                                 placeholder={'Fecha de Nacimiento'}
                                 // onChange={onChange}
                                 name='date_birth'
                              />
                           </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                           <FormControl fullWidth variant="outlined" >
                              Especialidad
                              <OutlinedInput
                                 required
                                 id="especiality"
                                 disabled
                                 placeholder={'Especialidad'}
                                 name='especiality'
                              // onChange={onChange}
                                 value={specialty}

                              />
                           </FormControl>
                        </Grid>
                        <Grid item xs={12} md={12}>
                           <FormControl fullWidth variant="outlined" >
                              Dirección
                              <OutlinedInput
                                 required
                                 id="address"
                                 disabled
                                 placeholder={'Direccion'}
                                 name='address'
                              // onChange={onChange}
                              value={address}
                              />
                           </FormControl>
                        </Grid>

                     </Grid>
                  </CardContent>
                  {/* <CardActions>
                     <Button size="small">Learn More</Button>
                  </CardActions> */}
               </Card>
            </Grid>
            <Grid item xs={4} sx={{ m: 1, p: 2, height: '100%', }}>
               <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                     <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        ARCHIVOS ADJUNTOS
                     </Typography>
                     <Table >
                        <TableHead >
                           <TableRow >
                              <TableCell align='center'>Archivo</TableCell>
                              <TableCell align='center'>Nombre</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                       { dni &&   <TableRow >
                              <TableCell align='center' >
                              <IconButton  href={`${API_URL_BASE}/${dni}`} target="_blank">
                              <ArchiveIcon fontSize='large' sx={{ color: '#28C4AC' }} />
                           </IconButton>

                              </TableCell>
                              <TableCell align='center' >
                                 <p style={{ fontSize: '15px' }}>CARNET</p>
                              </TableCell>
                           </TableRow >}

                         {job_tittle &&  <TableRow >
                              <TableCell align='center' >
                              <IconButton  href={`${API_URL_BASE}/${job_tittle}`} target="_blank">
                                 <ArchiveIcon fontSize='large' sx={{ color: '#28C4AC' }} />
                                 </IconButton>
                              </TableCell>
                              <TableCell align='center' >
                                 <p style={{ fontSize: '15px' }}>JOB TITLE</p>
                              </TableCell>
                           </TableRow >}

                         { curriculum && <TableRow >
                              <TableCell align='center' >
                              <IconButton  href={`${API_URL_BASE}/${curriculum}`} target="_blank">
                                 <ArchiveIcon fontSize='large' sx={{ color: '#28C4AC' }} />
                                 </IconButton>
                              </TableCell>
                              <TableCell align='center' >
                                 <p style={{ fontSize: '15px' }}>CURRICULUM</p>
                              </TableCell>
                           </TableRow >}

                        </TableBody>
                     </Table>
                  </CardContent>
                  {/* <CardActions>
                           <Button size="small">Learn More</Button>
                        </CardActions> */}
               </Card>
            </Grid>

         </Grid>
      </Protected>

   );
}
