import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import * as React from 'react';
import { Box, List, ListItemText } from '@mui/material';
//
import { ListItemIcon, ListItemButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import BadgeIcon from '@mui/icons-material/Badge';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ContactsIcon from '@mui/icons-material/Contacts';
import PeopleIcon from '@mui/icons-material/People';
import HandymanIcon from '@mui/icons-material/Handyman';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThreePIcon from '@mui/icons-material/ThreeP';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import CampaignIcon from '@mui/icons-material/Campaign';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
// import { StyledNavItem, StyledNavSubItem,StyledNavItemIcon } from './NavSection-styles';
// import SvgColor from '../../components/svg';
// import WidgetsIcon from '@mui/icons-material/Widgets';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const rutasAdmin = [
  {
    id:1,
    name: "Maestros",
    icon: <HandymanIcon />,
    rutas: [
      {
        name_ruta: "Areas",
        location: "/areas",
        icon: <GroupIcon/>,
      },
      {
        name_ruta: "Especialidades",
        location: "/especialidades",
        icon: <BadgeIcon/>,
      },
      {
        name_ruta: "Doctores",
        location: "/doctores",
        icon: <AssignmentIndIcon/>,
      },
      {
        name_ruta: "Pacientes",
        location: "/pacientes",
        icon: <ContactsIcon/>,
      },
      {
        name_ruta: "Profesionales",
        location: "/profesionales",
        icon: <PeopleIcon/>,
      }
    ] 
  },
  {
    id:2,
    name: "Atenciones",
    icon: <AddToQueueIcon/>,
    rutas: [
      {
        name_ruta: "Crear Atenciones",
        location: "/crear-atenciones",
        icon: <AddCommentIcon/>,
      },
      {
        name_ruta: "Gestión de Atenciones",
        location: "/gestion-atenciones",
        icon: <ThreePIcon/>,
      }
    ] 
  },
  {
    id:2,
    name: "Reporte",
    icon: <DashboardIcon/>,
    rutas: [
      {
        name_ruta: "Atenciones",
        location: "/reporte-atenciones",
        icon: <AddToQueueIcon/>,
      },
      {
        name_ruta: "Chats Cerrados",
        location: "/chats-cerrados",
        icon: <ChatIcon/>,
      }
    ] 
  }
]


const rutasSuperAdmin = [
  {
    id:1,
    name: "Maestros",
    icon: <HandymanIcon />,
    rutas: [
      {
        name_ruta: "Centro Medico",
        location: "/centro-medico",
        icon: <LocalHospitalIcon/>,
      },
      {
        name_ruta: "Areas",
        location: "/areas",
        icon: <GroupIcon/>,
      },
      {
        name_ruta: "Especialidades",
        location: "/especialidades",
        icon: <BadgeIcon/>,
      },
      {
        name_ruta: "Doctores",
        location: "/doctores",
        icon: <AssignmentIndIcon/>,
      },
      {
        name_ruta: "Pacientes",
        location: "/pacientes",
        icon: <ContactsIcon/>,
      },
      {
        name_ruta: "Profesionales",
        location: "/profesionales",
        icon: <PeopleIcon/>,
      }
    ] 
  },
  {
    id:2,
    name: "Doctores Independientes",
    icon: <PermContactCalendarIcon/>,
    rutas: [
      {
        name_ruta: "Solicitudes",
        location: "/doc-ind-solicitudes",
        icon: <AddCommentIcon/>,
      },
      {
        name_ruta: "Control",
        location: "/membresias",
        icon: <ThreePIcon/>,
      }
    ] 
  },
  {
    id:2,
    name: "Alertas",
    icon: <CampaignIcon/>,
    rutas: [
      {
        name_ruta: "Gestión de Alertas",
        location: "/gestion-alertas",
        icon: <TipsAndUpdatesIcon/>,
      }
    ] 
  }
]


export default function NavSection() {
  const history = useHistory()
  const [ruta, setRuta] = React.useState('');
  const data_user = readLocalStorage(KEY_USER_DATA);
  const type_user = data_user.user.role;
  const [rutasHeader, setRutasHeader] = React.useState([])

  const validateType = () => {
    switch (type_user) {
       case ROLE_SUPER_ADMIN:
         setRutasHeader(rutasSuperAdmin)
          break;
       case ROLE_ADMIN:
        setRutasHeader(rutasAdmin)
          break;
      default:
        console.log('vamos a ver que ponemos')
        break;
    }
 }
 
 React.useEffect(()=>{
  validateType();
 },[])
  

  const renderPrueba =
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {
          rutasHeader.map((value) => {
           
          return(
          <>
          <ListItemButton
            // component={RouterLink}
            // to={'/'}
            sx={{
              color: ruta === value.name && 'text.primary',
              bgcolor: ruta === value.name && 'action.selected',
              fontWeight: ruta === value.name && 'fontWeightBold',
              height: 48,
              position: 'relative',
              textTransform: 'capitalize',
              // color: 'secondary',
              borderRadius: 2,
            }}
            onClick={() => {
              if (ruta === value.name) {
                setRuta('')
              } else {
                setRuta(value.name)
              }
            }}
           
          >
              <ListItemIcon
               sx={{
                width: 22,
                height: 22,
                color: 'inherit',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >{value.icon}</ListItemIcon>

              <ListItemText disableTypography primary={value.name} />  
          </ListItemButton>

          {ruta === value.name &&
              value.rutas.map((item)=>{
               return(
                <ListItemButton
                onClick={()=>{history.push(item.location)}}
                // to={item.location}
                sx={{
                  height: 48,
                  position: 'relative',
                  textTransform: 'capitalize',
                  borderRadius: 2,
                  marginLeft: '35px',
                  '&.active': {
                    color: 'text.primary',
                    bgcolor: 'action.selected',
                    fontWeight: 'fontWeightBold',
                  },
                }}
              >
                <ListItemIcon
                sx={{
                  width: 22,
                  height: 22,
                  color: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >{item.icon}</ListItemIcon>

                <ListItemText disableTypography primary={item.name_ruta} />
              </ListItemButton>
               )
              })
              }
          </>
            
          )
          })
        }
      </List>
    </Box>



  return (
    renderPrueba
  );
}