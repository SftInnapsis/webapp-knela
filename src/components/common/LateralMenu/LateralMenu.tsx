import { Protected } from '@/components/layout/Protected';
import { useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { AccountIcon, NotifyIcon, SettingIcon, UserIcon } from '@/toolbox/constants/icons';
import { useLocation } from 'react-router';
import { ROUTE_CONFIGURACION, ROUTE_ENTITY, ROUTE_ENTITY_USERS, ROUTE_ENTITY_CREATE, 
   ROUTE_PERFIL, ROUTE_USER, ROUTE_USER_CREATE, ROUTE_USER_UPDATE, ROUTE_ENTITY_UPDATE } from '@/toolbox/constants/route-map';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import SyncIcon from '@mui/icons-material/Sync';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BuildIcon from '@mui/icons-material/Build';
// import BusinessIcon from '@mui/icons-material/Business';
import { useLocalStorage } from '@/toolbox/hooks/local-storage.hook';
import { KEY_ARRAY_MY_MENU, KEY_NAVEGACION_SUB_MODULO, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';

type Props = {
}

export const MenuLateral: React.FC<Props> = (
   props: Props
): JSX.Element => {

   const location = useLocation<any>();
   const ruta = location.pathname;
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   const [dataUser] = useLocalStorage(KEY_USER_DATA, undefined);
   const [submodulo, setSubModulo] = useState<any>(readLocalStorage(KEY_NAVEGACION_SUB_MODULO) || []);

   return (

      <Box sx={{ width: '100%', bgcolor: 'background.paper', mr: 5 }}>
         <nav aria-label="main mailbox folders">
            <List sx={{ display: { xs: 'flex', md: 'block' } }}
            >
               {submodulo.route_navigators.map((modulo, i) => {
                  if (modulo == ROUTE_PERFIL) {
                     return (
                        <ListItem
                           key={i}
                           disablePadding
                           sx={{ border: '0.5px solid #eff3f5', bgcolor: ruta == ROUTE_PERFIL ? '#3F9BCC' : '#fff', maxWidth: { xs: '20%', md: '100rem' } }}
                        >
                           <ListItemButton
                              component={Link} to={ROUTE_PERFIL}
                           >
                              <ListItemIcon >
                                 <AccountCircleIcon sx={{ color: ruta == ROUTE_PERFIL ? '#fff' : '#000' }} />
                              </ListItemIcon>
                              {isMobile ? (<></>) : (<ListItemText primary="Perfil" sx={{ color: ruta == ROUTE_PERFIL ? '#fff' : '#000' }} />)}
                           </ListItemButton>
                        </ListItem>
                     )

                  }
                  if (modulo == ROUTE_ENTITY) {
                     return (
                        <ListItem disablePadding
                           key={i}
                           sx={{ border: '0.5px solid #eff3f5', bgcolor: ruta == ROUTE_ENTITY ? '#3F9BCC' : ruta == ROUTE_ENTITY_USERS ? '#3F9BCC' : ruta == ROUTE_ENTITY_CREATE ? '#3F9BCC' : ruta == ROUTE_ENTITY_UPDATE ? '#3F9BCC' : '#fff', maxWidth: { xs: '20%', md: '100rem' } }}
                        >
                           <ListItemButton
                              component={Link} to={ROUTE_ENTITY}
                           >
                              <ListItemIcon>
                                 <BusinessIcon sx={{ color: ruta == ROUTE_ENTITY ? '#fff' : ruta == ROUTE_ENTITY_USERS ? '#fff' : ruta == ROUTE_ENTITY_CREATE ? '#fff' : ruta == ROUTE_ENTITY_UPDATE ? '#fff' : '#000' }} />
                              </ListItemIcon>
                              {isMobile ? (<></>) : (<ListItemText primary="Empresas" sx={{ color: ruta == ROUTE_ENTITY ? '#fff' : ruta == ROUTE_ENTITY_USERS ? '#fff' : ruta == ROUTE_ENTITY_CREATE ? '#fff' : ruta == ROUTE_ENTITY_UPDATE ? '#fff' : '#000' }} />)}
                           </ListItemButton>
                        </ListItem>
                     )

                  }
                  if (modulo == ROUTE_USER) {
                     return (
                        <ListItem disablePadding
                           key={i}
                           sx={{ border: '0.5px solid #eff3f5', bgcolor: ruta == ROUTE_USER ? '#3F9BCC' : ruta == ROUTE_USER_CREATE ? '#3F9BCC' : ruta == ROUTE_USER_UPDATE ? '#3F9BCC' : '#fff', maxWidth: { xs: '20%', md: '100rem' } }}
                        >
                           <ListItemButton
                              component={Link} to={ROUTE_USER}
                           >
                              <ListItemIcon>
                                 <GroupIcon sx={{ color: ruta == ROUTE_USER ? '#fff' : ruta == ROUTE_USER_CREATE ? '#fff' : ruta == ROUTE_USER_UPDATE ? '#fff' : '#000' }} />
                              </ListItemIcon>
                              {isMobile ? (<></>) : (<ListItemText primary="Usuarios" sx={{ color: ruta == ROUTE_USER ? '#fff' : ruta == ROUTE_USER_CREATE ? '#fff' : ruta == ROUTE_USER_UPDATE ? '#fff' : '#000' }} />)}
                           </ListItemButton>
                        </ListItem>
                     )

                  }

                
               })}

            </List>
         </nav>
      </Box>
   )
}
