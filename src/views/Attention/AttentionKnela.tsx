import { Protected } from "@/components/layout/Protected";
import { attentionService } from "@/service/services/Attention.service";
import { patientService } from "@/service/services/Patient.service";
import { Alert, Box, Button, Card, CardActionArea, CardMedia, Chip, Grid, MenuItem, Paper, Select, Snackbar, Stack, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StepSearchDoctor, StepSearchPatient, StepSearchTutor } from "./Steps";
import { StepConfirmation } from "./Steps/StepConfirmation";
import { StepConfirmationKnela } from "./Steps/StepConfirmationKnela";
import { StepSearchTeamMedical } from "./Steps/StepSearchTeamMedical";

export const AttentionKnelaView = (props) => {
    const [dataInitial, setDataInitial] = useState<any>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [dataStatusPatient,setDataStatusPatient] = useState<any>([]);
    const [idStatus, setIdStatus] = useState<any>(3)
    const [typeSeguro,setTypeSeguro] = useState<any>([
        { id:1, name: 'ISAPRE'},
        { id:2, name: 'FONASA'}
    ])
    const [idType,setIdType] = useState<any>(1)
    const [snackBarConfig, setSnackBarConfig] = useState<any>({
        open: false,
        severity: 'error',
        message: 'Error',
        autoHideDuration: 3000,
    })

    const [observations, setObservations] = useState<any>({text:''})
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
        const [dataMedicalTeam, setDataMedicalTeam] = useState<any>([]);


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

    
    const handleChanges = (e) => {
        setIdStatus(e.target.value)
    } 

    const handleChanges2 = (e) => {
        setIdType(e.target.value)
    }
    
    const GenerateAttention = async(dataObservation, dataArea) => {
        console.log(dataPatient)
        console.log(dataTutor)
        console.log(dataDoctor)
        console.log(activeStep)

        //validar que cierto campos esten rellenados
        const dta = {
            idarea: dataArea.id, // me falta
            idpatients:dataPatient?.id,
            iddoctor: null, 
            idtutor: dataPatient?.tutor_id,
            idstatus_patient: idStatus,
            idtypeSeguro: dataPatient?.idTypeSeguro,
            observations: dataObservation.text,
            
        }
        console.log(dta)
        const resp_attention = await attentionService.createAttention(dta);
        // if(resp_attention){
            setSnackBarConfig({...snackBarConfig, open:true, severity:'success', message:'La atención médica ha sido registrada con éxito'})
            handleReset()
        // }
    }

    const steps = [
        {
            label: 'Seleccione  el Paciente',
            description: <StepSearchPatient activeStep={activeStep} setDataPatient={setDataPatient} handleNext={handleNext}/>
        },
        {
            label: 'Datos Adicionales',
            description: <StepConfirmationKnela 
            dataDoctor={dataDoctor} 
            dataTutor={dataTutor} 
            dataPatient={dataPatient} 
            dataStatusPatient={dataStatusPatient}
            idStatus={idStatus}
            handleChanges={handleChanges}
            typeSeguro={typeSeguro}
            idType={idType}
            handleChanges2={handleChanges2}
            GenerateAttention={GenerateAttention}
            handleReset={handleReset}
            handleBack={handleBack}
            handleInput={handleInput}
            observations={observations}/>,
        },
    ];

    
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

    // const getTypeAttention = async() => {
    //     const type_attention = await attentionService.getTypeAttention();
    //     setTypeAttention(type_attention.data)
    // }

        useEffect(() => {
            getDataInitial();
            getStatusAttention();
            // getTypeAttention()
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

                                    {/* <Box sx={{ mb: 2 }}>
                                        <div>
                                           {index != 3 && <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                variant='contained'
                                                sx={{  mr: 1 , background: '#FFBB34', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}
                                            >
                                                REGRESAR
                                            </Button>}
                                            { index == 1 && <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{  mr: 1 , background: '#FFBB34', color: '#fff', mt: '10px', '&:hover': { bgcolor: '#bf6c00' } }}
                                            >
                                                {'OMITIR'}
                                            </Button>}
                                        </div>
                                    </Box> */}
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                   
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
