import { useEffect, useState } from 'react';
import { readLocalStorage } from '@/toolbox/helpers/local-storage-helper';
import { KEY_MEDICAL_CENTER, KEY_USER_DATA } from '@/toolbox/constants/local-storage';
import Divider from '@mui/material/Divider';

import { Grid, Box, Typography, Card, CardActionArea, CardMedia } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Protected } from '@/components/layout/Protected';
import { userService } from '@/service/services/User.service';

export const AccountPerfil = () => {
   const data_user = readLocalStorage(KEY_USER_DATA);
   const initialMedicalCenter = readLocalStorage(KEY_MEDICAL_CENTER)
   console.log(data_user)
   const { iduser, iduser_type } = data_user.user;
   const _namedefault = "Nombres y Apellidos";
   console.log(iduser);
   const [dataPerfil, setDataPerfil] = useState<any>([])
   const [nameMedical, setNameMedical] = useState('');



   const collectionOfUserInformation = async (id_user, userType) => {
      const res = await userService.collectionOfUserInformation(id_user, userType)
      if (res.data) {
         setDataPerfil(res.data);
         console.log(data_user)
         data_user.user.medical_center && data_user.user.medical_center.length > 0 && data_user.user.medical_center.map((item)=>{
            console.log(item.id)
            console.log(item)
            console.log(initialMedicalCenter)
            if(item.id == initialMedicalCenter)
            {
               setNameMedical(item.name)
            }
         })
      // console.log(dataMedical)
      }
   }

   useEffect(() => {
      collectionOfUserInformation(iduser, iduser_type)
   }, [])

   return (
      <Protected>

         <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ maxWidth: '80%' }}

         >
            {/*Primer Grid */}
            <Grid
               container item xs={4}
               direction="row"
               justifyContent="space-between"
               alignItems="center"
               sx={{
                  mt: '40px',
                  ml: '40px'
               }}>

               {/*User y Name*/}
               <Grid
                  container item xs={9}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center">
                  {/*Use*/}
                  <AccountCircleIcon fontSize="large"
                     sx={{
                        width: '120px',
                        height: '120px',
                        color: '#A4AAAA',
                        ml: '40px'
                     }} />

                  {/*Name y Rut*/}
                  <Grid
                     container item xs={8}
                     direction="column"
                     justifyContent="center"
                     alignItems="flex-start">
                     <Grid item xs={6}>
                        <Typography variant="h4" noWrap>
                           {
                              dataPerfil.name != "" ?
                                 dataPerfil.name
                                 :
                                 nameMedical
                           }
                        </Typography>
                     </Grid>
                     <Grid item xs={6}>
                        <Typography variant="subtitle2" noWrap>
                           {dataPerfil?.rut}
                        </Typography>
                     </Grid>
                  </Grid>
               </Grid>

               {/*Area y Especialidad*/}
               <Grid
                  container item xs={3}
                  direction="column"
                  justifyContent="center"
                  alignItems="center">

               {dataPerfil?.name_area &&   <Grid item xs={6}
                     container
                     direction="row"
                     justifyContent="flex-start"
                     alignItems="center">
                     <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '20px', mr: '10px' }}>
                        Area:
                     </Typography>
                     <Typography variant="subtitle2" sx={{ fontSize: '20px' }}>
                        {dataPerfil?.name_area}
                     </Typography>
                  </Grid>}
                {dataPerfil?.name_speciality &&  <Grid item xs={6}
                     container
                     direction="row"
                     justifyContent="flex-start"
                     alignItems="center">
                     <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr: '10px' }}>
                        Especialidad:
                     </Typography>
                     <Typography variant="subtitle2" noWrap sx={{ fontSize: '20px' }}>
                        {dataPerfil?.name_speciality}
                     </Typography>
                  </Grid>}
                 {dataPerfil?.role && <Grid item xs={6}
                     container
                     direction="row"
                     justifyContent="flex-start"
                     alignItems="center">
                     <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr: '10px' }}>
                        Rol:
                     </Typography>
                     <Typography variant="subtitle2" noWrap sx={{ fontSize: '20px' }}>
                        {dataPerfil?.role}
                     </Typography>
                  </Grid>}

               </Grid>


            </Grid>

            {/*Segundo Grid */}
            <Grid item xs={8}
               container
               direction="column"
               justifyContent="center"
               alignItems="flex-start"
               sx={{
                  width: '100%',
                  mt: '70px',
                  ml: '40px'
               }}>

               {/*MiniHeader*/}
               <Grid item xs={3}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start">
                  <Grid item
                     sx={{
                        width: '100%',
                        ml: '50px',

                     }}>
                     <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '25px' }}>
                        Informacion Personal
                     </Typography>
                     <Divider />
                  </Grid>
               </Grid>

               {/*Datos*/}
               <Grid item xs={9}
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{
                     mt: '35px',
                     ml: '15%',
                  }}>

                  <Grid item xs={5}
                     container
                     direction="column"
                     justifyContent="flex-start"
                     alignItems="flex-start"
                  >

                   {dataPerfil?.date_birth &&  <Grid item xs={6}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">
                        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr: '10px' }}>
                           Fecha Nacimiento:
                        </Typography>
                        <Typography variant="subtitle2" noWrap sx={{ fontSize: '20px' }}>
                           {dataPerfil?.date_birth}
                        </Typography>
                     </Grid>}


                    {dataPerfil?.mail && <Grid item xs={6}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">

                        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr: '10px' }}>
                           Correo:
                        </Typography>
                        <Typography variant="subtitle2" noWrap sx={{ fontSize: '20px' }}>
                           {dataPerfil?.mail}
                        </Typography>

                     </Grid>}

                   {dataPerfil?.address &&  <Grid item xs={6}
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center">

                        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '20px', mr: '10px' }}>
                           Direccion:
                        </Typography>
                        <Typography variant="subtitle2" noWrap sx={{ fontSize: '20px' }}>
                           {dataPerfil?.address}
                        </Typography>

                     </Grid>}

                  </Grid>
               </Grid>

            </Grid>

            {/*Segundo Grid */}
            <Grid item xs={8}
               container
               direction="column"
               justifyContent="center"
               alignItems="flex-start"
               sx={{
                  width: '100%',
                  mt: '70px',
                  ml: '40px'
               }}>

               {/*MiniHeader*/}
               <Grid item xs={3}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start">
                  <Grid item
                     sx={{
                        width: '100%',
                        ml: '50px',

                     }}>
                     <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold', fontSize: '25px' }}>
                        Centro Médico
                     </Typography>
                     <Divider />
                  </Grid>
               </Grid>

               {dataPerfil && dataPerfil.medical_center &&dataPerfil.medical_center.length > 0 && dataPerfil.medical_center
                  .map((item) => (
                     <Grid item xs={12} md={4} p={2}>
                        <Card
                           key={item.id}
                           sx={{
                              width: "100%",
                              background: '#feb4b3',
                              borderRadius: "10px",
                              pr: 2
                           }}
                        >
                           <CardActionArea className="contenedor">
                              <CardMedia
                                 component="text"
                                 height="90"
                                 name={item.name}
                              />
                              <Grid container className="texto-encima">
                                 <Grid item xs={12}>
                                    <Typography
                                       gutterBottom
                                       variant="h6"
                                       component="div"
                                       ml={2}
                                       mt={1}
                                       className="texto-card"
                                    >
                                       {item.name}
                                    </Typography>
                                    <Typography
                                       gutterBottom
                                       variant="body2"
                                       component="div"
                                       ml={2}
                                       mt={0}
                                       className="texto-card2"
                                    >
                                       {`Rut: ` + item.rut}
                                    </Typography>
                                    <Typography
                                       gutterBottom
                                       variant="body2"
                                       component="div"
                                       ml={2}
                                       mt={0}
                                       className="texto-card2"
                                    >
                                       {`Teléfono: ` + item.phone}
                                    </Typography>
                                    <Typography
                                       gutterBottom
                                       variant="h6"
                                       component="div"
                                       ml={2}
                                       mt={0}
                                       className="texto-card3"
                                    >
                                       {/* {item.statusPatientName} */}
                                    </Typography>
                                 </Grid>
                              </Grid>
                           </CardActionArea>
                        </Card>
                     </Grid>
                  ))}
            </Grid>
         </Grid>
      </Protected>
   )
}
