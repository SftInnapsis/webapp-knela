import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../Scrollbar/Scrollbar';
import NavSection from '../Header/NavSection';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { ROLE_ADMIN } from '@/toolbox/constants/role-type';
import { ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
import { HeaderView } from '../Header';

// import navConfig from './config';
// import navSubConfigdashboard from './sub-config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 350;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: 'rgb(230, 247, 255)'
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg', '');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const data_user = readLocalStorage(KEY_USER_DATA);
  const account = {
    photoURL: '',
    displayName: data_user.user.name + ' ' + data_user.user.last_name,
    role: data_user.user.role
  }
  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <HeaderView />
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        {/* logo de la empresa */}
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>

            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'rgb(24, 144, 255)', }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'rgb(24, 144, 255)', }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
