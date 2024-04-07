import React, { useState, useMemo, useRef, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Divider, Autocomplete, Dialog, InputAdornment, IconButton, Snackbar, Alert, Select, MenuItem } from '@mui/material';
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
import { professionalService } from '@/service/services/Professional.service';
import { ubigeoService } from '@/service/services/Ubigeo.service';
import { areaService } from '@/service/services/Area.service';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLE_DOCTOR_IND } from '@/toolbox/defaults/static-roles';
import { medicalCenterService } from '@/service/services/MedicalCenter.service';


type ModalProps = {
   open: boolean,
   setOpen: any,
   actionSelect?: string,
   recoveryData?: any,
   savePatientMaster?: ({ }) => void,
   editPatientMaster?: ({ }) => void,
}

export const PatientMasterModal: React.FC<ModalProps> = (
   props: ModalProps
): JSX.Element => {
   console.log('sfsfs');
   const user_data = readLocalStorage(KEY_USER_DATA)
   const { open, setOpen, actionSelect, recoveryData, savePatientMaster, editPatientMaster } = props
   const [data, setData] = useState({
      name: '',
      last_name: '',
      rut: '',
      date_birth: '',
      mail: '',
      textError: '',
      observation: ''
   });

   const [typeSeguro,setTypeSeguro] = useState<any>([
      { id:1, name: 'ISAPRE'},
      { id:2, name: 'FONASA'}
  ])
  const [idType,setIdType] = useState<any>(1)
   const [dataMedicalCenter, setDataMedicalCenter] = useState<any>([]);
   const [medicalCenter, setMedicalCenter] = useState(null);

   const [error, setError] = useState<any>('');

   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })

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

            // var Fn = {
            //    // Valida el rut con su cadena completa "XXXXXXXX-X"
            //    validaRut: function (rutCompleto) {
            //       if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
            //          return false;
            //       var tmp = rutCompleto.split('-');
            //       var digv = tmp[1];
            //       var rut = tmp[0];
            //       if (digv == 'K') digv = 'k';
            //       return (Fn.dv(rut) == digv);
            //    },
            //    dv: function (T) {
            //       var M = 0, S = 1;
            //       for (; T; T = Math.floor(T / 10))
            //          S = (S + T % 10 * (9 - M++ % 6)) % 11;
            //       return S ? S - 1 : 'k';
            //    }
            // }

            var foo =value
            // .split("-").join("")
            if (foo.length > 0 && foo.length < 11) {
               // foo = foo.match(new RegExp('.{1,8}', 'g')).join("-");
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
         case 'observations':
            setData(prev => ({ ...prev, observation: value, textError: '' }));
            break;
         default:
            break;
      }
   };

   const dataInitial =  async() => {
      const resp:any = await medicalCenterService.getMedicalCenterPage();
        if(resp){
            console.log(resp)
            setDataMedicalCenter(resp.data)
        }
      // const res: any = readLocalStorage(KEY_USER_DATA)
      // const resp = readLocalStorage(KEY_OPTIONS_MEDICAL_CENTER);
      // console.log(resp)
      // console.log(res.user.medical_center)
      // setDataMedicalCenter(res.data)
   }

   async function getAutocomplete(id_centro_medico: number) {
      const res: any = await professionalService.getProfessionalDataInitial(id_centro_medico);
      setMedicalCenter(res.data.MedicalCenter.find((value) => value.id == id_centro_medico));
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
     try{ e.preventDefault();

      if(data.name === ''){return setError('name')}
      if(data.name.length >=100){return setError('name_limit')}
      if(data.last_name === ''){return setError('last_name')}
      if(data.last_name.length >= 150){return setError('last_name_limit')}
      if(data.rut === ''){return setError('rut')}
      if(data.date_birth === ''){return setError('date_birth')}
      if(data.observation === ''){return setError('observations')}
      if(data.mail === ''){return setError('mail')}
      let validate = ValidateEmail(data.mail)
      if(!validate){return setError('mail_invalid') }



      const { name, last_name, rut, date_birth, mail } = data;
      const medicalStorage = readLocalStorage(KEY_MEDICAL_CENTER)
      console.log(medicalStorage)
      const valueTypeSeguro = idType && typeSeguro.find(value => value.id === idType)
      const bodyRequest = {
         ...data,
         medical_center: user_data?.user?.role == ROLE_SUPER_ADMIN ? medicalCenter.id : medicalStorage,
         idTypeSeguro: idType,
         nameTypeSeguro: valueTypeSeguro?.name,
         idarea: user_data?.user?.role == ROLE_DOCTOR_IND ? user_data?.user?.idarea : null
      }
      if (actionSelect == 'edit') {
         editPatientMaster(bodyRequest)

      }
      if (actionSelect == 'save') {
         savePatientMaster(bodyRequest)
      }}catch(e){
         console.log(e)
      }
   }

   const handleChanges2 = (e) => {
      setIdType(e.target.value)
  }

   useEffect(() => {
      console.log(open)
      if (open) {
         console.log('sdjfisdjf')
         dataInitial();
         if (actionSelect == 'edit') {
            const { idmedical_center } = recoveryData;
            setData(recoveryData);
            getAutocomplete(idmedical_center)
         }
      }else{
         setData({
            name: '',
            last_name: '',
            rut: '',
            date_birth: '',
            mail: '',
            textError: '',
            observation: ''
         })
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
                     value={data.name}
                     onChange={handleInput}
                     error={error=='name' || error=='name_limit'? true:false}
                     helperText={error=='name'?'Campo obligatorio': error=='name_limit'? 'Números máximo de caracteres es 100':''}
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

                     type="text"
                     value={data.last_name}
                     onChange={handleInput}
                     error={error=='last_name' || error=='last_name_limit'? true:false}
                     helperText={error=='last_name'?'Campo obligatorio':error=='last_name_limit'? 'Número máximo de caracteres es 150': ''}
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
                     value={data.rut}
                     onChange={handleInput}
                     error={error=='rut'? true:false}
                     helperText={error=='rut'?'Campo obligatorio': ''}
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
                     value={data.date_birth}
                     onChange={handleInput}
                     error={error=='date_birth'? true:false}
                     helperText={error=='date_birth'?'Campo obligatorio': ''}
                  />
               </Grid>
               <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     size="small"
                     id="mail"
                     placeholder="Correo*"
                     sx={{ bgcolor: '#fff' }}
                     name="mail"
                     label="Correo*"
                     type="text"
                     value={data.mail}
                     onChange={handleInput}
                     error={error=='mail' || error == 'mail_invalid'? true:false}
                     helperText={error=='mail'?'Campo obligatorio': error == 'mail_invalid'?'Correo es inválido': ''}
                  />
               </Grid>
               { actionSelect == 'save' &&  <Grid item xs={12} md={12} >
                  <TextField
                     fullWidth
                     multiline
                     size="small"
                     id="observations"
                     placeholder="Observaciones*"
                     label="observations*"
                     sx={{ bgcolor: '#fff' }}
                     name="observations"
                     rows={3}
                     type="text"
                     value={data?.observation}
                     onChange={handleInput}
                     error={error=='observations'? true:false}
                     helperText={error=='observations'?'Campo obligatorio': ''}
                  />
               </Grid>}
             { actionSelect == 'save' && < Grid item md={12} >
                    <Typography>Seleccione tipo de seguro de salud</Typography>
                    <Select
                        id="outlined-select-ubicationclinica"
                        sx={{ width: "200px" }}
                        fullWidth
                        value={idType}
                        onChange={handleChanges2}
                        variant="standard"
                    >
                        {typeSeguro.map((option, key) => (
                            <MenuItem
                                sx={{ textAlign: 'center' }}
                                key={key} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>}



            { user_data?.user?.role == ROLE_SUPER_ADMIN &&
               <Grid item xs={12} md={12} >
                  <Autocomplete
                     sx={{ bgcolor: '#fff' }}
                     size='small'
                     value={medicalCenter}
                     onChange={(e, data: any) => {
                        console.log(data);
                        data && setMedicalCenter(data)
                     }}
                     id="medical_center"
                     options={dataMedicalCenter}
                     getOptionLabel={(option: any) => option.name ? option.name : ""}
                     renderInput={(params) => <TextField {...params}  label="Centro Médico" />}
                  />
               </Grid>}

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
                   {actionSelect == 'edit' ?'Editar' :'Agregar'}
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
                  {actionSelect == 'edit' ?'EDITAR PACIENTE' :'NUEVO PACIENTE'}
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
