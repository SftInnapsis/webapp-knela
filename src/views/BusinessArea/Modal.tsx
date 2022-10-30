import { areaService } from "@/service/services/Area.service";
import { medicalCenterService } from "@/service/services/MedicalCenter.service";
import { ubigeoService } from "@/service/services/Ubigeo.service";
import { KEY_OPTIONS_MEDICAL_CENTER, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_SUPER_ADMIN } from "@/toolbox/defaults/static-roles";
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { Alert, Autocomplete, Button, Grid, Modal, Snackbar, TextField } from "@mui/material";
import { SaveIcon, CancelIcon } from "@toolbox/constants/icons";
import { useEffect, useState } from "react";

export const ModalBusinessArea = (props) =>{
    console.log(props)
    const {open, setOpen , actionSelect} = props
    const initialArea = { id: 0, name: '', idmedical_center:''}
    const [areaSelected, setAreaSelected] = useState<any>(initialArea)
    const [medicalCenterOptions, setMedicalCenterOptions] = useState<any>([])
    const [medicalCenter, setMedicalCenter] = useState<any>(initialArea)
    const user_data = readLocalStorage(KEY_USER_DATA)
    const [error, setError] = useState<any>('');
    
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'success',
        message: 'Error',
        autoHideDuration: 5000,
     })

     const getDataInitial = async () => {
        const resp:any = await medicalCenterService.getMedicalCenterPage();
        if(resp){
            console.log(resp)
            setMedicalCenterOptions(resp.data)
        }
     }

     const dataInitialEdit = async() => {
        const resp:any = await medicalCenterService.getMedicalCenterPage();
        if(resp){
            setMedicalCenter(resp.data.find((value)=>{return value.id == props.data.idmedical_center}))
        }
     }

     useEffect(()=>{
       if(open)
       {
        getDataInitial();
        if(actionSelect == 'edit'){
            setAreaSelected(props.data)
            dataInitialEdit()
        }

        if(actionSelect == 'save'){
            setAreaSelected(areaSelected)
        }
       }
     },[])

    const handleInputChange = (e) => {
        const changedFormValues = {
            ...areaSelected,
            [e.target.name]: e.target.value
          }
         setAreaSelected(changedFormValues);
    }



    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if(medicalCenterSelected.rut === ''){return setError('rut')}
        if(areaSelected.name === ''){return setError('name')}
        // if(medicalCenter.idmedical_center === ''){return setError('idMedicalCenter')}
        // if(medicalCenterSelected.address === ''){return setError('address')}
        // if(medicalCenterSelected.phone === ''){return setError('phone')}

        if(actionSelect == 'edit'){
            console.log('edit')
            const data_edit = {...areaSelected }
            const resp_edit = await areaService.updateArea(areaSelected.id, data_edit);
            if(resp_edit.data){
                setSnackBarConfig({open:true, severity:'success', message:'Centro Médico Actualizado' })
                props.getDataInitial();
                setOpen(false)
            }else{
                setSnackBarConfig({open:true, severity:'warning', message:'No se pudo actualizar la información' })
                props.getDataInitial();
                setOpen(false)
            }
        }

        if(actionSelect == 'save'){
            console.log('save')
            const data_save = {...areaSelected }
           
            const resp_save = await areaService.createArea( data_save);
            if(resp_save.data){
                setSnackBarConfig({open:true, severity:'success', message:'Centro Médico creado con éxito' })
                props.getDataInitial();
                setOpen(false)
            }else{
                setSnackBarConfig({open:true, severity:'warning', message:'No se pudo crear el Centro Médico' })
                props.getDataInitial();
                setOpen(false)
            }
        }

        props.getDataInitial()
    }


    const bodyModal = (
        <div>
            <form onSubmit={handleSubmit} >
                <Grid container direction="row" spacing={2}>
                    {
                        ROLE_SUPER_ADMIN == user_data.user.role && <Grid item xs={12} >
                        <Autocomplete
                            disabled={actionSelect == 'edit' ? true:false}
                            value={medicalCenter}
                            sx={{ bgcolor: '#fff' }}
                            size='small'
                            onChange={(e, data: any) => { 
                                data && setMedicalCenter(data)
                                data && setAreaSelected({...areaSelected,idmedical_center:data.id })
                            }}
                            id="medical_center"
                            options={medicalCenterOptions}
                            getOptionLabel={(option: any) => option.name ? option.name : ""}
                            renderInput={(params) => <TextField {...params} 
                                                        label="Centro Médico"
                                                        error={error=='idMedicalCenter'? true:false}
                                                        helperText={error=='idMedicalCenter'?'Seleccion del campo obligatorio': ''}/>}
                        />
                    </Grid>
                    }
                    <Grid item xs={12} md={12} >
                        <TextField
                            value={areaSelected.name}
                            fullWidth
                            size="small"
                            id="name"
                            error={error=='name'? true:false}
                            placeholder="Nombre*"
                            sx={{ bgcolor: '#fff' }}
                            onChange={handleInputChange}
                            name="name"
                            type="text"

                            helperText={error=='name'?'Este campo es obligatorio': ''}
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
                    <span > {actionSelect == 'edit' ? 'Actualizar Area' :'Crear Area'}</span>
                 </div>
                 <div className='Body'>
                   {bodyModal}
                 </div>
              </div>
           </Modal>
        </div>
     );
}
