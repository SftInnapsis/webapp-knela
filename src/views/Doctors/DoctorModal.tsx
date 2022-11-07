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
import { KEY_MEDICAL_CENTER, KEY_OPTIONS_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { authenticationRepository } from '@/service/repositories/Authentication.repository';
import { VisibilityIcon, VisibilityOffIcon } from '@toolbox/constants/icons';
import { doctorService } from '@/service/services/Doctor.service';
import { ubigeoService } from '@/service/services/Ubigeo.service';
import { areaService } from '@/service/services/Area.service';
import { ROLE_SUPER_ADMIN } from '@/toolbox/constants/role-type';
import { ROLE_ADMIN } from '@/toolbox/defaults/static-roles';
import { SpecialityRepository } from '@/service/repositories/Speciality.repository';
import { SpecialityService } from '@/service/services/Speciality.service';


type ModalProps = {
   open: boolean,
   setOpen: any,
   actionSelect?: string,
   recoveryData?: any,
   saveDoctor?: ({ }) => void,
   editDoctor?: ({ }) => void,
}

export const DoctorModal: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
   const user_data = readLocalStorage(KEY_USER_DATA)
   const { open, setOpen, actionSelect, recoveryData, saveDoctor, editDoctor } = props
   const [data, setData] = useState({
      name: '',
      last_name: '',
      rut: '',
      date_birth: '',
      address: '',
      mail: '',
      textError: '',
   });

   const [dataArea, setDataArea] = useState<any>([]);
   const [dataEspecialidad, setDataEspecialidad] = useState<any>([]);
   const [dataMedicalCenter, setDataMedicalCenter] = useState<any>([]);
   const [dataDoctorType, setDataDoctorType] = useState<any>([]);
   const [ubigeo, setUbigeo] = useState<any>({ pais: [], departamento: [], provincia: [], distrito: [] });

   const [idArea, setIdArea] = useState({ id: 0, name: '' });
   const [idEspecialidad, setIdEspecialidad] = useState({ id: 0, name: '' });
   const [medicalCenter, setMedicalCenter] = useState({ id: 0, name: '' });
   const [idDoctorType, setIdDoctorType] = useState({ id: 0, name: '' });
   const [idpais, setIdPais] = useState({ id: 0, name: '' });
   const [iddepartamento, setIdDepartamento] = useState({ id: 0, name: '' });
   const [idprovincia, setIdProvincia] = useState({ id: 0, name: '' });
   const [iddistrito, setIdDistrito] = useState({ id: 0, name: '' });

   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })

   const [error, setError] = useState<any>('');

   const handleInput = (event: any) => {
      setError('')
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
      try {
         console.log('hsdfh')
         const userData = readLocalStorage(KEY_USER_DATA);
         const role = userData.user.role
         const optionsMedicalCenter = readLocalStorage(KEY_OPTIONS_MEDICAL_CENTER);
         console.log(optionsMedicalCenter)
         setDataMedicalCenter(optionsMedicalCenter)
         if(role === ROLE_ADMIN){
            const idMedicalCenter = readLocalStorage(KEY_MEDICAL_CENTER);
            const objMedicalCenter = optionsMedicalCenter.find((value => value.id == idMedicalCenter))
            
            setMedicalCenter(objMedicalCenter)

            const resp = await areaService.getDataAreaByMedicalCenter(objMedicalCenter.id);
            setDataArea(resp.data);

            const respSpecialty = await SpecialityService.getDataSpecialityByMedicalCenter(objMedicalCenter.id)
            setDataEspecialidad(respSpecialty.data)
         }
         // const res: any = await doctorService.getDoctorDataInitial();
         // const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
         // const resp = await areaService.getDataAreaByMedicalCenter(medical_center);
         // setDataArea(resp.data);
         // setDataEspecialidad(res.data.Specialty)
         // setDataMedicalCenter(res.data.MedicalCenter)
         // setDataDoctorType(res.data.DoctorType)
      }
      catch(e){
        console.log(e)
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

   async function getAutocomplete(id_centro_medico: number, id_especialidad: number, id_doctor_type: number, id_area: number) {
      const res: any = await doctorService.getDoctorDataInitial();
      const resp = await areaService.getDataAreaByMedicalCenter(id_centro_medico);
      const medicalCenter = res.data.MedicalCenter.find((value) => value.id == id_centro_medico);
      setDataMedicalCenter(res.data.MedicalCenter)
      setMedicalCenter(medicalCenter);
      setIdEspecialidad(res.data.Specialty.find((value) => value.id == id_especialidad))
      setIdDoctorType(res.data.MedicalCenter.find((value) => value.id == id_doctor_type))
      setIdArea(resp.data.find((value) => value.id == id_area));
   }

   async function getArea(id_centro_medico: number) {
      const medical_center = readLocalStorage(KEY_MEDICAL_CENTER)
      const resp = await areaService.getDataAreaByMedicalCenter(id_centro_medico);
      setDataArea(resp.data);
   }

   async function getUbigeo(id_district, id_province, id_department, idPais, idmedical_center, idspecialty, id_doctor_type, id_area) {
      const resp_ubigeo = await ubigeoService.getDistrictUbigeo(id_district, id_province, id_department, idPais)
      console.log(resp_ubigeo)
      setUbigeo({ pais: resp_ubigeo.data.countries, departamento: resp_ubigeo.data.departments, provincia: resp_ubigeo.data.provincies, distrito: resp_ubigeo.data.districts })
      setIdPais(resp_ubigeo.data.country);
      setIdDepartamento(resp_ubigeo.data.department);
      setIdProvincia(resp_ubigeo.data.province)
      setIdDistrito(resp_ubigeo.data.district)
      getAutocomplete(idmedical_center, idspecialty, id_doctor_type, id_area,);
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



      const { name, last_name, rut, date_birth, mail, address } = data;

      const bodyRequest = {
         ...data,
         idarea: idArea.id,
         idspecialty: idEspecialidad.id,
         iddistrict: iddistrito.id,
         medical_center: medicalCenter.id,
         iddoctor_type: idDoctorType.id
      }
      if (actionSelect == 'edit') {
         editDoctor(bodyRequest)

      }
      if (actionSelect == 'save') {
         saveDoctor(bodyRequest)
      }
   }

   useEffect(() => {
      if (open) {
      dataInitial();
      getPais();
      if (actionSelect == 'edit') {
         console.log(recoveryData)
         const { iddistrict, idprovince, iddepartment, idcountry, idmedical_center, idspecialty, iddoctor_type, idarea } = recoveryData;
         setData(recoveryData);
         getUbigeo(iddistrict, idprovince, iddepartment, idcountry, idmedical_center, idspecialty, iddoctor_type, idarea)
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
                     error={error == 'name' || error == 'name_limit'? true : false}
                     type="text"
                     value={data.name}
                     onChange={handleInput}
                     helperText={error == 'name' ? 'Campo es obligatorio' : error == 'name_limit'? 'Máximo 100 caracteres':''}

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
                     error={error == 'last_name' || error ==  'last_name_limit' ? true : false}
                     type="text"
                     value={data.last_name}
                     onChange={handleInput}
                     helperText={error == 'name' ? 'Campo es obligatorio' : error == 'name_limit'? 'Máximo 100 caracteres':''}
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
                     error={error == 'rut' ? true : false}
                     type="text"
                     value={data.rut}
                     onChange={handleInput}
                     helperText={error == 'rut' ? 'Campo es obligatorio' : ''}
                  />
               </Grid>
               <Grid item xs={12} md={6} >
                  <TextField
                     fullWidth
                     size="small"
                     id="date_birth"
                     placeholder="Fecha Nacimiento*"
                     // label="Fecha Nacimiento*"
                     sx={{ bgcolor: '#fff' }}
                     name="date_birth"
                     error={error == 'date_birth' ? true : false}
                     type="date"
                     value={data.date_birth}
                     onChange={handleInput}
                     helperText={error == 'date_birth' ? 'Campo es obligatorio' : ''}
                  />
               </Grid>
               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="mail"
                     placeholder="Correo*"
                     label="Correo*"
                     error={error == 'mail' || error == 'mail_limit'? true : false}
                     sx={{ bgcolor: '#fff' }}
                     name="mail"
                     type="text"
                     value={data.mail}
                     onChange={handleInput}
                     helperText={error == 'mail' ? 'Campo es obligatorio' : error == 'mail_limit'?'Número máximo de caracteres es 100':''}
                  />
               </Grid>

               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="address"
                     placeholder="Direccion*"
                     label="Direccion*"
                     sx={{ bgcolor: '#fff' }}
                     name="address"
                     type="text"
                     value={data.address}
                     onChange={handleInput}
                     error={error == 'address' || error == 'address_limit' ? true : false}
                     helperText={error == 'address' ? 'Campo es obligatorio' : error == 'address'? 'Número máximo de caracteres es 100':''}
                  />
               </Grid>
               {/* <Grid item xs={12} md={12} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={idDoctorType}
                     onChange={(e, data: any) => {
                        data && setIdDoctorType(data)
                     }}
                     id="iddoctor_type"
                     options={dataDoctorType}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} label="Tipo Doctor" />}
                  />
               </Grid> */}
               {user_data.user.role == ROLE_SUPER_ADMIN && <Grid item xs={12} md={12} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={medicalCenter}
                     onChange={(e, data: any) => {
                        console.log(data);
                        data && getArea(data.id);
                        setMedicalCenter(data)
                        /*setIdDoctorType( {
                           id: 1,
                           name: "test"
                       })*/
                     }}
                     id="medical_center"
                     options={dataMedicalCenter}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params} label="Centro Médico" />}
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
                     renderInput={(params) => <TextField
                        {...params}
                        placeholder="Area"
                        label="Area"
                        error={error == "idArea" ? true : false}
                        helperText={error == "idArea" ? "Campo requerido" : ""} />}
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
                     renderInput={(params) => <TextField {...params}
                        placeholder="Especialidad"
                        label="Especialidad"
                        error={error == "idEspecialidad" ? true : false}
                        helperText={error == "idEspecialidad" ? "Campo requerido" : ""} />}
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
                     renderInput={(params) => <TextField {...params} label="Pais" />}
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
                     renderInput={(params) => <TextField {...params} label="Departamento" />}
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
                     renderInput={(params) => <TextField {...params} label="Provincia" />}
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
                     renderInput={(params) => <TextField {...params} label="Distrito" />}
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
                     {actionSelect == 'edit' ? 'Actualizar' : 'Agregar'}
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
                  <Typography variant='h5' fontWeight={700}>
                  {actionSelect == 'edit' ? 'EDITAR DOCTOR' : 'NUEVO DOCTOR'}
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

