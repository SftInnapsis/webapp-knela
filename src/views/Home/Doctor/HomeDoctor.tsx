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
import { ROLE_ADMIN } from "@/toolbox/constants/role-type";
import { ROLE_SUPER_ADMIN } from "@/toolbox/defaults/static-roles";
const itemData = [
    {
        id: 1,
        img: "https://cdn.pixabay.com/photo/2015/10/19/16/47/ash-996321_960_720.jpg",
        title: "Jorge Aravena G.",
        subtitle: "Area:Traumatologia",
        subtitle2: "Edad 56 años",
        subtitle3: "Habitacion:407A",
        color: "#feb4b3",
    },
    {
        id: 2,
        img: "https://cdn.pixabay.com/photo/2015/10/19/16/47/ash-996321_960_720.jpg",
        title: "Leandro Jara T.",
        subtitle: "Area:Traumatologia",
        subtitle2: "Edad 56 años",
        subtitle3: "Habitacion:407A",
        color: "#fdf3e7",
    },
    {
        id: 3,
        img: "https://cdn.pixabay.com/photo/2015/10/19/16/47/ash-996321_960_720.jpg",
        title: "Kiara Medina V.",
        subtitle: "Area:Traumatologia",
        subtitle2: "Edad 56 años",
        subtitle3: "Habitacion:407A",
        color: "#c3e6ce",
    },
    {
        id: 4,
        img: "https://cdn.pixabay.com/photo/2015/10/19/16/47/ash-996321_960_720.jpg",
        title: "Anderson Espinoza J.",
        subtitle: "Area:Traumatologia",
        subtitle2: "Edad 56 años",
        subtitle3: "Habitacion:407A",
        color: "#c3e6ce",
    },
    {
        id: 5,
        img: "https://cdn.pixabay.com/photo/2015/10/19/16/47/ash-996321_960_720.jpg",
        title: "Tomas Cadena R.",
        subtitle: "Area:Traumatologia",
        subtitle2: "Edad 56 años",
        subtitle3: "Habitacion:407A",
        color: "#feb4b3",
    },
    {
        id: 6,
        img: "https://cdn.pixabay.com/photo/2015/10/19/16/47/ash-996321_960_720.jpg",
        title: "Pedro Aquino V.",
        subtitle: "Area:Traumatologia",
        subtitle2: "Edad 56 años",
        subtitle3: "Habitacion:407A",
        color: "#c3e6ce",
    },
];


export const HomeDoctor = (props) => {
    const [search, setSearch] = useState("");
    const [archivo, setArchivo] = useState("");
    const tipoUsuario = localStorage.getItem("tipoUsuario");
    const [ubicationclinica, setubicationclinica] = React.useState("Clinica1");
    const [dataPacientes, setDataPacientes] = React.useState(itemData);
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

    // const ubication = [
    //     {
    //         value: "Clinica1",
    //         label: "San Pedro",
    //     },
    //     {
    //         value: "Clinica2",
    //         label: "San Bartolome",
    //     },
    //     {
    //         value: "Clinica3",
    //         label: "San Juan Bautista",
    //     },
    //     {
    //         value: "Clinica4",
    //         label: "Los Angeles",
    //     },
    // ];
    // console.log(dataUser.user.role);
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
            <Grid container className="containerInvite">
                <Grid container justifyContent={"center"} mt={2}>
                    <Grid item xs={12} md={10}>
                        <Grid xs={12} mb={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={10} md={6}
                                //  align="start"
                                >
                                    <Link to={"/login"} className="link__css">
                                        <Typography
                                            sx={{ color: "#28c4ac" }}
                                            variant={"h3"}
                                            className="title__main"
                                        >
                                            ¡Hola Hernan!
                                        </Typography>
                                    </Link>
                                </Grid>

                                <Grid item xs={2} md={6} mt={2}>
                                    <Grid display="flex" justifyContent={"flex-end"}>
                                        <IconButton
                                            sx={{ marginLeft: "5px" }}
                                            aria-label="delete"
                                            size="small"
                                        >
                                            <Badge badgeContent={4} color="primary">
                                                <NotificationsIcon sx={{ color: "#28c4ac" }} />
                                            </Badge>
                                        </IconButton>
                                        <IconButton
                                            sx={{ marginLeft: "5px" }}
                                            aria-label="delete"
                                            size="small"
                                            onClick={(e) => { handleProfileMenuOpen(e) }}
                                        >
                                            <SettingsSharpIcon

                                                sx={{ color: "#28c4ac" }} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                {renderMenu}
                                <Grid
                                    container
                                    display="flex"
                                    mt={2}
                                    ml={3}
                                    justifyContent="space-between"
                                >
                                    <Grid container item xs={8} md={6}>
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
                                                <span className="title__main">Hernan Acevedo</span>
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
                                            <Icon sx={{ color: "#28c4ac", mr: 1 }}>
                                                <FmdGoodIcon />
                                            </Icon>
                                            <Typography
                                                // align="end"
                                                variant={"subtitle1"}>
                                                <span> Comuna:</span>{" "}
                                                <span className="title__main">Recoleta</span>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} mt={1}></Grid>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Grid display="flex" mb={3}>
                                            <Icon sx={{ color: "#28c4ac", mr: 1 }}>
                                                <AccountBoxIcon />
                                            </Icon>
                                            <Typography>
                                                <span
                                                // variant={"subtitle"}
                                                >
                                                    Centro Medico:</span>{" "}
                                            </Typography>
                                        </Grid>

                                        <Select
                                            id="outlined-select-ubicationclinica"
                                            // sx={{ width: "200px" }}
                                            fullWidth
                                            value={ubicationclinica}
                                            onChange={handleChanges}
                                            variant="standard"
                                        >
                                            {dataUser.user.medical_center.map((option,key) => (
                                                <MenuItem
                                                    sx={{ textAlign: 'center' }}
                                                    key={key} value={option.id}>
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
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

                            {dataPacientes
                                .filter((item) =>
                                    item.title.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((item) => (
                                    <Grid item xs={12} md={4} p={1}>
                                        <Card
                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: item.color,
                                                borderRadius: "10px",
                                            }}
                                            onClick={() => seleccionarPaciente(item)}
                                        >
                                            <CardActionArea className="contenedor">
                                                <CardMedia
                                                    component="text"
                                                    height="90"
                                                    name={item.title}
                                                />
                                                <Grid container className="texto-encima">
                                                    <Grid item xs={10}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h6"
                                                            component="div"
                                                            ml={2}
                                                            mt={1}
                                                            className="texto-card"
                                                        >
                                                            {item.title}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            ml={2}
                                                            mt={0}
                                                            className="texto-card2"
                                                        >
                                                            {item.subtitle}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            ml={2}
                                                            mt={0}
                                                            className="texto-card2"
                                                        >
                                                            {item.subtitle2}
                                                        </Typography>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h6"
                                                            component="div"
                                                            ml={2}
                                                            mt={0}
                                                            className="texto-card3"
                                                        >
                                                            {item.subtitle3}
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
        </>
    );
};
