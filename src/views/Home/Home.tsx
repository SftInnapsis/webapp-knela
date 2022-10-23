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
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_ARRAY_MY_MENU, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { SpinnerGrow } from '@/components/common/Spinner';
import { Chart } from "react-google-charts";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import { moneyFormatInt } from '@/toolbox/helpers/money.helper';
import logokyte from "@assets/img/vacio.png";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { HomeDoctor } from './Doctor';

export const HomeView: React.FC<Props> = (props: any): JSX.Element => {
   const { MessageReducer='' } = props;
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [anchorElLeads, setAnchorElLeads] = React.useState(null);
   const [anchorElLeadsChannel, setAnchorElLeadsChannel] = React.useState(null);
   const [openView, setOpenView] = useState(false);

   // useEffect(() => {
   //    console.log(props.$action.getMessagetChat(9))

   // }, [])
   //  console.log(MessageReducer);
   return (
      <Protected>

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
         <HomeDoctor />
         {/* <div>{MessageReducer.messageChats}</div> */}
      </Protected>
   )
};

