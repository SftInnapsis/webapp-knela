import React, { useState } from "react";
import {
    Badge,
    Card,
    CardActionArea,
    CardMedia,
    Fade,
    Grid,
    Icon,
    IconButton,
    MenuItem,
    Modal,
    TextField,
    Typography,
    Box,
    Paper,
    InputBase,
    Button,
    TextareaAutosize,
    InputLabel,
    Input,
    FormControl,
} from "@mui/material";
import {ROUTE_HOME} from '@constants/route-map';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import PeopleIcon from "@mui/icons-material/People";
import SendIcon from '@mui/icons-material/Send';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import MicIcon from '@mui/icons-material/Mic';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from '@mui/icons-material/Delete';
import { InputOutlined, Padding } from "@mui/icons-material";
import "./Patient.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(50%, -50%)",
    width: 400,
    height: 670,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 5,
};

const stylemensaje = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(60%, -50%)",
    width: 400,
    height: 670,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 5,
};


const itemDoctor = [
    {
        id: 1,
        title: "Hernan Acevedo",
        date: "10:36 am - 02 de Mayo 2022",
        subtitle:
            "El Paciente se encuentra estable dentro de su gravedad, por la tarde intentaremos nuevamente con el medicamento",
        color: "#c3e6ce"
    },
];

const itemModalEquipo = [
    {
        id: 1,
        title1: "Javiera Sanhueza V.",
        subtitle1: "Rol:Enfermera",
    },
    {
        id: 2,
        title1: "Cecilia Fuenzalida V.",
        subtitle1: "Rol:Enfermera",
    },
    {
        id: 3,
        title1: "Jose Miguel Luarte V.",
        subtitle1: "Rol:Doctor",
    },
];

const itemMensajeEquipo = [
];

export const Patient = (props) => {
    const item = props.location.state.dataPaciente;
    const [estadopaciente, setEstadoPaciente] = React.useState();
    const [estadopacienteModal, setEstadoPacienteModal] = React.useState();
    const [mensajeModalEquipo, setmensajeModalEquipo] = React.useState(itemModalEquipo);
    const [showModalEquipo, setModalEquipo] = React.useState(false);
    const [showModalTutor, setModalTutor] = React.useState(false);
    const [showChatEquipo, setshowChatEquipo] = useState(false);
    const [showModalIngresoPaciente, setModalIngresoPaciente] = React.useState(false);

    const [mensajePaciente, setmensajePaciente] = React.useState(itemDoctor);
    const [objetoIngresar, setObjetoIngresar] = React.useState({
        id: '',
        title: "Hernan Acevedo",
        date: "10:36 am - 02 de Mayo 2022",
        subtitle: "",
        color: ""
    })
    const colorDefault = item.color;
    const color1 = "#feb4b3";
    const color2 = "#fdf3e7";
    const color3 = "#c3e6ce";
    // const hoy = new Date();
    // var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    // console.log(fecha)

    const handleChangeSelect = (e) => {
        setEstadoPacienteModal(e.target.value);
    }
    console.log(estadopacienteModal);
    switch (estadopacienteModal) {
        case 1:
            console.log("soy el 1");
            objetoIngresar.color = color1;
            break;
        case 2:
            console.log("soy el 2");
            objetoIngresar.color = color2;
            break;
        case 3:
            console.log("soy el 3");
            objetoIngresar.color = color3;
            break;
        default:
            objetoIngresar.color = colorDefault;
    }

    const handleChangeMensaje = (e) => {
        const input = e.target.value
        const data: any = {
            id: mensajePaciente[mensajePaciente.length - 1].id + 1,
            title: "Hernan Acevedo",
            date: "10:36 am - 02 de Mayo 2022",
            subtitle: input,
            color: objetoIngresar.color
        }
        setObjetoIngresar(data);
        console.log('data', data);
        console.log('input', input)
    }

    console.log(objetoIngresar)

    const EnviarNuevoObjetoAlArreglo = () => {
        const arrayNew = mensajePaciente;
        const nuevoObjeto: any = objetoIngresar;
        arrayNew.push(nuevoObjeto)
        console.log(arrayNew);
        setmensajePaciente(arrayNew)
    }

    console.log('conjunto de mensaje paciente', mensajePaciente)

    // const handleChanges = (event) => {
    //     setEstadoPaciente(event.target.value);

    // };



    switch (estadopaciente) {
        case 1:
            console.log(item.color);
            item.color = color1;
            break;
        case 2:
            console.log(item.color);
            item.color = color2;
            break;
        case 3:
            console.log(item.color);
            item.color = color3;
            break;
        default:
            item.color = colorDefault;
    }

    const estado = [
        {
            id: 1,
            value: "estado1",
            label: "Critico",
            background: "red",
        },
        {
            id: 2,
            value: "estado2",
            label: "Grave",
            background: "blue",
        },
        {
            id: 3,
            value: "estado3",
            label: "Estable",
            background: "blue",
        },
    ];



    const estadoModal = [
        {
            id: 1,
            value: "estado1",
            label: "Critico",
            background: "red",
        },
        {
            id: 2,
            value: "estado2",
            label: "Grave",
            background: "blue",
        },
        {
            id: 3,
            value: "estado3",
            label: "Estable",
            background: "blue",
        },
    ];

    // const useEffect = () => ({
    // }, [])
    return (
        <>
            <Grid container className="containerInvite">
                <Grid container justifyContent={"center"} mt={2}>
                    <Grid item xs={12} md={10}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={3} mt={2}>
                                <Link to={ROUTE_HOME} className="link__css">
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        className="link__css-back"
                                    >
                                        <ArrowBackIosIcon className="icon_back" /> Volver
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={8} md={9} mt={2}>
                                <Grid display="flex" justifyContent={"flex-end"}>
                                    {/*<Badge badgeContent={4} color="primary">
                                                <NotificationsIcon color="action" />
                                            </Badge>*/}
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
                                    >
                                        <SettingsSharpIcon sx={{ color: "#28c4ac" }} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Typography
                                    sx={{ color: "#28c4ac" }}
                                    variant={"h4"}
                                    className="title__main"
                                >
                                    Paciente {item.title}{" "}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={5} mt={0.5}>
                                <Typography
                                    variant={"subtitle1"}
                                    sx={{ color: "#28c4ac" }}
                                    className="subtitle_doctor"
                                >
                                    Estado del Paciente
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    id="outlined-select-ubicationclinica"
                                    select
                                    sx={{ width: "200px" }}
                                    size="small"
                                // value={estadopaciente}
                                // onChange={handleChanges}
                                >
                                    {estado.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={8} mt={2}>
                                    <Grid item xs={12} md={6} mt={1}>
                                        <Card

                                            key={item.id}
                                            sx={{
                                                width: "100%",
                                                background: item.color,
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <CardActionArea className="contenedor">
                                                <Grid container className="texto-encima">
                                                    <Grid item xs={10}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="body2"
                                                            component="div"
                                                            ml={2}
                                                            mt={1}
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
                                </Grid>
                                <Grid item xs={12} md={4} mt={2}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={6}>
                                        </Grid>
                                        <Grid item xs={4} md={2} mt={1}>
                                            <Card
                                                key={item.id}
                                                sx={{
                                                    width: "100%",
                                                    background: "#afaff4",
                                                    borderRadius: "10px",
                                                }}
                                                onClick={() => setModalEquipo(true)}
                                            >
                                                <CardActionArea className="contenedor">
                                                    <CardMedia component="text" height="90" />
                                                    <Grid container className="texto-encima">
                                                        <Grid item xs={12}>
                                                            <PeopleIcon
                                                                sx={{ fontSize: 50, color: "white", ml:1.5 }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardActionArea>
                                            </Card>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                component="div"
                                                textAlign="center"
                                                color="#28c4ac"
                                                mt={1}
                                                className="texto-card2"
                                            >
                                                Equipo
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4} md={2} mt={1}>
                                            <Card
                                                key={item.id}
                                                sx={{
                                                    width: "100%",
                                                    background: "#f25ba7",
                                                    borderRadius: "10px",
                                                }}
                                                onClick={() => setModalTutor(true)}
                                            >
                                                <CardActionArea className="contenedor">
                                                    <CardMedia component="text" height="90" />
                                                    <Grid container className="texto-encima">
                                                        <Grid item xs={12} >
                                                            <FavoriteBorderIcon
                                                                sx={{ fontSize: 50, color: "white", ml:1.5 }}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardActionArea>
                                            </Card>

                                            <Typography
                                                align={"center"}
                                                gutterBottom
                                                variant="body2"
                                                component="div"
                                                color="#28c4ac"

                                                mt={1}
                                                className="texto-card2"
                                            >
                                                Tutor
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4} md={2} mt={1}>
                                            <Card
                                                key={item.id}
                                                sx={{
                                                    width: "100%",
                                                    background: "#21c6ab",
                                                    borderRadius: "10px",
                                                }}

                                            >
                                                <CardActionArea className="contenedor">
                                                    <Grid container className="texto-encima">
                                                        <Grid item xs={12} >
                                                            <Typography
                                                                sx={{ fontWeight: "bold", color: "white", ml:1.7 }}
                                                                fontSize="30px"
                                                            >
                                                                29
                                                            </Typography>
                                                            <Grid mt={-2}>
                                                                <Typography
                                                                    sx={{ fontWeight: "bold", color: "white", ml:1.7 }}
                                                                >
                                                                    Abril
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardActionArea>
                                            </Card>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                component="div"
                                                textAlign="center"
                                                color="#28c4ac"
                                                mt={1}
                                                className="texto-card2"
                                            >
                                                Ingreso
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} justifyContent={"center"}>
                            <Grid container spacing={1} item xs={12} md={12} mt={2}>
                                <Grid item xs={6} md={6} mb={2}>
                                    <Typography
                                        variant={"body1"}
                                        sx={{
                                            textAlign: "start",
                                            color: "#3b3b3b",
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        Ultimas Actualizaciones
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                    md={6}
                                    mb={2}
                                    display="flex"
                                    justifyContent={"flex-end"}
                                    onClick={() => setModalIngresoPaciente(true)}

                                >
                                    <IconButton sx={{ color: "#28c4ac" }}>
                                        <AddCircleSharpIcon />
                                        <Typography
                                            variant={"body1"}
                                            className="subtitle_doctor"
                                        >
                                            Nuevo
                                        </Typography>
                                    </IconButton>

                                </Grid>
                                {mensajePaciente.map((item2) => (
                                    <Grid item xs={12} md={6}>
                                        <Card
                                            key={item2.id}
                                            sx={{
                                                width: "100%",
                                                background: item2.color,
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <CardActionArea className="contenedor">
                                                <CardMedia
                                                    component="text"
                                                    height="90"
                                                    name={item2.subtitle}
                                                />
                                                <Grid container className="texto-encima" p={2}>
                                                    <Grid item xs={12}>
                                                        <Grid display="flex" justifyContent="space-between">
                                                            <Typography
                                                                gutterBottom
                                                                variant="subtitle1"
                                                                fontWeight={"bolder"}
                                                            >
                                                                {item2.title}
                                                            </Typography>
                                                            <Grid mt={1}>
                                                                <Typography
                                                                    gutterBottom

                                                                    fontWeight={"bolder"}
                                                                >
                                                                    {item2.date}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>

                                                        <Typography gutterBottom >
                                                            {item2.subtitle}
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
            </Grid >

            <Modal
                open={showModalEquipo}
                onClose={() => setModalEquipo(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            //   style={{  }}
            >
                <Box
                   sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(60%, -50%)",
                    width: 400,
                    height: 670,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,
                    borderRadius: 5,
                }}
                //sx={{ ...style, 
                // width: 430 
                //}}
                >
                    <Grid item xs={12} md={6} mt={1}>
                        <Typography sx={{ color: '#28c4ac' }} fontSize='20px' fontWeight={'bold'} id="parent-modal-title">EQUIPO</Typography>
                    </Grid>
                    {mensajeModalEquipo.map((item3: any) => (
                        <Grid item xs={12} md={6} mt={1}>
                            <Card
                                key={item3.id}

                                sx={{
                                    width: "200%",
                                    background: "white",
                                    borderRadius: "15px",
                                    border: "1px solid #000",
                                }}
                            >
                                <CardActionArea className="contenedor">
                                    <Grid container className="texto-encima" p={1.5}>
                                        <Grid item xs={12}>
                                            <Grid display="flex" justifyContent="space-between">
                                                <Typography
                                                    sx={{ color: '#6a4032' }}
                                                    gutterBottom
                                                    variant="h6"
                                                    fontWeight={"bolder"}
                                                >
                                                    {item3.title1}
                                                </Typography>
                                            </Grid>
                                            <Grid display="flex" justifyContent="space-between">
                                                <Typography gutterBottom >
                                                    {item3.subtitle1}
                                                </Typography>
                                                <Grid
                                                    item
                                                    xs={6}
                                                    md={6}
                                                    display="flex"
                                                    justifyContent={"flex-end"}
                                                    onClick={() => setshowChatEquipo(true)}

                                                >
                                                    <IconButton sx={{ color: "#28c4ac" }}>
                                                        <AddCircleSharpIcon />
                                                        <Typography
                                                            variant={"body1"}
                                                            className="subtitle_doctor"
                                                        >
                                                            Empezar Chat
                                                        </Typography>
                                                    </IconButton>

                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </CardActionArea>
                            </Card>
                        </Grid>

                    ))}

                    {showChatEquipo && (
                        <Grid item xs={12} p={1} md={12} mt={2}
                        sx={{
                            background: "#f3f3f3",
                            borderRadius: "10px",
                            marginBottom: "180px",
                            padding: "5",
                            width: "100%",
                        }}
                        >
                            <Card

                                //key={item2.id}
                                sx={{
                                    width: "100%",
                                    background: "#f3f3f3",
                                    borderRadius: "10px",
                                    marginBottom: "130px"

                                }}
                            >
                                <CardActionArea className="contenedor">
                                    <Grid container className="texto-encima" sx={{ backgroundColor: 'white' }} p={1}>
                                        <Grid item xs={12}>
                                            <Grid display="flex" justifyContent="space-between">
                                                <Typography
                                                    gutterBottom
                                                    variant="subtitle1"
                                                    fontWeight={"bold"}
                                                    color="#28c4ac"
                                                >
                                                    Claudia Mantila
                                                </Typography>
                                            </Grid>

                                            <Typography gutterBottom >
                                                Hola Doctor! nos puede contar como salio la operacion?
                                                Gracias!
                                            </Typography>
                                            <Grid mt={1}>
                                                <Typography gutterBottom>
                                                    08:30 AM
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardActionArea>
                            </Card>
                            <Grid container item xs={12} md={12} mt={1}>
                                <Grid display="flex">
                                    <IconButton
                                        type="button"
                                        sx={{ p: "10px" }}
                                        aria-label="search"
                                    >
                                        <CameraAltOutlinedIcon sx={{ color: '#28c4ac' }} />
                                    </IconButton>
                                    <Paper component="form" sx={{ p: "0px 2px" }}>
                                        <InputBase
                                            // value={search}
                                            //onChange={(e) => setSearch(e.target.value)}
                                            //on
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Escribe un Mensaje"
                                        />
                                        <IconButton
                                            type="button"
                                            sx={{ p: "10px" }}
                                            aria-label="search"
                                        >
                                            <SendIcon />
                                        </IconButton>
                                    </Paper>

                                    <IconButton
                                        type="button"
                                        sx={{ p: "10px" }}
                                        aria-label="search"
                                    >
                                        <AttachFileIcon />
                                    </IconButton>
                                    <IconButton
                                        type="button"
                                        sx={{ p: "10px" }}
                                        aria-label="search"
                                    >
                                        <MicIcon sx={{ color: '#28c4ac' }} />
                                    </IconButton>

                                </Grid>
                            </Grid>
                        </Grid>

                    )}
                </Box>
            </Modal>

            <Modal
                open={showModalIngresoPaciente}
                onClose={() => setModalIngresoPaciente(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            //   style={{  }}
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(50%, -50%)",
                    width: 400,
                    height: 670,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,
                    borderRadius: 5,
                }}
                //sx={{...style}}
                // sx={{...style
                //width: '430px'
                //  }}
                >

                    <Grid container item xs={12} md={12} mt={2}>
                        <Grid item xs={6} md={6} mt={1}>
                            <Typography sx={{ color: '#28c4ac' }} fontSize='18px' fontWeight={'bold'} id="parent-modal-title">Nueva Actualizacion:</Typography>
                        </Grid>
                        <Grid item xs={2} md={2} >
                            <TextField
                                id="outlined-select-ubicationclinica"
                                select
                                sx={{ width: "200px" }}
                                size="small"
                                label='Seleccione Estado'
                                value={estadopacienteModal}
                                onChange={handleChangeSelect}
                            >
                                {estadoModal.map((option: any) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>


                    <Grid item xs={12} md={12} mt={2}>
                        <Card
                            //key={item.id}
                            sx={{
                                width: "100%",
                                background: "#f3f3f3",
                                borderRadius: "10px",
                                //background: item.color,
                            }}
                        >
                            <CardActionArea className="contenedor">
                                <Grid container p={2} >
                                    <Grid item xs={12} >
                                        <FormControl fullWidth>
                                            <InputBase
                                                id="outlined-multiline-static"
                                                placeholder="Descripcion del Paciente"
                                                multiline
                                                rows={5}
                                                onChange={handleChangeMensaje}
                                            />
                                        </FormControl>
                                    </Grid>

                                </Grid>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid container mt={1}>
                        <Grid item xs={12} mb={2} >


                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className="btn-login2"
                                    onClick={EnviarNuevoObjetoAlArreglo}
                                >
                                    Publicar
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className='btn-login2'
                                // onClick={()=>handleSubmitLogin()}
                                >
                                    Cancelar
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Box>
            </Modal>

            <Modal
                open={showModalTutor}
                onClose={() => setModalTutor(false)}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            //   style={{  }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(60%, -50%)",
                        width: 400,
                        height: 670,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                        borderRadius: 5,
                    }}
                // sx={{ ...stylemensaje
                // , width: 400 
                // }}
                >
                    <Grid item xs={12} md={6} mt={1}>
                        <Typography sx={{ color: '#28c4ac' }} fontSize='20px' fontWeight={'bold'} id="parent-modal-title">TUTOR</Typography>
                    </Grid>
                    <Grid item xs={12} md={12} mt={2} mb={54}>
                        <Card

                            //key={item2.id}
                            sx={{
                                width: "100%",
                                background: "#f3f3f3",
                                borderRadius: "10px",

                            }}
                        >
                            <CardActionArea className="contenedor">
                                <Grid container className="texto-encima" p={2}>
                                    <Grid item xs={12}>
                                        <Grid display="flex" justifyContent="space-between">
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                fontWeight={"bold"}
                                                color="#28c4ac"
                                            >
                                                Claudia Mantila
                                            </Typography>
                                        </Grid>

                                        <Typography gutterBottom>
                                            Hola Doctor! nos puede contar como salio la operacion?
                                            Gracias!
                                        </Typography>
                                        <Grid mt={1}>
                                            <Typography gutterBottom>
                                                08:30 AM
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid container item xs={12} md={12} mt={1} mb={10}>
                        <Grid display="flex">
                            <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="search"
                            >
                                <CameraAltOutlinedIcon sx={{ color: '#28c4ac' }} />
                            </IconButton>
                            <Paper component="form" sx={{ p: "0px 10px"}}>
                                <InputBase
                                    // value={search}
                                    // onChange={(e) => setSearch(e.target.value)}
                                    // on
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Escribe un Mensaje"
                                />
                                <IconButton
                                    type="button"
                                    sx={{ p: "10px" }}
                                    aria-label="search"
                                >
                                    <SendIcon />
                                </IconButton>
                            </Paper>

                            <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="search"
                            >
                                <AttachFileIcon />
                            </IconButton>
                            <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="search"
                            >
                                <MicIcon sx={{ color: '#28c4ac' }} />
                            </IconButton>

                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};
