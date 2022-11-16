
import { useState } from "react";
import { NotificacionModal } from "./NotificationModal";
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Grid, Badge } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { bgBlur } from './Header-styles';
import AccountPopover from './AccountPopover'
import Paper from '@mui/material/Paper';
import NotificationsIcon from "@mui/icons-material/Notifications";
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import { ComboBox } from '../ComboBox/ComboBox';
import { KEY_MEDICAL_CENTER, KEY_OPTIONS_MEDICAL_CENTER, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "@/toolbox/constants/role-type";
import { ROUTES_FOR_ADMIN, ROUTES_FOR_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';



// ----------------------------------------------------------------------

// HeaderView.propTypes = {
//   onOpenNav: PropTypes.func,
// };
export const HeaderView = (props: any): JSX.Element => {

  const [modalNotification, setModalNotification] = useState(false);

  const data_user = readLocalStorage(KEY_USER_DATA);
  const NAV_WIDTH = data_user.user.role == ROLE_SUPER_ADMIN || data_user.user.role == ROLE_ADMIN ? 350 : 0;

  const HEADER_MOBILE = 64;

  const HEADER_DESKTOP = 92;

  const StyledRoot = styled(AppBar)(({ theme }) => ({
    //...bgBlur({ color: theme.palette.background.default }),
    backdropFilter: `blur(6px)`,
    WebkitBackdropFilter: `blur(6px)`,
    backgroundColor: '#fff',
    //  alpha('#fff', 0.8),
    paddingTop: 15,
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    },
  }));



  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    textAlign: 'center',
    //color: theme.palette.text.secondary,
  }));


  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: HEADER_DESKTOP,
      padding: theme.spacing(0, 5),
    },
  }));
  
  return (
    <header>
      <StyledRoot>
        <StyledToolbar>

          <IconButton
            //  onClick={}
            sx={{
              mr: 1,
              color: 'text.primary',
              display: { lg: 'none' },
            }}
          >
            {/* <Iconify icon="eva:menu-2-fill" /> */}
            <MenuIcon />
          </IconButton>

          <Typography
            sx={{ color: "#28c4ac", fontWeight: 700 }}
            variant={"h3"}
          >
          {data_user?.user?.name+' '+data_user?.user?.last_name}
          </Typography>
          {<Box sx={{ flexGrow: 1 }} />}

          <Grid item xs={2} md={6} mt={2} >
            <Grid display="flex" justifyContent="flex-end" alignItems="center" container spacing={1} direction="row">
              <Box>
                {/* {console.log(ROLE_SUPER_ADMIN)} */}
                {data_user?.user?.role !== ROLE_SUPER_ADMIN && <ComboBox />}
              </Box>
              {/* {mostrarCombo()} */}
              {/*Icono Notificacion*/}
              <IconButton
                sx={{ marginLeft: "5px" }}
                aria-label="delete"
                size="large"
              >
                <Badge badgeContent={0} color="primary">
                  <NotificationsIcon
                    sx={{ color: "#28c4ac" }}
                    fontSize="inherit"
                    onClick={() => setModalNotification(true)}
                  />

                </Badge>
              </IconButton>

              {/*Icono User*/}
              <IconButton>
                <AccountPopover />
              </IconButton>

              <NotificacionModal
                open={modalNotification}
                setOpen={setModalNotification}
              />

            </Grid>


            {/*Combo Box*/}

          </Grid>
          {/*<Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            >
              <Item><NotificationsIcon sx={{ color: "#28c4ac" }}/></Item>
              <Item><AccountPopover/></Item>
          </Stack>*/}

          {/* <LanguagePopover /> */}
          {/* <NotificationsPopover /> */}
        </StyledToolbar>
      </StyledRoot>
    </header>
  );
}
