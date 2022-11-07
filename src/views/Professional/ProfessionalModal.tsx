import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Icon } from '@components/common/Icon';
import { Paper, Box, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Table, createTheme, ThemeProvider, Button } from '@mui/material';
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


type ModalProps = {
   open: boolean,
   setOpen: any,
   actionSelect?: string,
   recoveryData?: any,
   saveProfessional?: ({ }) => void,
   editProfessional?: ({ }) => void,
}

export const ProfessionalModal: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
   const { open, setOpen, actionSelect, recoveryData, saveProfessional, editProfessional } = props
   const [error, setError] = useState<any>('')
   const [data, setData] = useState({
      name: '',
      last_name: '',
      rut: '',
      date_birth: '',
      mail: '',
      address: '',
      textError: '',
   });

   const [dataArea, setDataArea] = useState<any>([]);
   const [dataEspecialidad, setDataEspecialidad] = useState<any>([]);
   const [dataMedicalCenter, setDataMedicalCenter] = useState<any>([]);
   const [ubigeo, setUbigeo] = useState<any>({ pais: [], departamento: [], provincia: [], distrito: [] });

   const [idArea, setIdArea] = useState(null);
   const [idEspecialidad, setIdEspecialidad] = useState(null);

   const [medicalCenter, setMedicalCenter] = useState(null);
   const [idpais, setIdPais] = useState(null);
   const [iddepartamento, setIdDepartamento] = useState(null);
   const [idprovincia, setIdProvincia] = useState(null);
   const [iddistrito, setIdDistrito] = useState(null);

   const user_data = readLocalStorage(KEY_USER_DATA);
   const role = user_data?.user.role;

   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })


   const handleInput = (event: any) => {
      const name_input = event.target.name;
      const value = event.target.value;
      switch (name_input) {
         case 'name':
            setData(prev => ({ ...prev, name: value, textError: '' }));
            break;
         case 'last_name':
            setData(prev => ({ ...prev, last_name: value, textError: '' }));
         break;
         case 'rut':
            // setData(prev => ({ ...prev, rut: value, textError: '' }));
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
               setData(prev => ({ ...prev, rut: foo }))
            } else if (foo.length == 0) {
               setData(prev => ({ ...prev, rut: "" }))
            }

            break;
         case 'date_birth':
            setData(prev => ({ ...prev, date_birth: value, textError: '' }));
            break;
         case 'mail':
            setData(prev => ({ ...prev, mail: value, textError: '' }));
            break;
         case 'address':
            setData(prev => ({ ...prev, address: value, textError: '' }));
            break;
         default:
            break;
      }
   };

   const dataInitial = async () => {
      const res: any = await professionalService.getProfessionalDataInitial();
      setDataEspecialidad(res.data.Specialty)
      setDataMedicalCenter(res.data.MedicalCenter)
      setDataArea(res.data.Area)
      if(role == ROLE_ADMIN){
         console.log(res.data.MedicalCenter)
         const idMedicalCenter = readLocalStorage(KEY_MEDICAL_CENTER)
         console.log(idMedicalCenter)
         const objMedicalCenter = res.data.MedicalCenter.find(value=> value.id == idMedicalCenter)
         setMedicalCenter(objMedicalCenter)
         const objSpeciality = res.data.Specialty.filter(value => value.idmedical_center == idMedicalCenter)
         setDataEspecialidad(objSpeciality)
         const objArea = res.data.Area.filter(value => value.idmedical_center == idMedicalCenter)
         setDataArea(objArea)
      }
   }

   const onSelectPais = (pais) => {
      if (pais) {
         if (pais.id != null || pais.id != idpais.id) {
            setIdDepartamento(null)
            setUbigeo(prev => ({ ...prev, departamento: [], provincia: [], distrito: [] }));
            setIdProvincia(null)
            setIdDistrito(null)
         }
         setIdPais(pais)
      }
   }
   const onSelectDepartamento = (departamento) => {
      if (departamento) {
         if (departamento.id != null || departamento.id != iddepartamento.id) {
            setUbigeo(prev => ({ ...prev, provincia: [], distrito: [] }));
            setIdProvincia(null)
            setIdDistrito(null)
         }
         setIdDepartamento(departamento)
      }
   }
   const onSelectProvincia = (provincia) => {
      if (provincia) {
         if (provincia.id != null || provincia.id != idprovincia.id) {
            setUbigeo(prev => ({ ...prev, distrito: [] }));
            setIdDistrito(null)
         }
         setIdProvincia(provincia)
      }
   }
   const onSelectDistrito = (iddistrito_s) => {
      if (iddistrito_s) {
         setIdDistrito(iddistrito_s)
      }
   }

   async function getPais() {
      const resp = await ubigeoService.getCountry();
      setUbigeo(prev => ({ ...prev, pais: resp.data }));
   }
   async function getDepartamento(idPais: number) {
      const resp = await ubigeoService.getDepartament(idPais);
      console.log(resp);
      setUbigeo(prev => ({ ...prev, departamento: resp.data }));
   }
   async function getProvincia(iddepartament: number) {
      const resp = await ubigeoService.getProvince(iddepartament);
      setUbigeo(prev => ({ ...prev, provincia: resp.data }));
   }
   async function getDistrito(idprovincia: number) {
      const resp = await ubigeoService.getDistrict(idprovincia);
      setUbigeo(prev => ({ ...prev, distrito: resp.data }));
   }

   async function getAutocomplete(id_centro_medico: number, id_especialidad: number, id_area: number) {
      const res: any = await professionalService.getProfessionalDataInitial();
      const resp = await areaService.getDataAreaByMedicalCenter(id_centro_medico);
      setDataArea(resp.data);
      const medicalCenter = res.data.MedicalCenter.find((value) => value.id == id_centro_medico);
      setMedicalCenter(medicalCenter);
      setIdEspecialidad(res.data.Specialty.find((value) => value.id == id_especialidad))
      setIdArea(resp.data.find((value) => value.id == id_area));
   }

   async function getArea(id_centro_medico: number) {
      const resp = await areaService.getDataAreaByMedicalCenter(id_centro_medico);
      setDataArea(resp.data);
   }

   async function getUbigeo(id_district, id_province, id_department, idPais, idmedical_center, idspecialty, id_area) {
      const resp_ubigeo = await ubigeoService.getDistrictUbigeo(id_district, id_province, id_department, idPais)
      console.log(resp_ubigeo)
      setUbigeo({ pais: resp_ubigeo.data.countries, departamento: resp_ubigeo.data.departments, provincia: resp_ubigeo.data.provincies, distrito: resp_ubigeo.data.districts })
      setIdPais(resp_ubigeo.data.country);
      setIdDepartamento(resp_ubigeo.data.department);
      setIdProvincia(resp_ubigeo.data.province)
      setIdDistrito(resp_ubigeo.data.district)
      getAutocomplete(idmedical_center, idspecialty, id_area);
   }

   const ValidateEmail = (mail) =>{
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }else{
          return false
      }
  }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
   
      const { name, last_name, rut, date_birth, mail, address } = data;
      if (data.name === '') { return setError('name') }
      if (data.name.length >= 100) {return setError('name_limit')}
      if (data.last_name === '') { return setError('last_name') }
      if (data.last_name.length >= 100) { return setError('last_name_limit') }
      if (data.rut === '') { return setError('rut') }
      if (data.date_birth === '') { return setError('date_birth') }
      if (data.mail === '') { return setError('mail') }
      let validate = ValidateEmail(data.mail)
      if(!validate){return setError('mail_invalid') }
      if (data.address === '') { return setError('address') }
      if (data.address.length >= 100) { return setError('address_limit') }
      if (idArea.name === '') { return setError('idArea') }
      if (idEspecialidad.name === '') { return setError('idEspecialidad') }

      let bodyRequest = {};
      if(role == ROLE_ADMIN){
         bodyRequest = {
            ...data,
            idarea: idArea.id,
            idspecialty: idEspecialidad.id,
            iddistrict: iddistrito.id,
            medical_center: readLocalStorage(KEY_MEDICAL_CENTER)
         }
      }else{
         bodyRequest = {
            ...data,
            idarea: idArea.id,
            idspecialty: idEspecialidad.id,
            iddistrict: iddistrito.id,
            medical_center: medicalCenter.id
         }
      }
       
      if (actionSelect == 'edit') {
         editProfessional(bodyRequest)

      }
      if (actionSelect == 'save') {
         saveProfessional(bodyRequest)
      }
   }

   useEffect(() => {
     // console.log(open)
      if (open) {
         dataInitial();
         getPais();
         if (actionSelect == 'edit') {
            const { iddistrict, idprovince, iddepartment, idcountry, idmedical_center, idspecialty, idarea } = recoveryData;
            setData(recoveryData);
            getUbigeo(iddistrict, idprovince, iddepartment, idcountry, idmedical_center, idspecialty, idarea)
         }
      }
   }, [open])

   const LimpiarFormulario = () => {
      // setIdArea(null)
      // setIdEspecialidad(null)
      // setMedicalCenter(null)
      // setIdPais(null)
      // setIdDepartamento(null)
      // setIdProvincia(null)
      // setIdDistrito(null)
      setOpen(false)
   }


   const bodyModal = (
      <div>
         <form onSubmit={handleSubmit} >
            <Grid container direction="row" spacing={2}>
               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="name"
                     placeholder="Nombre*"
                     label="Nombre*"
                     sx={{ bgcolor: '#fff' }}
                     name="name"
                     type="text"
                     required
                     value={data.name}
                     onChange={handleInput}
                     error={error=='name' || error=='name_limit'? true:false}
                     helperText={error=='name'? 'Campo requerido': error=='name_limit' ? 'Número máximo de caracteres es 100':''}
                  />
               </Grid>
               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="last_name"
                     placeholder="Apellido*"
                     label="Apellido*"
                     sx={{ bgcolor: '#fff' }}
                     name="last_name"
                     required
                     type="text"
                     value={data.last_name}
                     onChange={handleInput}
                     error={error=='last_name' || error=='last_name_limit'? true:false}
                     helperText={error=='last_name'? 'Campo requerido': error=='last_name_limit' ? 'Número máximo de caracteres es 100':''}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <TextField
                     fullWidth
                     size="small"
                     id="rut"
                     placeholder="Rut*"
                     label="Rut*"
                     sx={{ bgcolor: '#fff' }}
                     name="rut"
                     type="text"
                     required
                     value={data.rut}
                     onChange={handleInput}
                     error={error=='rut' ? true:false}
                     helperText={error=='rut'? 'Campo requerido': ''}
                 
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <TextField
                     fullWidth
                     size="small"
                     id="date_birth"
                     placeholder="Fecha Nacimiento*"
                     sx={{ bgcolor: '#fff' }}
                     name="date_birth"
                     type="date"
                     required
                     value={data.date_birth}
                     onChange={handleInput}
                     error={error=='date_birth' ? true:false}
                     helperText={error=='date_birth'? 'Campo requerido': ''}
                  />
               </Grid>
               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="mail"
                     placeholder="Correo*"
                     error={error == 'mail' || error == 'mail_limit'? true : false}
                     helperText={error == 'mail' ? 'Campo es obligatorio' : error == 'mail_limit'?'Número máximo de caracteres es 100':''}
                     sx={{ bgcolor: '#fff' }}
                     name="mail"
                     type="text"
                     required
                     value={data.mail}
                     onChange={handleInput}
                  />
               </Grid>

               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="address"
                     placeholder="Direccion*"
                     sx={{ bgcolor: '#fff' }}
                     name="address"
                     type="text"
                     required
                     value={data.address}
                     onChange={handleInput}
                  />
               </Grid>
              { role == ROLE_SUPER_ADMIN && <Grid item xs={12} md={6} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={medicalCenter}
                     onChange={(e, data: any) => {
                        console.log(data);
                        data && getArea(data.id);
                        setMedicalCenter(data)
                     }}
                     id="medical_center"
                     options={dataMedicalCenter}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} required label="Centro Médico" />}
                  />
               </Grid>}
               <Grid item xs={12} md={12} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={idArea}
                     onChange={(e, data: any) => {

                        data && setIdArea(data)
                     }}
                     id="idarea"
                     options={dataArea}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} error={error=='area'?true:false} helperText={error=='area'?'Campo requerido':''} label="Área" />}
                  />
               </Grid>
               <Grid item xs={12} md={12} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={idEspecialidad}
                     onChange={(e, data: any) => {
                        data && setIdEspecialidad(data)
                     }}
                     id="idspecialty"
                     options={dataEspecialidad}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params}  error={error=='area'?true:false} helperText={error=='area'?'Campo requerido':''}  label="Especialidad" />}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={idpais}
                     onChange={(e, data: any) => {
                        console.log(data);
                        data && getDepartamento(data.id);
                        onSelectPais(data)
                     }}
                     id="idcountry"
                     options={ubigeo.pais}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} required label="Pais" />}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={iddepartamento}
                     onChange={(e, data: any) => {
                        data && getProvincia(data.id);
                        onSelectDepartamento(data)
                     }}
                     id="department"
                     options={ubigeo.departamento}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} required label="Departamento" />}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={idprovincia}
                     onChange={(e, data: any) => {
                        data && getDistrito(data.id);
                        onSelectProvincia(data)
                     }}
                     id="idProvince"
                     options={ubigeo.provincia}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} required label="Provincia" />}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={iddistrito}
                     onChange={(e, data: any) => {
                        data && onSelectDistrito(data)
                     }}
                     id="iddistrict"
                     options={ubigeo.distrito}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} required label="Distrito" />}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <Button
                     onClick={() => { setOpen(false) }}
                     variant="contained"
                     fullWidth
                     color="error"
                     startIcon={<CancelIcon />}
                     sx={{ background: '#FFBB34', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}>
                     Cancelar
                  </Button>
               </Grid>
               <Grid item xs={12} md={6} >
                  <Button
                     type="submit"
                     variant="contained"
                     fullWidth
                     startIcon={<SaveIcon />}
                     sx={{ background: '#3D8BD9', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#155172' } }}>
                      {actionSelect == 'edit' ? 'Editar' :'Agregar'}
                  </Button>
               </Grid>
            </Grid>
         </form>
      </div>
   )

   return (
      <div>
         <Modal
            open={open}
            onClose={() => { setOpen(false) }}>
            <div className='Modal'>
               <div className='Title'>
                  <Typography variant='h5' fontWeight={700} >
                  {actionSelect == 'edit' ?'EDITAR PROFESIONAL' :'NUEVO PROFESIONAL'}
                  </Typography>
               </div>
               <div className='Body'>
                  {bodyModal}
               </div>
            </div>
         </Modal>
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
      </div>
   );
}
