import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AccountIcon, NotifyIcon } from "@toolbox/constants/icons";
import { Badge, Button, Grid, useMediaQuery, useTheme } from '@mui/material';
import Fade from '@mui/material/Fade';
import { Link } from 'react-router-dom';
import { ROUTE_ACCOUNT, ROUTE_CONFIGURACION, ROUTE_ENTITY, ROUTE_HOME, ROUTE_NOTIFY, ROUTE_PERFIL, ROUTE_USER_CREATE, ROUTE_USER } from '@/toolbox/constants/route-map';
import { DrawerComponent } from './Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_ARRAY_MY_MENU, KEY_NAVEGACION_SUB_MODULO, KEY_TOKEN_KYTE, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
// import { notifyService } from '@/service/services/Notify.service';
import { authenticationService } from '@/service/services/Authentication.service';
import { ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logokyte from "@assets/img/kyte.png";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {Toaster, toast} from 'react-hot-toast';
import Echo from "laravel-echo";
import {Props} from "./Header.type"
import CircleIcon from '@mui/icons-material/Circle';
// import Pusher from "pusher-js"
// type Props = {
//}
window['Pusher'] = require('pusher-js');

export const HeaderView: React.FC<Props> = (props:any): JSX.Element =>
 {
   const [anchorEl, setAnchorEl] = React.useState(null);
   const isMenuOpen = Boolean(anchorEl);
   const [anchorElNotify, setAnchorElNotify] = React.useState(null);
   const isMenuOpenNotify = Boolean(anchorElNotify);
   const [anchorElAccount, setAnchorElAccount] = React.useState(null);
   const isAccountOpen = Boolean(anchorElAccount);
   const [anchorElCorreos, setAnchorElCorreos] = React.useState(null);
   const isCorreosOpen = Boolean(anchorElCorreos);
   const [notify, setNotify] = useState<any>([])
   const [loading, setLoading] = useState<any>()
   const [dataAccount, setDataAccount] = useState<any>([]);
   const roles = readLocalStorage(KEY_ARRAY_MY_MENU) || [];
   const [submodulo, setSubModulo] = useState<any>(readLocalStorage(KEY_NAVEGACION_SUB_MODULO) || []);
   const [dataRoles, setdataRoles] = useState<any>()
   const [dataContador, setdataContador] = useState<any>(0)
   const [dataNotify, setDataNotify] = useState<any>([])
   const dataUser:any = readLocalStorage(KEY_USER_DATA)

   const handleProfileCorreoOpen = (event) => {
      setAnchorElCorreos(event.currentTarget);
   };
   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleProfileNotifyOpen = (event) => {
      setAnchorElNotify(event.currentTarget);

   };
   const handleProfileAccountOpen = (event) => {
      setAnchorElAccount(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };
   const handleAccountClose = () => {
      setAnchorElAccount(null);
   };

   const handleNotifyClose = () => {
      setAnchorElNotify(null);
   };
   const handleCorreoClose = () => {
      setAnchorElCorreos(null);
   };
   const handleLogout = () => {
      setLoading(true);
      handleAccountClose();
      authenticationService.logout().then(res => {
         setLoading(false);
         if (!res.error) {
            window.location.replace('/');
         }
      })
   }


   const renderNotify = (
      <Menu
         id="fade-menu"
         MenuListProps={{
            'aria-labelledby': 'fade-button',
         }}
         anchorEl={anchorElNotify}
         open={isMenuOpenNotify}
         onClose={handleNotifyClose}
         TransitionComponent={Fade}
      >

         <Grid container flexDirection='row' justifyContent='space-between'>
            <Typography variant='h5' sx={{ ml: 2 }}>Notificaciones</Typography>
            <Button onClick={handleNotifyClose} component={Link} to={ROUTE_NOTIFY}>Ver todo</Button>
         </Grid>
         <List sx={{ width: '100%', minWidth: 340, maxWidth: 360, maxHeight: 480, bgcolor: 'background.paper', alignContent: 'center' }}>
            {dataNotify.map((value, i) => {
               const labelId = `checkbox-list-label-${value}`;
               return (
                  <div key={i}>
                     <ListItem
                        disablePadding
                        sx={{bgcolor:value.status=='1'?'#F5F5F5':'#fff'}}
                        component={Link}
                        to={value.tablaOrigen}
                     >
                        <ListItemButton>
                           <ListItem alignItems="flex-start" component='div'>
                              <ListItemAvatar >
                                 <Avatar sx={{ bgcolor: '#1976D2' }}>{value.emisor.charAt(0)}</Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                  primary={
                                    <React.Fragment>
                                    <Typography
                                       sx={{ display: 'inline' , fontSize:'15px',textDecoration:'none',color:'black'}}
                                    >
                                    {  value.emisor}
                                    </Typography>
                                 </React.Fragment>
                                 }
                                 secondary={
                                    <React.Fragment>
                                       <Typography
                                          sx={{ display: 'inline' }}
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                       >
                                       {value.detalles}
                                       </Typography>
                                    </React.Fragment>
                                 }
                              />
                              {/* <Button>Ir</Button> */}
                           </ListItem>
                           {value.status=='1'&&<CircleIcon color='primary' fontSize='small'/>}
                        </ListItemButton>
                     </ListItem>
                     {/* <p style={{textAlign:'center',fontSize:'13px'}}>{value.fecha_recibido}</p> */}
                     <Divider variant="inset" />
                  </div>
               );
            })}

         </List>
      </Menu>
   );

   const renderMenu = (
      <Menu
         id="fade-menu"
         MenuListProps={{
            'aria-labelledby': 'fade-button',
         }}
         anchorEl={anchorEl}
         open={isMenuOpen}
         onClose={handleMenuClose}
         TransitionComponent={Fade}
      >
         {/* <MenuItem sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleMenuClose} component={Link} to={ROUTE_CAMPAIGN}>Campañas</MenuItem>
         <MenuItem sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleMenuClose} component={Link} to={ROUTE_RULE}>Reglas de Negocio</MenuItem> */}
      </Menu>
   );

   const renderCorreo = (
      <Menu
         id="fade-menu"
         MenuListProps={{
            'aria-labelledby': 'fade-button',
         }}
         anchorEl={anchorElCorreos}
         open={isCorreosOpen}
         onClose={handleCorreoClose}
         TransitionComponent={Fade}
      >
         {/* <MenuItem sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleCorreoClose} component={Link} to={ROUTE_CORREOS}>Correos Entrantes</MenuItem>
         <MenuItem sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleCorreoClose} component={Link} to={ROUTE_ARCHIVADOS}>Correos Archivados</MenuItem>
         <MenuItem sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleCorreoClose} component={Link} to={ROUTE_DESTACADOS}>Correos Destacados</MenuItem> */}
 
      </Menu>
   );

   const DataCuenta = (submenu) => {
      return (
         <MenuItem onClick={handleAccountClose} component={Link} to={submenu.route}>
            {submenu.name}
         </MenuItem>)
      // rol.subMenu.map((rolsubMenu)=>{
      //    console.log(rolsubMenu)
      // })
      //console.log(dataAccount)
      //return(<MenuItem onClick={handleAccountClose} component={Link} to={rol.route}>{rol.name}</MenuItem>)
      //
      // <MenuItem onClick={handleAccountClose} component={Link} to={ROUTE_ENTITY}>Empresas</MenuItem>
      // <MenuItem onClick={handleAccountClose} component={Link} to={ROUTE_USER}>Usuarios</MenuItem>
      // <MenuItem onClick={handleAccountClose} component={Link} to={ROUTE_PROYECCION}>Proyección</MenuItem>
      // <MenuItem onClick={handleAccountClose} component={Link} to={ROUTE_SINCRONIZACION}>Sincronización</MenuItem>
      // <MenuItem onClick={handleAccountClose} component={Link} to={ROUTE_CONFIGURACION}>Configuración</MenuItem>
   }

   const renderAccount = (
      <Menu
         id="fade-menu"
         MenuListProps={{
            'aria-labelledby': 'fade-button',
         }}
         anchorEl={anchorElAccount}
         open={isAccountOpen}
         onClose={handleAccountClose}
         TransitionComponent={Fade}
      >


         {submodulo.route_navigators.map((modulo,i) => {
            if (modulo === ROUTE_PERFIL) {
               return (
                  <MenuItem  key={i} sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleAccountClose} component={Link} to={ROUTE_PERFIL}>Perfil</MenuItem>
               )
            }
            if (modulo === ROUTE_ENTITY) {
               return (
                  <MenuItem  key={i} sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleAccountClose} component={Link} to={ROUTE_ENTITY}>Empresas</MenuItem>
               )
            }
            if (modulo === ROUTE_USER) {
               return (
                  <MenuItem  key={i} sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleAccountClose} component={Link} to={ROUTE_USER}>Usuarios</MenuItem>
               )
            }

            if (modulo === ROUTE_CONFIGURACION) {
               return (
                  <MenuItem  key={i} sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleAccountClose} component={Link} to={ROUTE_CONFIGURACION}>Configuración</MenuItem>
               )
            }
         })}

         <MenuItem onClick={handleLogout} sx={{color:'#bf6c00', fontWeight:'700', fontSize:'0.95em'}}>Cerrar Sesión</MenuItem>
      </Menu>
   );


   const RoleHeader = (rol, i) => {
      if (rol.subMenu) {
         if (rol.onClick === 'handleProfileMenuOpen') {
            //setdataRoles(rol.subMenu)
            return (
               <Button
               endIcon={
                  <KeyboardArrowDownIcon/>
               } key={i} color="inherit" sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleProfileMenuOpen}>
                  {rol.name}
               </Button>
            )
         }else if(rol.onClick === 'handleProfileCorreoOpen'){
            return (
               <Button
               endIcon={
                  <KeyboardArrowDownIcon/>
               } key={i} color="inherit" sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleProfileCorreoOpen}>
                  {rol.name}
               </Button>
            )
         }
         else {
            /// setdataRoles(rol.subMenu)
            return (
               <Button endIcon={
                  <KeyboardArrowDownIcon/>
               } key={i} color="inherit" sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} onClick={handleProfileAccountOpen}>
                  {rol.name}
               </Button>
            )
         }
      }
      return (
         <Button key={i} color="inherit" sx={{color:'#5C6C85', fontWeight:'700', fontSize:'0.95em'}} component={Link} to={rol.route}>
            {rol.name}
         </Button>
      )

   }

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down("md"));
   const data = readLocalStorage(KEY_USER_DATA)

   return (
      <div>
         <Box sx={{ flexGrow: 1, padding: 4 }}>
            <AppBar sx={{ bgcolor: '#fff' }}>
               <Toolbar sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', background: '#fff' }}>
                  <Grid>
                     {/* <Button onClick={() => {
                        toast.success("This toast is super big. I don't think anyone could eat it in one bite.\n\nIt's larger than you expected. You eat it but it does not seem to get smaller.", {
                           duration: 4000,
                           icon: '🛎️',
                           style: {
                              borderRadius: '10px',
                              background: '#333',
                              color: '#fff',
                            },
                            iconTheme: {
                              primary: '#713200',
                              secondary: '#FFFAEE',
                            },
                        })
                     }}>
                        sssss
                     </Button> */}
                     <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                     />
                     <Button color="inherit" component={Link} to={ROUTE_HOME}>
                        <Typography
                           variant="h6"
                           noWrap
                           component="div"
                           sx={{ display: { xs: 'block', sm: 'block' }, color:'#007ea7', fontWeight:'700', fontSize:'1.9em' }}
                        >
                           KYTE CRM
                        </Typography>
                        {/* <Box
                        component="img"
                        sx={{
                           height: " 50px"
                        }}
                        src={logokyte}>
                     </Box> */}
                     </Button>
                     <IconButton
                        size="large"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleProfileNotifyOpen}
                        sx={{ ml: 1 }}
                     >
                        {/* <Badge badgeContent={props.$store.NotificationReducer.notifications} color='error' overlap="circular">
                        <CircleNotificationsIcon sx={{color:'#007EA7'}}fontSize={'large'}/>
                        </Badge> */}

                     </IconButton>
                  </Grid>
                  {
                     isMobile ? (
                        <DrawerComponent />
                     ) : (
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }} >
                           <Box sx={{ display: { xs: 'block', md: 'flex' } }}>
                              {roles.map((rol, i) => (
                                 RoleHeader(rol, i)
                              ))}
                              {/* <Button color="inherit" component={Link} to={ROUTE_HOME}>
                                 Inicio
                              </Button>
                              <Button color="inherit" component={Link} to={ROUTE_ACTIVIDADES}>
                                 Actividades
                              </Button>
                              <Button color="inherit" component={Link} to={ROUTE_PROGRAMATION}>
                                 Programación
                              </Button>
                              <Button color="inherit" component={Link} to={ROUTE_CONTACT}>
                                 Contactos
                              </Button>
                              <Button color="inherit"
                                 onClick={handleProfileMenuOpen}>
                                 Negocios
                              </Button>
                               <Button color="inherit" component={Link} to={ROUTE_PRODUCT}>
                                 Productos
                              </Button>
                              <Button color="inherit" component={Link} to={ROUTE_COTIZACION_INTERNA}>
                                 Cotización
                              </Button>
                              <Button color="inherit" onClick={handleProfileAccountOpen}>
                                 Mi cuenta
                              </Button> */}
                           </Box>
                        </Box>
                     )
                  }
               </Toolbar>
            </AppBar>
            {renderMenu}
            {renderAccount}
            {renderNotify}
            {renderCorreo}
         </Box>
      </div>
   );
}
