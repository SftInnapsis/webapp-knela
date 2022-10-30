import { Protected } from "@/components/layout/Protected";
import { attentionService } from "@/service/services/Attention.service";
import { patientService } from "@/service/services/Patient.service";
import { Alert, Box, Button, Card, CardActionArea, CardMedia, Chip, Grid, MenuItem, Paper, Select, Snackbar, Stack, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StepSearchDoctor, StepSearchPatient, StepSearchTutor } from "./Steps";

export const AttentionView = (props) => {
    const [dataInitial, setDataInitial] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [dataStatusPatient,setDataStatusPatient] = useState<any>([]);
    const [idStatus, setIdStatus] = useState<any>()
    const [type_attention,setTypeAttention] = useState<any>([])
    const [idType,setIdType] = useState<any>({id:0, name:''})
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'error',
        message: 'Error',
        autoHideDuration: 3000,
    })

    const getDataInitial = async () => {
        console.log('dsfjjdkf');
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

   
       const [activeStep, setActiveStep] = React.useState(0);
       const [dataPatient, setDataPatient] = useState<any>({
        id:0, name:'', last_name:'', rut:''
       });
       const [dataTutor, setDataTutor] = useState<any>({
        id:0
       });
       const [dataDoctor, setDataDoctor] = useState<any>({
        idarea: 0, id:0
       });

       const handleReset = () => {
        setActiveStep(0);
        setDataPatient({
        id:0
       })
        setDataTutor({
            id:0
           })
        setDataDoctor({
            idarea: 0, id:0
           })
    };


       const steps = [
        {
            label: 'Seleccione  el Paciente',
            description: <StepSearchPatient activeStep={activeStep} setDataPatient={setDataPatient} handleNext={handleNext}/>
        },
        {
            label: 'Asigna un tutor',
            description: <StepSearchTutor dataPatient={dataPatient} handleNext={handleNext} handleBack={handleBack} setDataTutor={setDataTutor}/>,
        },
        {
            label: 'Asigna el doctor',
            description: <StepSearchDoctor setDataDoctor={setDataDoctor} handleNext={handleNext}/>,
        },
    ];

    const GenerateAttention = async() => {
        console.log(dataPatient)
        console.log(dataTutor)
        console.log(dataDoctor)
        console.log(activeStep)
        const dta = {
            idarea: dataDoctor?.idarea, // me falta
            idpatients:dataPatient?.id,
            iddoctor: dataDoctor?.id, 
            idstatus_patient: idStatus,
            idattention_type: idType
        }
        const resp_attention = await attentionService.createAttention(dta);
        // if(resp_attention){
            setSnackBarConfig({...snackBarConfig, open:true, severity:'success', message:'La atención médica ha sido registrada con éxito'})
            handleReset()
        // }
    }
    const createAttetion = () => {
        console.log(dataPatient)
        console.log(dataTutor)
        console.log(dataDoctor)
        console.log(activeStep)
    }

    const getStatusAttention = async() => {
        const resp_status = await patientService.getStatusPatient();
        setDataStatusPatient(resp_status.data)
    }

    const getTypeAttention = async() => {
        const type_attention = await attentionService.getTypeAttention();
        setTypeAttention(type_attention.data)
    }

    const handleChanges = (e) => {
        setIdStatus(e.target.value)
    } 

    const handleChanges2 = (e) => {
        setIdType(e.target.value)
    }
        useEffect(() => {
            getDataInitial();
            getStatusAttention();
            getTypeAttention()
        }, [])

        return (
         <>
            <Protected>
                <Box p={4}>
                    {/* <Button onClick={()=>{createAttetion()}}>prueba</Button> */}
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel
                                    optional={
                                         null
                                    }
                                >
                                    <Typography  sx={{fontWeight:700}}> {step.label} </Typography>

                                </StepLabel>
                                <StepContent>
                                    <Typography>{step.description}</Typography>

                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            {/* <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                            </Button> */}
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                variant='contained'
                                                sx={{  mr: 1 , background: '#FFBB34', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}
                                            >
                                                REGRESAR
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            {/* <Typography>Hemos finalizado todos los pasos,indique el estado del paciente y verifique si los datos son correctos</Typography> */}
                            <Grid container  direction="row" spacing={2} >
                                <Grid item xs={4}>
                                        <Typography>Seleccione el estado del paciente</Typography>
                                        <Select
                                            id="outlined-select-ubicationclinica"
                                            sx={{ width: "200px" }}
                                            // fullWidth
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
                                <Grid item md={6}>
                                <Typography>Seleccione tipo de atención</Typography>
                                        <Select
                                            id="outlined-select-ubicationclinica"
                                            sx={{ width: "200px" }}
                                            // fullWidth
                                            value={idType}
                                            onChange={handleChanges2}
                                            variant="standard"
                                        >
                                            {type_attention.map((option, key) => (
                                                <MenuItem
                                                    sx={{ textAlign: 'center' }}
                                                    key={key} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                </Grid>
                                <Grid item md={12}>
                                        <Stack direction="row" spacing={1}>
                                            <Chip label={`Paciente: ${dataPatient?.name} - ${dataPatient?.rut}`} />
                                            <Chip label={`Tutor: ${dataTutor?.name} - ${dataTutor?.rut}`}  />
                                            <Chip label={`Doctor: ${dataDoctor?.name} - ${dataDoctor?.rut}`}  />
                                        </Stack>
                                </Grid>
                                <Grid item md={8}>
                                <Button onClick={()=>{handleBack()}} variant='contained'  sx={{ background: '#FFBB34', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}>Volver</Button>
                            <Button onClick={()=>{handleReset()}} variant='contained'  sx={{ background: '#FFBB34',ml:2, color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}>Restablecer</Button>
                            
                                </Grid>
                                <Grid item md={4}>
                                <Button onClick={()=>{GenerateAttention()}} variant='contained' sx={{ background: '#3D8BD9', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#155172' } }}>Confirmar</Button>
                           
                                </Grid>

                            </Grid>
                            
                            
                        </Paper>
                    )}
                </Box>
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
            </Protected>
         </>
        );
    };
