import React, { useEffect, useRef, useState } from 'react';

import { Protected } from '@components/layout/Protected';
import { authenticationService } from '@service/services/Authentication.service';
import { Loading } from "@components/common/Loading";
import Card from "@mui/material/Card";
import { Props } from './Home.type'
import Contactos from "@assets/img/clientes.png";
import Productos from "@assets/img/productos.png";
import Negocios from "@assets/img/negocios.png";
import Vacio from "@assets/img/vacio.png";
import Typography from "@mui/material/Typography";
import { Alert, Backdrop, CircularProgress, Container, Divider, Grid, IconButton, Menu, MenuItem, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useLocalStorage } from '@/toolbox/hooks/local-storage.hook';
import { readLocalStorage, saveLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_ARRAY_MY_MENU, KEY_RUTA, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { SpinnerGrow } from '@/components/common/Spinner';
import { Chart } from "react-google-charts";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import { moneyFormatInt } from '@/toolbox/helpers/money.helper';
import logokyte from "@assets/img/vacio.png";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { HomeDoctor } from './Doctor';
import { HomeTutor } from './Tutor' ;
import { HomePatient } from './Paciente';
import { ROLE_DOCTOR, ROLE_SUPER_ADMIN, ROLE_TUTOR, ROLE_PACIENTE, ROLE_DOCTOR_IND } from '@/toolbox/defaults/static-roles';
import { MedicalCenter } from '../MedicalCenter';
import { ROLE_ADMIN, ROLE_PROFESSIONAL } from '@/toolbox/constants/role-type';
import { Doctor } from '../Doctors';
import { PatientMaster } from '../PatientMaster';
import { DoctorView } from '../Doctors/Doctors';
import { useHistory } from 'react-router-dom';
import { AttentionView } from '../Attention';
import { AttentionKnelaView } from '../Attention/AttentionKnela';
import { HomeDoctorIndependiente } from './DoctorIndependiente';

export const HomeView: React.FC<Props> = (props: any): JSX.Element => {
   const { MessageReducer='' ,MedicalCenterReducer} = props;
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [anchorElLeads, setAnchorElLeads] = React.useState(null);
   const [anchorElLeadsChannel, setAnchorElLeadsChannel] = React.useState(null);
   const [openView, setOpenView] = useState(false);

   // useEffect(() => {
   //    console.log(props.$action.getMessagetChat(9))

   // }, [])
   //  console.log(MessageReducer);
   const dataUser: any = readLocalStorage(KEY_USER_DATA);
   const type_user = dataUser.user.role
   console.log(type_user)

   const validateHome = ( ) => {

      // if(type_user == ROLE_ADMIN){
      //    return <Doctor/>
      // }

      switch(type_user){
         case ROLE_SUPER_ADMIN:
            console.log('superadmin')
            return <MedicalCenter/>
         case ROLE_ADMIN:
             saveLocalStorage(KEY_RUTA,'Atenciones')
             const data_user = readLocalStorage(KEY_USER_DATA)
             if(data_user?.user?.medical_center[0]?.type_flow == 1){
               return <AttentionView/>
            }else{
               return <AttentionKnelaView/>
            }

         case ROLE_DOCTOR:
            console.log('doctor')
            return <HomeDoctor/>
         case ROLE_PROFESSIONAL:
            console.log('profesional')
            return <HomeDoctor/>
         case ROLE_TUTOR:
            console.log('tutor')
            return <HomeTutor/>
         case ROLE_PACIENTE:
            console.log('paciente')
            return<HomePatient/>
         case ROLE_DOCTOR_IND:
            console.log('doctor_indp')
            return<HomeDoctorIndependiente/>
            default:
               console.log('default')
               return <HomeDoctor/>
      }
   }
   return (
      <>
         <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openView}
         >
            <Grid container
               direction="row"
               justifyContent="center"
               alignItems="center">
               <SpinnerGrow />
               <h1 style={{ marginLeft: '10px' }}><strong>Cargando...</strong></h1>

            </Grid>
         </Backdrop>
        {validateHome()}
         {/* <div>{MessageReducer.messageChats}</div> */}
      </>
   )
};

