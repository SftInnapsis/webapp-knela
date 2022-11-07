import { areaService } from "@/service/services/Area.service";
import { medicalCenterService } from "@/service/services/MedicalCenter.service";
import { professionalService } from "@/service/services/Professional.service";
import { ubigeoService } from "@/service/services/Ubigeo.service";
import { KEY_MEDICAL_CENTER, KEY_OPTIONS_MEDICAL_CENTER, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "@/toolbox/defaults/static-roles";
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { Alert, Autocomplete, Button, Grid, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { useEffect, useState } from "react";

export const ModalAttention = (props) =>{
    console.log(props)
    const {open, setOpen , actionSelect} = props
    const user_data = readLocalStorage(KEY_USER_DATA)
    const [error, setError] = useState<any>('');
    const [dataTeamMedical, setDataTeamMedical] = useState([])
    const [dataTeamMedicalSelected, setDataTeamMedicalSelected] = useState([])
    const [dataTeamMedicalInitial, setDataTeamMedicalInitial] = useState([])

    const [administrator, setAdministrator] = useState([])
    const [administratorSelected, setAdministratorSelected] = useState(null)
    const [administratorInitial, setAdministratorInitial] = useState(null)
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'success',
        message: 'Error',
        autoHideDuration: 5000,
     })

     const getDataInitial = async () => {
         const resp:any = await professionalService.getStaff(props.attentionSelected?.id);
         console.log(resp)
         let objTeamMedicalSelected = resp.data.filter(value => value.area!= 'Administrativo')
         setDataTeamMedicalSelected(objTeamMedicalSelected)
         setDataTeamMedicalInitial(objTeamMedicalSelected)
         let objAdministratorSelected = resp.data.find(value => value.area == "Administrativo")
         setAdministratorSelected(objAdministratorSelected)
         setAdministratorInitial(objAdministratorSelected)
         
     }

    const getDataProfessional = async () => {
        const user_data = readLocalStorage(KEY_USER_DATA);
        if(user_data.user.role == ROLE_ADMIN){
            const id_medical = readLocalStorage(KEY_MEDICAL_CENTER)
            const resp: any = await professionalService.getProfessionalPage( id_medical);
            console.log(resp)
            if (resp.data) {
                console.log(resp.data)
                let objTeamMedical = resp.data.filter(value => value.area!= 'Administrativo')
                setDataTeamMedical(objTeamMedical)
                let objAdministrator = resp.data.filter(value => value.area == "Administrativo")
                
               setAdministrator(objAdministrator)
            }
        }
        
    }

    useEffect(()=>{
        if(open)
        {
         getDataProfessional()
         getDataInitial();
        }
      },[])

      const teamMedicalDelete = async() => {
        console.log('elimino')
        let array_resp = []
        const dataSelected = administratorSelected? dataTeamMedicalSelected.concat([administratorSelected]): dataTeamMedicalSelected
        console.log(dataSelected)
        const dataInitial = administratorInitial? dataTeamMedicalInitial.concat([administratorInitial]) : dataTeamMedicalInitial
        console.log(dataInitial)
        if(dataSelected.length === 0){
            dataInitial.map(async(value) => {
                const res = await professionalService.deleteStaff(value.id);
                array_resp.push(res)
            })
        }else{
            dataInitial.map(async(value)=>{
                const validateTeamMedical = dataSelected.find(item => item.id == value.id)
                if(!validateTeamMedical){
                    const res = await professionalService.deleteStaff(value.id);
                    array_resp.push(res)
                    console.log(value)
                }
            })
        }
      }

      const teamMedicalAdd = async(funcionDelete) => {
        console.log('agrego')
        let arrayAdd = []
        const dataSelected = administratorSelected? dataTeamMedicalSelected.concat([administratorSelected]): dataTeamMedicalSelected
        console.log(dataSelected)
        const dataInitial = administratorInitial? dataTeamMedicalInitial.concat([administratorInitial]) : dataTeamMedicalInitial
        console.log(dataInitial)
        if(dataSelected.length>= 0){
            dataSelected.map((value)=>{
                const validateTeamMedicalAdd = dataInitial.find(item => item.id == value.id)
                if(!validateTeamMedicalAdd){
                    console.log(value)
                    arrayAdd.push(value)
                }
            })
        }
        if(arrayAdd.length> 0){
            const res = await professionalService.createStaff(arrayAdd, props.attentionSelected?.id);
        }
        await funcionDelete()
      }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        if(actionSelect == 'edit'){
            teamMedicalAdd(teamMedicalDelete)
        }
        props.setSnackBar({...props.snackBar, open:true, message:'Datos actualizados con Éxito', severity:'success'})
        
        setOpen(false) 
        props.dataInitial()

    }


    const bodyModal = (
        <div>
            <form onSubmit={handleSubmit} >
                <Grid container direction="row" spacing={2}>
                    
                    <Grid item xs={12} md={12} >
                        <Autocomplete
                            multiple
                            id="multiple-limit-tags"
                            value={dataTeamMedicalSelected}
                            options={dataTeamMedical}
                            getOptionLabel={(option:any) => `${option?.name} ${option?.last_name} - ${option?.area}` }
                            defaultValue={[]}
                            onChange={(e, data: any) => { 
                                console.log(data)
                                setDataTeamMedicalSelected(data)
                           }}
                            renderInput={(params) => (
                                <TextField {...params} label="Equipo Médico" placeholder="Equipo Médico" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} >
                        <Autocomplete
                            id="multiple-limit-tags"
                            value={administratorSelected}
                            options={administrator}
                            onChange={(e, data: any) => { 
                                console.log(data)
                                setAdministratorSelected(data)
                           }}
                            getOptionLabel={(option) => option?.name + ' - '+option.area}
                            renderInput={(params) => (
                                <TextField {...params} label="Administrativo" placeholder="Equipo Médico" />
                            )}
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
                            {actionSelect == 'edit' ? 'Actualizar' :'Agregar'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
    
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
              open={open}
              onClose={() => { setOpen(false) }}>
              <div className='Modal'>
                 <div className='Title'>
                    <Typography variant='h5' fontWeight={700}> {actionSelect == 'edit' ? 'Actualizar Atention' :'Crear Area'}</Typography>
                 </div>
                 <div className='Body'>
                   {bodyModal}
                 </div>
              </div>
           </Modal>
        </div>
     );
}
