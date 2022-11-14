import { TableDataV2 } from "@/components/common/Tablev2";
import { areaService } from "@/service/services/Area.service";
import { patientService } from "@/service/services/Patient.service";
import { KEY_MEDICAL_CENTER } from "@/toolbox/constants/local-storage";
import { readLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { PatientMaster } from "@/views/PatientMaster";
import { Alert, Autocomplete, Button, Chip, Grid, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export const StepConfirmationKnela = (props) => {

    const { dataDoctor, dataTutor, dataPatient, dataStatusPatient,
        idStatus, handleChanges, typeSeguro, idType, handleChanges2,
        GenerateAttention, handleReset, handleBack } = props
    const [dataArea, setDataArea] = useState<any>([]);
    const [idArea, setIdArea] = useState(null);
    const [error, setError] = useState('')
  
    const [observations, setObservations] = useState<any>({ text: '' })
    const handleInput = (event: any) => {
        const name_input = event.target.name;
        const value = event.target.value;
        switch (name_input) {
            case 'observations':
                setObservations(prev => ({ ...prev, text: value, textError: '' }));
                break;
            default:
                break;
        }
    };
    
    const getAreasByMedicalCenter = async() => {
        const medicalCenter = readLocalStorage(KEY_MEDICAL_CENTER)
        const resp = await areaService.getDataAreaByMedicalCenter(medicalCenter);
        setDataArea(resp.data);
    }

    const handleGenerateAttention = () => {
        if(!idArea){return setError('idArea')}
        GenerateAttention(observations, idArea)
    }

    useEffect(()=>{
        getAreasByMedicalCenter();
    },[])

    return (
        <Paper square elevation={0} sx={{ p: 3 }}>
            {/* <Typography>Hemos finalizado todos los pasos,indique el estado del paciente y verifique si los datos son correctos</Typography> */}
            <Grid container direction="row" spacing={2} >
                <Grid item md={12} mb={2}>
                    <Stack direction="row" spacing={1}>
                        <Chip label={`Paciente: ${dataPatient?.name} - ${dataPatient?.rut}`} />
                        {dataTutor?.name && <Chip label={`Tutor: ${dataTutor?.name} - ${dataTutor?.rut}`} />}
                        {/* <Chip label={`Doctor: ${dataDoctor?.name} - ${dataDoctor?.rut}`} /> */}
                    </Stack>
                </Grid>
                <Grid container ml={2}>
                <Grid item xs={4}>
                    <Typography>Seleccione el estado del paciente</Typography>
                    <Select
                        id="outlined-select-ubicationclinica"
                        sx={{ width: "200px" }}
                        fullWidth
                        value={idStatus}
                        onChange={handleChanges}
                        variant="standard"
                    >
                        {dataStatusPatient.map((option, key) => (
                            <MenuItem
                                sx={{ textAlign: 'center' }}
                                key={key} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>

                </Grid>
                <Grid item md={4} >
                    <Typography>Seleccione el Área de atención médica</Typography>
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
                </Grid>
                <Grid item md={8}>
                    <form>
                        <TextField
                            multiline
                            rows={3}
                            size="small"
                            id="observations"
                            placeholder="Observaciones*"
                            label="Observaciones*"
                            sx={{ bgcolor: '#fff' }}
                            name="observations"
                            type="text"
                            fullWidth
                            value={observations.text}
                            onChange={handleInput}

                        />
                    </form>

                </Grid>

                <Grid container justifyContent={'space-between'}>
                    <Grid item md={6} pl={5}>
                        <Button onClick={() => { handleBack() }} variant='contained' sx={{ background: '#FFBB34', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}>Volver</Button>
                        <Button onClick={() => { handleReset() }} variant='contained' sx={{ background: '#FFBB34', ml: 2, color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}>Restablecer</Button>

                    </Grid>

                    <Grid item md={6} >
                        <Button onClick={() => {handleGenerateAttention() }} variant='contained' sx={{ background: '#3D8BD9', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#155172' } }}>Confirmar</Button>

                    </Grid>
                </Grid>


            </Grid>


        </Paper>
    )
}