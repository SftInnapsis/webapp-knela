
import { styled } from '@mui/material/styles';
import { Grid, Typography, Select, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import { KEY_MEDICAL_CENTER, KEY_OPTIONS_MEDICAL_CENTER, KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import React, { useState } from "react";
import Fade from "@mui/material/Fade";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Icon from "@mui/material/Icon";
import { authenticationService } from "@/service/services/Authentication.service";
import { ROLE_ADMIN } from "@/toolbox/constants/role-type";
import { ROLE_SUPER_ADMIN } from "@/toolbox/defaults/static-roles";
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";

import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { withRouter } from "react-router-dom";
import { SelectMedicalCenter } from '@/redux/actions';


const ComboBoxView = (props: any): JSX.Element => {

  const dataUser: any = readLocalStorage(KEY_USER_DATA);
  const initialMedicalCenter = readLocalStorage(KEY_MEDICAL_CENTER)
  console.log(initialMedicalCenter)
  const [ubicationclinica, setubicationclinica] = useState(props.MedicalCenterReducer.id_medical_center?props.MedicalCenterReducer.id_medical_center:initialMedicalCenter);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleChanges = (event) => {
    const value = event.target.value
    setubicationclinica(event.target.value);
    const user = { ...dataUser.user, idmedical_center: value }
    const updateUserLocalStorage = { ...dataUser, user: user }
    saveLocalStorage(KEY_USER_DATA, updateUserLocalStorage);
    saveLocalStorage(KEY_MEDICAL_CENTER, event.target.value)
    console.log(value)
    props.$action.SelectMedicalCenter(value);
    console.log(props)
  };

  const logout = () => {
    handleMenuClose();
    authenticationService.logout().then(res => {
      if (!res.error) {
        switch (dataUser?.user?.role) {
          case 'DOCTOR':
            window.location.replace('/login/doctor');
            break;
          case 'PACIENTE':
            window.location.replace('/login/paciente');
            break;
          case 'TUTOR':
            window.location.replace('/login/tutor');
            break;
          case ROLE_ADMIN:
            window.location.replace('/login/admin-centro-medico');
            break;
          case ROLE_SUPER_ADMIN:
            window.location.replace('/login/admin')
        }

      }
    }
    )
  }
  //  React.useEffect(() => {
  //    props.$action.SelectMedicalCenter(initialMedicalCenter || dataUser.user.medical_center[0].id);

  //  }, [])

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
      <MenuItem sx={{ color: '#5C6C85', fontWeight: '700', fontSize: '0.95em' }} onClick={() => { logout() }}  >Cerrar Sesión</MenuItem>
    </Menu>
  );

  return (
    <>
      {/*Combo Box*/}
      <Grid container direction="row" justifyContent="center" alignItems={'center'} spacing={2}>
        <Grid item>
          <Grid container item direction="row" justifyContent="center" alignItems={'center'}>
            <Grid>
              <Icon sx={{ color: "#28c4ac", mr: 1 }}>
                <AccountBoxIcon />
              </Icon>
            </Grid>
            <Grid>
              <Typography
                style={{ color: "black" }}
              >
                Centro Medico:
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Select
            id="outlined-select-ubicationclinica"
            sx={{ width: "200px" }}
            // fullWidth
            value={ubicationclinica}
            onChange={handleChanges}
            variant="standard"
          >
            {dataUser.user.medical_center.map((option, key) => (
              <MenuItem
                sx={{ textAlign: 'center' }}
                key={key} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

      </Grid>
    </>
  );
}


const mapStateToProps = ({ MedicalCenterReducer }) => ({
  // $store: {
  MedicalCenterReducer,
  // },
});
const mapDispatchToProps = (dispatch) => ({
  $action: bindActionCreators(
    {
      SelectMedicalCenter: SelectMedicalCenter
    },
    dispatch
  ),
});

export const ComboBox: any = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ComboBoxView);
