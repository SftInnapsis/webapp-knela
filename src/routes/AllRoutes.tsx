import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, RouteProps, Switch, Redirect } from 'react-router-dom';
import * as Routes from '@constants/route-map';
import { useLocalStorage } from '@toolbox/hooks/local-storage.hook';
import { KEY_USER_DATA } from '@toolbox/constants/local-storage';
import {
   ROLE_ADMIN,
   ROLE_PACIENTE,
   ROLE_SUPER_ADMIN,
   ROLE_TUTOR,
} from '@/toolbox/defaults/static-roles';
import Unauthorized from '@views/_unautorized';
import { PrivateRoute, AuthRoute } from './PrivateRoute';
import { HomeView } from '@/views/Home';
import { LoginView } from '@/views/Login';
import { RegisterView } from '@/views/Register';
import { Patient } from '@/views/Patient';
import { PatientTutor } from '@/views/PatientTutor';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { BusinessArea } from '@/views/BusinessArea';
import { Doctor } from '@/views/Doctors';
import { MedicalCenter } from '@/views/MedicalCenter';
import { PatientMaster } from '@/views/PatientMaster';
import { Professional } from '@/views/Professional';
import { Specialty } from '@/views/Speciality';
import { AttentionList, AttentionView } from '@/views/Attention';
import { DoctorIndependiente } from '@/views/DoctorIndependiente';
import { ROLE_PROFESSIONAL } from '@/toolbox/constants/role-type';
import { AttentionKnelaView } from '@/views/Attention/AttentionKnela';
import { AccountPerfil } from '@/components/common/Header/AccountPerfil';
import { DetailDoctorIndp } from '@/views/DetailDoctorIndp';
import { PatientInd } from '@/views/PatientInd';

const AllRoutes: React.FC = () => {


   const [dataUser] = useLocalStorage(KEY_USER_DATA, undefined);
   // const userData = readLocalStorage(KEY_USER_DATA);

   const moduleHome = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_HOME} component={HomeView} />,
   ];

   const modulePatient = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PATIENT} component={Patient} />,
   ];

   const modulePatientInd = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PATIENT_INDEPENDIENTE} component={PatientInd} />,
   ];

   const modulePatientTutor = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PATIENT_TUTOR} component={PatientTutor} />,
   ];

   const modulePatientMaster = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PATIENT_MASTER} component={PatientMaster} />,
   ];

   const moduleBusinessArea = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_BUSINESS_AREA} component={BusinessArea} />,
   ];

   const moduleDoctors = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_DOCTORS} component={Doctor} />,
   ];

   const moduleMedicalCenter = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_MEDICAL_CENTER} component={MedicalCenter} />,
   ];

   const moduleProfessional = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_PROFESSIONALS} component={Professional} />,
   ];

   const moduleSpeciality = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_SPECIALITY} component={Specialty} />,
   ];

   const moduleAttention = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_ATTENTION} component={AttentionView} />
   ]
   const moduleAttentionKnela = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_ATTENTION_KNELA} component={AttentionKnelaView} />
   ]

   const moduleAttentionList = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_ATTENTION_LIST} component={AttentionList} />
   ]
   const moduleDoctorIndependiente = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_DOCTORES_INDEPENDIENTES} component={DoctorIndependiente} />
   ]
   const moduleDetailDoctorIndependiente = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_DETAIL_DOCTORES_INDEPENDIENTES} component={DetailDoctorIndp} />
   ]
   const moduleAccountPerfil = [
      <PrivateRoute key={5} exact path={Routes.ROUTE_ACCOUNT_PERFIL} component={AccountPerfil} />
   ]




   const routes = useMemo(() => {
      let role: string = 'prueba';
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
                     {/* {moduleBusinessArea}
                     {moduleDoctors} */}
                     {moduleMedicalCenter}
                     {/* {modulePatient}
                     {modulePatientMaster}
                     {moduleProfessional}
                     {moduleSpeciality} */}
                     {modulePatientInd}
                     {moduleDoctorIndependiente}
                     {moduleDetailDoctorIndependiente}
                     {modulePatientTutor}
                     {moduleAccountPerfil}

                     {<Route path='*' exact={true} component={() => {
                        return <Redirect to={Routes.ROUTE_HOME} />
                     }} />}
                  </Switch>
               </Router>
            );
         case ROLE_ADMIN:
            return (
               <Router>
                  <Switch>
                     <AuthRoute exact path={Routes.ROUTE_LOGIN} component={LoginView} />
                     {moduleHome}
                     {moduleBusinessArea}
                     {moduleDoctors}
                     {moduleMedicalCenter}
                     {modulePatient}
                     {modulePatientInd}
                     {modulePatientMaster}
                     {moduleProfessional}
                     {moduleSpeciality}
                     {moduleAttention}
                     {moduleAttentionKnela}
                     {moduleAttentionList}
                     {modulePatientTutor}
                     {moduleAccountPerfil}

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
                     {modulePatientInd}
                     {moduleBusinessArea}
                     {modulePatientTutor}
                     {moduleAccountPerfil}
                     {<Route path='*' exact={true} component={() => {
                        return <Redirect to={Routes.ROUTE_HOME} />
                     }} />}
                  </Switch>
               </Router>
            );
         case ROLE_PROFESSIONAL:
            return (
               <Router>
                  <Switch>
                     <AuthRoute exact path={Routes.ROUTE_LOGIN} component={LoginView} />
                     {moduleHome}
                     {modulePatient}
                     {modulePatientInd}
                     {moduleBusinessArea}
                     {modulePatientTutor}
                     {moduleAccountPerfil}
                     {<Route path='*' exact={true} component={() => {
                        return <Redirect to={Routes.ROUTE_HOME} />
                     }} />}
                  </Switch>
               </Router>
            );
            case ROLE_TUTOR:
               return (
                  <Router>
                     <Switch>
                        <AuthRoute exact path={Routes.ROUTE_LOGIN} component={LoginView} />
                        {moduleHome}
                        {modulePatient}
                        {modulePatientInd}
                        {moduleBusinessArea}
                        {modulePatientTutor}
                        {moduleAccountPerfil}
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
                     {moduleBusinessArea}
                     {moduleDoctors}
                     {moduleMedicalCenter}
                     {modulePatient}
                     {modulePatientInd}
                     {modulePatientMaster}
                     {moduleProfessional}
                     {moduleSpeciality}
                     {moduleAttention}
                     {moduleAttentionList}
                     {moduleDoctorIndependiente}
                     {moduleDetailDoctorIndependiente}
                     {modulePatientTutor}
                     {moduleAttentionKnela}
                     {moduleAccountPerfil}

                     <Route key={5} exact path={Routes.ROUTE_REGISTER} component={RegisterView} />
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
