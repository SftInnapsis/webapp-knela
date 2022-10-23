import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch, Redirect } from 'react-router-dom';
import * as Routes from '@constants/route-map';
import { useLocalStorage } from '@toolbox/hooks/local-storage.hook';
import { KEY_USER_DATA } from '@toolbox/constants/local-storage';
import {
   ROLE_ADMIN,
   ROLE_PACIENTE,
   ROLE_SUPER_ADMIN,
} from '@/toolbox/defaults/static-roles';
import Unauthorized from '@views/_unautorized';
import { PrivateRoute, AuthRoute } from './PrivateRoute';
import { HomeView } from '@/views/Home';
import { LoginView } from '@/views/Login';
import { Patient } from '@/views/Patient';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { BusinessArea } from '@/views/BusinessArea/BusinessArea';

const AllRoutes: React.FC = () => {


   const [dataUser] = useLocalStorage(KEY_USER_DATA, undefined);
   // const userData = readLocalStorage(KEY_USER_DATA);

   const moduleHome = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_HOME} component={HomeView} />,
   ];

   const modulePatient = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PATIENT} component={Patient} />,
   ];

   const moduleBusinessArea = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_BUSINESS_AREA} component={BusinessArea} />,
   ];

   const routes = useMemo(() => {
      let role: string = 'prueba';
      //console.log(role)
      if (!!dataUser) {
         if (!!dataUser.user) {
            role = dataUser.user.role;
         }
      }

      switch (role) {
         case ROLE_SUPER_ADMIN:
            return (
               <Router>
                  <Switch>
                     <AuthRoute exact path={Routes.ROUTE_LOGIN} component={LoginView} />
                     {moduleHome}
                  </Switch>
               </Router>
            );
         case ROLE_ADMIN:
            return (
               <Router>
                  <Switch>
                     <AuthRoute exact path={Routes.ROUTE_LOGIN} component={LoginView} />
                     {moduleHome}
                     {modulePatient}
                     {<Route path='*' exact={true} component={() => {
                        return <Redirect to={Routes.ROUTE_HOME} />
                     }} />}
                  </Switch>
               </Router>
            );
         case ROLE_PACIENTE:
            return (
               <Router>
                  <Switch>
                     <AuthRoute exact path={Routes.ROUTE_LOGIN} component={LoginView} />
                     {moduleHome}
                     {modulePatient}
                     {moduleBusinessArea}
                     {<Route path='*' exact={true} component={() => {
                        return <Redirect to={Routes.ROUTE_HOME} />
                     }} />}
                  </Switch>
               </Router>
            );

         default:
            return (
               <Router>
                  <Switch>
                     {moduleHome}
                    {modulePatient}
                     <AuthRoute exact path={Routes.ROUTE_LOGIN} component={LoginView} />
                     {<Route path='*' exact={true} component={() => {
                        return <Redirect to={Routes.ROUTE_LOGIN} />
                     }} />}
                  </Switch>
               </Router>
            )
      }
   },// eslint-disable-next-line
      [JSON.stringify(dataUser)]);

   return routes;
}

export default AllRoutes;
