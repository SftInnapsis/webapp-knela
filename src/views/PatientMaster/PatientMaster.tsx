import { TableDataV2 } from "@/components/common/Tablev2";
import { Protected } from "@/components/layout/Protected";
import { patientService } from "@/service/services/Patient.service";
import React, { useEffect, useMemo, useState } from "react";
import { ConfirmDialog } from '@components/common/DialogConfirm';
import { PatientMasterModal } from "./PatientMasterModal";
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { Button, InputAdornment, Autocomplete, TextField, Grid, CircularProgress, Snackbar, Alert, FormControl, OutlinedInput, InputLabel, MenuItem, Select } from '@mui/material';
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_SUPER_ADMIN, ROLE_DOCTOR_IND} from "@/toolbox/defaults/static-roles";
import { tutorService } from "@/service/services/Tutor.service";
import { ModalTutor } from "../Tutor/ModalTutor"
import { userService } from "@/service/services/User.service";
import { ModalEditTutor } from "../Tutor/ModalEditTutor";
import { API_URL_BASE } from "@/toolbox/defaults/app";

export const PatientMasterView = (props) => {
   console.log(props)
   const user_data = readLocalStorage(KEY_USER_DATA)
   const role = user_data.user.role
   const { MedicalCenterReducer = '' } = props;
   const [dataPatient, setDataPatient] = useState<any>([]);
   const [openImport,setOpenImport] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false);
   const [openModalTutor, setOpenModalTutor] = useState<boolean>(false)
   const [openEditModalTutor, setOpenEditModalTutor] = useState<boolean>(false)
   const [recoveryDataTutor, setRecoveryDataTutor] = useState<any>({})
   const [actionSelect, setActionSelect] = useState<any>('')
   const [recoveryData, setRecoveryData] = useState<any>({})
   const [patientCreated, setPatientCreated] = useState<any>(null)
   const [Dialog, setDialog] = useState<any>({
      open: false,
      title: 'Eliminar',
      confirm: false,
      id: null,
      medical_center: null,
      message: ``
   })

   const [saveFile, setSaveFile] = useState({
      name: '',
      path: '',
      preview: null,
      data: null
   });

   const [snackBarConfig, setSnackBarConfig] = useState<any>({
      open: false,
      severity: 'error',
      message: 'Error',
      autoHideDuration: 3000,
   })

   const changefile = (e) => {
      const file = e.target.files[0];
      if (!file) {
         return;
      }
      let src, preview, type = file.type;
      setSaveFile(prev => ({ ...prev, data: file, path: src, preview: preview }))
      console.log(file);
   }

   const GenerateExportExcel = async (file) => {
      console.log(file)
      const idMedicalCenter = readLocalStorage(KEY_MEDICAL_CENTER)
      const formFile = new FormData();
      if(!file?.data){return setSnackBarConfig({...snackBarConfig, open:true, severity:'error', message:'No añadió ningun archivo'})}
      formFile.append('file', file.data || null);
      formFile.append('medical_center', idMedicalCenter || null);
      console.log('shshs')
      const resp = await patientService.createPatientExcel(formFile);
      if(resp){
         setSnackBarConfig({...snackBarConfig, open:true, severity:'success',message:'Documento Importado con éxito'})
      }

      getDataPatient();

   }


   const getDataPatient = async () => {
      console.log(role)
      if (role == ROLE_SUPER_ADMIN) {
         const resp: any = await patientService.getPatientPageAll();
         console.log(resp)
         if (resp.data) {
            setDataPatient(resp.data);
         }
      }else if(role == ROLE_DOCTOR_IND){
         const resp: any = await patientService.getPatientAmbulatorioPageAll(30, user_data.user.rut );
         console.log(resp)
         if (resp.data) {
            setDataPatient(resp.data);
         }
        console.log(user_data.user.rut)
      }
      else {
         const resp: any = await patientService.getPatientPage(MedicalCenterReducer.id_medical_center);
         console.log(resp)
         if (resp.data) {
            setDataPatient(resp.data);
         }
      }

   }


   const getPatientSearch = async (term) => {
      if (role == ROLE_SUPER_ADMIN) {
         const resp: any = await patientService.getPatientSearchAll(term);
         console.log(resp)
         if (resp.data) {
            setDataPatient(resp.data);
         }

      }else if(role == ROLE_DOCTOR_IND){

         const resp: any = await patientService.getPatientAmbulatorioSearch(30,user_data.user.rut, term );
         console.log(resp)
         if (resp.data) {
            setDataPatient(resp.data);
         }
        console.log(user_data.user.rut)
      } else {
         const resp: any = await patientService.getPatientSearch(MedicalCenterReducer.id_medical_center, term);
         console.log(resp)
         if (resp.data) {
            setDataPatient(resp.data);
         }
      }

   }

   const RecuperarData = async (data) => {
      const { action, id, idmedical_center, name, last_name } = data;
      setActionSelect(action)
      switch (action) {
         case 'edit':
            setRecoveryData(data);
            setOpen(true)
            break;
         case 'delete':
            setDialog(prev => ({ ...prev, message: `Seguro que quiere eliminar a ${name} ${last_name}`, id: id, medical_center: idmedical_center, open: true, confirm: true }));
            break;
         case 'seleccionar':
            console.log(data);
            props?.recuperarData(data);
            break;
         case 'add_tutor':
            if (data?.tutor_id) {
               setRecoveryDataTutor(data)
               setPatientCreated({ id: data?.id })
               //  setTimeout(function () {
               setOpenEditModalTutor(true)
               //  }, 2000);

               //   setSnackBarConfig({...snackBarConfig, open:true, severity:'warning', message:'Ya existe un tutor asignado a este paciente'})
               //   return
            } else {
               setOpenModalTutor(true)
               setPatientCreated({ id: data?.id })
            }

            break;
         case 'credential':
            if (data?.tutor_id) {
               const res = await userService.recoveryPassword(data?.tutor_id, 6)
               if (res && res.data) {
                  setSnackBarConfig({ ...snackBarConfig, open: true, severity: 'success', message: res.data })
               }
               return
            } else {
               const res = await userService.recoveryPassword(id, 5)
               if (res && res.data) {
                  setSnackBarConfig({ ...snackBarConfig, open: true, severity: 'success', message: res.data })
               }
            }

            break;
         default:
            break;
      }
   }

   const Delete = async () => {
      const { confirm, id, medical_center } = Dialog;
      try {
         if (Dialog.confirm == true) {
            const res = await patientService.deletePatient(id, medical_center)
            if (res.data) {
               setSnackBarConfig(prev => ({
                  ...prev,
                  open: true,
                  severity: 'info',
                  message: res.data.message,
               }));
               getDataPatient();
            }
         }
      } catch (e) {
         console.log(e)
      }
   }

   const savePatientMaster = async (data) => {
      console.log(data);
      if (data) {
         const res: any = await patientService.createPatient(data)
         if (res?.data?.detail) {
            setPatientCreated(res.data.detail)
            setSnackBarConfig(prev => ({
               ...prev,
               open: true,
               severity: 'info',
               message: res.data.message,
            }));
            getDataPatient();
            setOpen(false)
            setOpenModalTutor(true)
            setPatientCreated(res.data.detail)
         }
      }
   }

   const saveTutor = async (data) => {
      console.log(data);
      if (data) {
         const res: any = await tutorService.createTutor({ ...data, idpatients: patientCreated.id })
         if (res.data.detail) {
            setSnackBarConfig(prev => ({
               ...prev,
               open: true,
               severity: 'info',
               message: res.data.message,
            }));
            setOpenModalTutor(false)
            getDataPatient();
         }
      }
   }

   const editTutor = async (data) => {
      if (data) {
         console.log(data)
         const res: any = await tutorService.updateTutor(data.tutor_id, { ...data, idpatients: patientCreated.id })
         if (res.data.detail) {
            setSnackBarConfig(prev => ({
               ...prev,
               open: true,
               severity: 'info',
               message: res.data.message,
            }));
            setOpenEditModalTutor(false)
            getDataPatient();
         }
      }
   }

   // useEffect(() => {
   //    if (!openModalTutor || !openEditModalTutor) {
   //       getDataPatient();
   //    }
   // }, [openModalTutor || openEditModalTutor])

   const editPatientMaster = async (data) => {
      const { id } = data;
      if (data) {
         const res: any = await patientService.updatepatient(id, data)
         if (res.data.detail) {
            setSnackBarConfig(prev => ({
               ...prev,
               open: true,
               severity: 'info',
               message: res.data.message,
            }));
            setOpen(false)
            getDataPatient();
         }
      }
   }

   // useEffect(() => {
   //    getDataPatient();
   // }, [])

   useEffect(() => {
      getDataPatient();
   }, [MedicalCenterReducer.id_medical_center])

   // const initialData =  useMemo(()=>getDataPatient(),[dataPatient])

   const headerAdmin = [
      { name: 'rut', label: 'RUT', filter: false, Chip: false },
      { name: 'full_name', label: 'Nombre', filter: false, Chip: false },
      { name: 'nameTypeSeguro', label: 'Tipo Seguro', filter: false, Chip: false },
      // { name: 'mail', label: 'Correo', filter: false, Chip: false },
      { name: 'tutor_rut', label: 'RUT Tutor', filter: false, Chip: false },
      { name: 'full_name_tutor', label: 'Nombre Tutor', filter: false, Chip: false },
      { name: 'date_birth', label: 'Fecha de Nacimiento', filter: false, Chip: false },
      // { name: 'status', label: 'Estado', filter: false, Chip: true }
   ]

   const headerSuperAdmin = [
      { name: 'rut', label: 'RUT', filter: false, Chip: false },
      { name: 'name', label: 'Nombre', filter: false, Chip: false },
      { name: 'last_name', label: 'Apellido', filter: false, Chip: false },
      // { name: 'mail', label: 'Correo', filter: false, Chip: false },
      { name: 'date_birth', label: 'Fecha de Nacimiento', filter: false, Chip: false },
      { name: 'medicalCenter_name', label: 'Centro Medico', filter: false, Chip: false },
      { name: 'status', label: 'Estado', filter: false, Chip: true }
   ]

   const bodyView = <>
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
      <PatientMasterModal
         open={open}
         setOpen={setOpen}
         savePatientMaster={savePatientMaster}
         actionSelect={actionSelect}
         recoveryData={recoveryData}
         editPatientMaster={editPatientMaster}
      />
      <ModalTutor
         open={openModalTutor}
         setOpen={setOpenModalTutor}
         savePatientMaster={saveTutor}
         actionSelect={actionSelect}
         recoveryData={recoveryData}
      // editPatientMaster={editTutor}
      />
      <ModalEditTutor
         open={openEditModalTutor}
         setOpen={setOpenEditModalTutor}
         recoveryData={recoveryDataTutor}
         editPatientMaster={editTutor}
      // actionSelect='edit'
      />
      <TableDataV2
         data={dataPatient}
         header={role === ROLE_SUPER_ADMIN ? headerSuperAdmin : headerAdmin}
         status_action
         checkbox
         select_button={props?.select_button ? true : false}
         select_asing={props?.select_asing ? true : false}
         button_import={true}
         add_tutor_button
         ruta_import = {`${API_URL_BASE}/storage/app/public/PacienteExport.xlsx`}
         openImport={openImport}
         setOpenImport={setOpenImport}
         // changefile={changefile}
         GenerateExportExcel={GenerateExportExcel}
         title={'Pacientes'}
         RecuperarData={RecuperarData}
         setModalSave={setOpen}
         actionSelect={setActionSelect}
         dataInitial={getDataPatient}
         dataSearch={getPatientSearch}
         credential={true}
      />
   </>

   return (
      <>
         {props?.isNOtProtected == true ?
            bodyView : <Protected>
               {bodyView}
            </Protected>

         }
      </>

   );
};
