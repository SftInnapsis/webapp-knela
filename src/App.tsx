import React from 'react';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AllRoutes from './routes/AllRoutes';
import {KyteApp} from './KyteApp';

import { authenticationService } from './service/services/Authentication.service';
import { useLocalStorage } from '@toolbox/hooks/local-storage.hook';
import { KEY_TOKEN_KYTE, KEY_USER_DATA } from '@toolbox/constants/local-storage';
import firebase from '@/config/firebase';
import { Alert, Snackbar } from '@mui/material';
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { readLocalStorage } from './toolbox/helpers/local-storage-helper';
import {Toaster, toast} from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

function App() {

   return (
      <Provider store={store}>
         <AllRoutes />
         <BrowserRouter>
          <KyteApp />
        </BrowserRouter>
      </Provider>
   );
}

export default App;
