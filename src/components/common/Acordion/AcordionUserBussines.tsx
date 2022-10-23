import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import {ExpandMoreIcon} from "@toolbox/constants/icons";
import { Grid } from '@mui/material';
import {TableData} from '@components/common/Table/index';
import { lightBlue } from '@mui/material/colors';
import { VisibilityIcon, PencilIcon } from "@toolbox/constants/icons";


const dataDetailCampaing = [
   {
       nombre: 'Plan de Mantencion 24 meses Purificador Twist-In  - ISABEL MARGARITA PEÑA CARRASCO',
       etapa: 'Calificado',
       fechafin: '2019-07-01',
       cantidad:'5000',
       tipo: 'Anulada',

     },
     {
       nombre: 'Plan de Mantencion 24 meses Purificador Twist-In - PAULA ANDREA ALBAYAY CARMONA',
       etapa: 'Calificado',
       fechafin: '2019-07-01',
       cantidad:'5000',
       tipo: 'Anulada',

     },
     {
       nombre: 'Plan de Mantencion 24 meses Purificador Twist-In - RICHARD SANDOVAL JARA',
       etapa: 'Calificado',
       fechafin: '2019-07-01',
       cantidad:'5000',
       tipo: 'Anulada',

     },
     {
       nombre: 'Plan de Mantencion 24 meses Purificador Twist-In - FERNANDO ORELLANA VIDAL',
       etapa: 'Calificado',
       fechafin: '2019-07-01',
       cantidad:'5000',
       tipo: 'Anulada',

     },
     {
       nombre: 'Plan de Mantencion 24 meses Purificador Twist-In - Pablo Aguilera Cartes',
       etapa: 'Calificado',
       fechafin: '2019-07-01',
       cantidad:'5000',
       tipo: 'Anulada',

     },
     {
       nombre: 'Plan de Mantencion 24 meses Purificador Twist-In - BERNARDO MAURICIO JEREZ MUNOZ',
       etapa: 'Calificado',
       fechafin: '2019-07-01',
       cantidad:'5000',
       tipo: 'Anulada',

     },
     {
       nombre: 'Plan de Mantencion 24 meses Purificador Twist-In  - PAMELA ANDREA PARADA PIMENTEL',
       etapa: 'Calificado',
       fechafin: '2019-07-01',
       cantidad:'5000',
       tipo: 'Anulada',

     },

 ]
 const header=[{name: 'nombre',label:'Nombre'},{name:'etapa', label:'Etapa'},{name:'fechafin',label:'Fecha de Fin'},{name:'cantidad',label:'Cantidad'},{name:'tipo',label:'Tipo'}];
 const dataAction=[
     //   {name: 'delete',color:'secondary'},
       { name: 'edit',color:'primary' },
       {name: 'view',color:'success'}
       ]
type Props = {
    header?: Array<any>
    //dataDetalle?:any
}

const dataUser=[{name:'eguerrero@softnet.cl'},{name:'fvidela@softnet.cl.cl'}]



export const AcordionUserBussines: React.FC<Props> = (
): JSX.Element => {
    return (
        <div>
            <Grid >
                {dataUser.map((data, i) => {
                    return (
                        <Accordion sx={{ bgcolor: lightBlue[50] }} key={i}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography ><strong> Clientes asignados a {data.name}</strong></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableData
                                    header={header}
                                    data={dataDetailCampaing}
                                    action={dataAction} />
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </Grid>
        </div>
    );
}
