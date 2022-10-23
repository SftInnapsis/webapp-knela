import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import * as React from 'react';
import { Box, List, ListItemText } from '@mui/material';
//
import { ListItemIcon, ListItemButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { StyledNavItem, StyledNavSubItem,StyledNavItemIcon } from './NavSection-styles';
// import SvgColor from '../../components/svg';
// import WidgetsIcon from '@mui/icons-material/Widgets';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
export default function NavSection() {
  const history = useHistory()
  const [ruta, setRuta] = React.useState('');
  const [tipo, setTipo] = React.useState(1);

  const rutasHeader = [
    {
      id:1,
      name: "Maestros",
      icon: <AccountCircleIcon sx={{color:'#bdbdbd'}}/>,
      rutas: [
        {
          name_ruta: "Areas",
          location: "/areas",
          icon: <AccountCircleIcon/>,
        },
        {
          name_ruta: "Especialidades",
          location: "/especialidades",
          icon: <AccountCircleIcon/>,
        }
      ] 
    },
    {
      id:2,
      name: "Atenciones",
      icon: <AccountCircleIcon/>,
      rutas: [
        {
          name_ruta: "Crear Atenciones",
          location: "/areas",
          icon: <AccountCircleIcon/>,
        },
        {
          name_ruta: "Gestión de Atenciones",
          location: "/especialidades",
          icon: <AccountCircleIcon/>,
        }
      ] 
    }
  ]

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