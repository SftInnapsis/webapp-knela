import React, { useState } from "react";
import {
    Badge,
    Card,
    CardActionArea,
    CardMedia,
    Grid,
    IconButton,
    InputBase,
    TextField,
    Typography,
    Select,
} from "@mui/material";
import { ROUTE_PATIENT } from '@constants/route-map';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./HomeDoctor.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Icon from "@mui/material/Icon";
import { useHistory } from "react-router-dom";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import PersonIcon from "@mui/icons-material/Person";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { color } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { authenticationService } from "@/service/services/Authentication.service";
import { readLocalStorage, saveLocalStorage } from "@/toolbox/helpers/local-storage-helper";
import { KEY_USER_DATA } from "@/toolbox/constants/local-storage";
import { ROLE_ADMIN, ROLE_PROFESSIONAL } from "@/toolbox/constants/role-type";
import { ROLE_SUPER_ADMIN } from "@/toolbox/defaults/static-roles";
import { ROLE_DOCTOR } from '@/toolbox/defaults/static-roles';

import { Protected } from "@/components/layout/Protected";
import { attentionService } from '@/service/services/Attention.service';


export const HomeDoctorView = (props) => {
    const { MedicalCenterReducer ='' } = props;
    console.log(MedicalCenterReducer)
    const [search, setSearch] = useState("");
    const [archivo, setArchivo] = useState("");
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const [ubicationclinica, setubicationclinica] = React.useState("Clinica1");
    const [dataPacientes, setDataPacientes] = React.useState([]);
    const dataUser:any = readLocalStorage(KEY_USER_DATA)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    let history = useHistory();
    const seleccionarPaciente = (elemento) => {
        console.log(elemento);
        history.push(ROUTE_PATIENT, { dataPaciente: elemento });
    };

    const handleChanges = (event) => {
        const value = event.target.value
        setubicationclinica(event.target.value);
        const user = { ...dataUser.user, idmedical_center: value }
        const updateUserLocalStorage = { ...dataUser, user: user }
        saveLocalStorage(KEY_USER_DATA, updateUserLocalStorage);
    };

    const getAttentionOpen = async() =>{
        const userData = readLocalStorage(KEY_USER_DATA);
        const area = [userData?.user?.id_area];
        const doctor = [userData?.user?.id_doctor];
        const role = userData.user.role;
        let res:any;
        if(role == ROLE_PROFESSIONAL){
            res = await attentionService.getAttentionByProfessional(userData?.user?.id_professional)
        }else{
            res = await attentionService.getAttention(MedicalCenterReducer.id_medical_center,area,doctor);
        }
        
        if(res && res.data)
       {
        setDataPacientes(res.data)
       }
    }

    const logout = () => {
        handleMenuClose();
        authenticationService.logout().then(res => {
            if (!res.error) {
                switch(dataUser?.user?.role)
                {
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

    React.useEffect(() => {
        getAttentionOpen();
    }, [MedicalCenterReducer.id_medical_center])

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
        <Protected>
            <Grid container className="containerInvite">
                <Grid container justifyContent={"center"} mt={2}>
                    <Grid item xs={12} md={10}>
                        <Grid xs={12} mb={2}>
                            <Grid container spacing={1}>
                                {renderMenu}
                                <Grid
                                    container
                                    display="flex"
                                    mt={2}
                                    ml={3}
                                    justifyContent="space-between"
                                >
                                 { dataUser?.user?.role ==ROLE_DOCTOR &&  <Grid container item xs={8} md={6}>
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            mt={1}
                                            display="flex"
                                            justifyContent={"flex-start"}
                                        >
                                            <Icon sx={{ color: "#28c4ac", mr: 1 }}>
                                                <PersonIcon />
                                            </Icon>
                                            <Typography
                                                //  align="end" 
                                                variant={"subtitle1"}>
                                                <span> Doctor:</span>{" "}
                                                <span className="title__main">{dataUser?.user?.name+' '+dataUser?.user?.last_name}</span>
                                            </Typography>   
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            mt={1}
                                            display="flex"
                                            justifyContent={"flex-start"}
                                        >
                                            {/* <Icon sx={{ color: "#28c4ac", mr: 1 }}>
                                                <FmdGoodIcon />
                                            </Icon> */}
                                            {/* <Typography
                                                // align="end"
                                                variant={"subtitle1"}>
                                                <span> Comuna:</span>{" "}
                                                <span className="title__main">Recoleta</span>
                                            </Typography> */}
                                        </Grid>
                                        <Grid item xs={12} md={12} mt={1}></Grid>
                                    </Grid>}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container mt={4}>
                            <Grid container item spacing={1} mb={2}>
                                <Grid item xs={8} md={6}>
                                    <Grid container>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant={"h5"}
                                                className="title__main"
                                                sx={{ textAlign: "start", color: "#28c4ac" }}
                                            >
                                                 Mis Pacientes
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>


                                <Grid container justifyContent="center">
                                    <Grid xs={12} md={6}>
                                        <Paper
                                            // component="form"
                                            sx={{ p: "0px 2px", display: "flex" }}
                                            // fullWidth
                                            elevation={2}
                                        >
                                            <InputBase
                                                fullWidth
                                                // value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                // on
                                                sx={{ ml: 1, flex: 1 }}
                                                placeholder="Buscador"
                                            />
                                            <IconButton type="button" aria-label="search">
                                                <SearchIcon />
                                            </IconButton>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {dataPacientes && dataPacientes.length>0 && dataPacientes
                                .filter((item) =>
                                    item.patientsName.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((item) => (
                                    <Grid item xs={12} md={4} p={1}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background:'#feb4b3',
                                                borderRadius: "10px",
                                            }}
                                            onClick={() => seleccionarPaciente(item)}
                                        >
                                            <CardActionArea className="contenedor">
                                                <CardMedia
                                                    component="text"
                                                    height="90"
                                                    name={item.patientsName}
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
                                                            {item.patientsName}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            ml={2}
                                                            mt={0}
                                                            className="texto-card2"
                                                        >
                                                            {`ÁREA: ${item.nameArea}`}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            ml={2}
                                                            mt={0}
                                                            className="texto-card2"
                                                        >
                                                            {`TIPO ATENCIÓN: ${item.attentionTypeName}`}
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
                </Grid>
            </Grid>
        </Protected>
    );
};
