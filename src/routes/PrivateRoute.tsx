import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from '@service/services/Authentication.service';
import { ROUTE_HOME, ROUTE_LOGIN } from '@toolbox/constants/route-map';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '@/toolbox/defaults/static-roles';
import { KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';




export const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route {...rest} render={props => {
      const currentUser = authenticationService.currentUserValue;
      const authCookie  = authenticationService.authCookie();

      if (!currentUser || !authCookie) {
         return <Redirect {...props} to={{ pathname: ROUTE_LOGIN, state: { from: props.location } }} />
      }
      return <Component {...props} />
   }} />
)

export const AuthRoute = ({ component: Component, ...rest }) => (


   <Route {...rest} render={props => {
      const currentUser = authenticationService.currentUserValue;
      const authCookie  = authenticationService.authCookie();
      const dataUser= readLocalStorage(KEY_USER_DATA);


      if (currentUser && authCookie) {
         return(
            <>
               <Redirect to={{ pathname: ROUTE_HOME, state: { from: props.location } }} />
            </>
         )

      }
      return <Component {...props} />
   }} />
)
