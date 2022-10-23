import React, { useRef, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HeaderView } from '@/components/common/Header';
import Nav from '../../common/Nav/Nav'
// import { LateralMenu } from '@components/common/LateralMenu';
// import { NavBar } from '@components/common/Navbar';
import { Loading } from "@components/common/Loading";
import { SnackDialog, SanckRef } from "@components/common/SnackDialog";
import { APP_DESKTOP_WIDTH } from '@defaults/app';
import { KEY_TOOGLE_MENU } from '@constants/local-storage';
import { ROUTE_LOGIN } from '@constants/route-map';
import { useLocalStorage } from '@hooks/local-storage.hook';
import { authenticationService } from '@service/services/Authentication.service';

import './Layout.sass';
import { Backdrop, CircularProgress } from '@mui/material';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { styled } from '@mui/material/styles';
interface ProtectedProps {
   className?: string,
   children?: React.ReactNode | React.ReactNode[] | null,
}

let cleanInterval: any;

export const Protected: React.FC<ProtectedProps> = (
   props: ProtectedProps
) : JSX.Element | any => {

   //nuevo style header
   const [openNew, setOpenNew] = useState(false);
   const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// hasta aqui

   const [toogleMenu, changeMenu] = useLocalStorage<Boolean>(KEY_TOOGLE_MENU, false);
   const [loadData, setLoadData]  = useState<boolean>(false);
   const [open, setOpen]  = useState<boolean>(false);
   const modalStatus = useRef<SanckRef>(null);
   const dataUser    = authenticationService.currentUserValue;
   const authUser    = authenticationService.authCookie();

   const history  = useHistory();
   const location = useLocation();

   const didMount = async () : Promise<void> => {
      (screen.width < APP_DESKTOP_WIDTH) && changeMenu(false);
      if (!dataUser || !authUser) {
         authenticationService.logout();
         history.replace(ROUTE_LOGIN);
      }
   }
   const didUnmount = async () => {
      clearInterval(cleanInterval);
   }

   const logout = async () => {
      try {
         setLoadData(true);
         const rpta = await authenticationService.logout();
         setLoadData(false);
         if (!!rpta.error) {
            modalStatus.current?.showDialog('error','Error',rpta.error.message);
         } else {
            let it = 2;
            modalStatus.current?.showDialog('success','Exito','Cerrando Sesión ... '+(it+1));
            cleanInterval = setInterval(() => {
               if (it <= 0) {
                  afterClose('success');
               } else {
                  modalStatus.current?.showDialog('success','Exito','Cerrando Sesión ... '+it);
                  it--;
               }
            }, 1000)
         }
      } catch (e) {
         setLoadData(false);
         modalStatus.current?.showDialog('error','Error','Ocurrió problemas al Cerrar Sesión');
      }
   }
   const afterClose = (variant: any) => {
      if (variant === 'success') {
         history.replace(ROUTE_LOGIN);
         clearInterval(cleanInterval);
      }
   }


   useEffect(() => {
      didMount();
      return () => { didUnmount() }
   }, // eslint-disable-next-line
   []);
//    const local=readLocalStorage(KEY_SINCRONIZACION);
//    console.log(local)
//    useEffect(() => {
// //   setOpen(true);
//    },[local]);

   return (
      <>
       <StyledRoot>
      {/* <Header onOpenNav={() => setOpen(true)} /> */}

      <Nav openNav={openNew} onCloseNav={() => setOpenNew(false)} />

      <Main>
     { props.children}
      </Main>
    </StyledRoot>
         {/* <div className = "l-protected"> */}
            {/* <div
               className = {"l-protected__bg" + (toogleMenu ? ' --open' : '')}
               onClick = {() => changeMenu(false)}
            /> */}
            {/* <LateralMenu
               location = {location}
               history  = {history}
               openMenu = {toogleMenu}
               loadApp  = {true}
               onToogleMenu = {(a: Boolean) => changeMenu(a)}
            /> */}
             {/* <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.tooltip + 1 }}
                  open={open}
               >
                  <CircularProgress color="inherit" sx={{mr:2}}/>
                  <h1>Sincronizando...</h1>
               </Backdrop> */}
            {/* <div className={"l-protected__page "+ props.className}> */}

               {/* <HeaderView/> */}

               {/* <div className="l-protected__main-page"> */}
                  {/* <div className="l-protected__content"> */}
                     {/* {props.children} */}
                  {/* </div> */}
               {/* </div> */}
            {/* </div> */}
            {/* <SnackDialog ref = {modalStatus} onClose={afterClose}/>
            {loadData && <Loading title="Cerrando Sesión" />} */}
         {/* </div> */}
      </>
   );
}
