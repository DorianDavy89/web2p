import React from "react";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo1 from '../images/_7ec68ac0-34c7-45c0-baed-b3555f7ccf48.jpeg';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from '@mui/material/Link';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PasswordIcon from '@mui/icons-material/Password';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SchoolIcon from '@mui/icons-material/School';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "../styles/vntlogin.css";


const styleR = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #bc5090',
    boxShadow: 24,
    backgroundColor: '#00202e',
    borderRadius: 10,
    p: 4,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Singin() {

    const [usuario, setUsuario] = useState('');
    const [contra, setContra] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [openNuevo, setOpenNuevo] = useState(false);
    const [openAcerca, setOpenAcerca] = useState(false);
    const [openSalir, setOpenSalir] = useState(false);

    const openModal = (datos, tipo) => {
        if (tipo === 'Insertar') {
            setOpenNuevo(true);
        } else if (tipo === 'Acerca') {
            setOpenAcerca(true);
        } else if (tipo === 'Salir') {
            clearLocalStorage();
            setOpenSalir(true);
        }
    };

    const clearLocalStorage = () => {
        localStorage.clear();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        
    };

    const handleLogin = async () => {

        try {
            const response = await fetch('http://127.0.0.1:5000/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login_user: usuario, login_password: contra }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.data.token);
                localStorage.setItem('id_stu', data.data.id_stu);
                localStorage.setItem('user_stu', data.data.user_stu);
                localStorage.setItem('email_stu', data.data.email_stu);
                localStorage.setItem('firstname_stu', data.data.firstname_stu);
                localStorage.setItem('lastname_stu', data.data.lastname_stu);
                localStorage.setItem('whatsapp_stu', data.data.whatsapp_stu);
                localStorage.setItem('university_stu', data.data.university_stu);
                localStorage.setItem('career_stu', data.data.career_stu);
                localStorage.setItem('skills_stu', data.data.skills_stu);
                localStorage.setItem('est_hoja', data.data.est_hoja);
                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Credenciales Correctas!",
                    footer: 'Bienvenido de Regreso'
                });
                setTimeout(() => {
                    navigate('/pagehome/');
                }, 1200);

            } else {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "Credenciales incorrectas!",
                    footer: 'Vuelve a Revisar'
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sin Sistema!",
                footer: 'Vuelve a Revisar'
            });
        }


    };

    useEffect(() => {
        if (mensaje) {
            alert(mensaje);
        }
    }, [mensaje]);

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [carrera, setCarrera] = useState('');


    const crearCliente = async () => {

        try {
            const response = await fetch('http://127.0.0.1:5000/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_stu: user,
                    password_est: pass,
                    email_stu: email,
                    firstname_stu: nombre,
                    career_stu: carrera
                })
            });

            const data = await response.json();
            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Usuario Creado!",
                    footer: 'Prosiga a Logearse'
                });
            }
            else if (response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Algo salio mal!",
                    footer: 'Vuelve a Revisar'
                });

            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sin sistema!",
                footer: 'Vuelve a Revisar'
            });
        }
    };

    const handleCrearSubmit = (event) => {
        event.preventDefault();

        if (!user || !pass || !email || !nombre || !carrera) {
            alert("Existen campos vacios");
            return;
        }
        crearCliente();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setOpenNuevo(false);
    };

    const actions = [
        { icon: <ExitToAppIcon onClick={() => openModal('', 'Salir')} style={{ fontSize: 30 }} />, name: 'Salir' },
        { icon: <InfoIcon onClick={() => openModal('', 'Acerca')} style={{ fontSize: 30 }} />, name: 'Informacion' },
        { icon: <AssignmentIndIcon onClick={() => openModal('', 'Insertar')} style={{ fontSize: 30 }} />, name: 'Crear Cuenta' },
    ];

    return (
        <div className="container-vntLogin">
            <Container>
                <Box sx={{ height: '100vh' }}>
                    <div className="cabecera-login">
                        <h1>EduNetwork</h1>
                    </div>
                    <br />
                    <div className="login-izq">
                        <div className="logo-empresa">
                            <img src={logo1} alt="" width="400"></img>
                        </div>
                        <br />
                        <div className="saludo">
                            <h2>Bienvenido de Regreso!</h2>
                            <br />
                            <p>Usa tus Credenciales para Loguearte</p>
                        </div>
                    </div>

                    <div className="login-der">
                        <div className="cabecera-singin">
                            <h1>Sing In</h1>
                        </div>
                        <div className="iconos-singin">
                            <Link href="#" className="icon"><GoogleIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                            <Link href="#" className="icon"><FacebookIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                            <Link href="#" className="icon"><GitHubIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                            <Link href="#" className="icon"><InstagramIcon sx={{ fontSize: 40, margin: '0 10px', color: '#ff6361' }} /></Link>
                        </div>

                        <div className="subtitulo">
                            <span>Usa tu User/Password</span>
                        </div>
                        <br />
                        <div className="form-singin">
                            <FormControl>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AssignmentIndIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="usuario" label="Usuario" variant="filled"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <PasswordIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="contra" label="Contraseña" type="password" variant="filled"
                                        value={contra}
                                        onChange={(e) => setContra(e.target.value)}
                                        sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                </Box>
                            </FormControl>
                            <br />
                            <div className="boton-singin">
                                <Button className="btn-registrar" variant="contained" color="success"
                                    sx={{ marginRight: '40px' }}
                                    onClick={handleLogin}>
                                    Ingresar
                                </Button>
                            </div>
                            <br />
                            <br />
                        </div>
                    </div>

                    <SpeedDial
                        ariaLabel="SpeedDial openIcon example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                FabProps={{
                                    sx: {
                                        width: 40,
                                        height: 40,
                                    },
                                }}
                            />
                        ))}
                    </SpeedDial>
                </Box>
            </Container>

            {/* Modal registro usuario */}

            <div className="modal-registroN">
                <Modal open={openNuevo}>
                    <Box sx={styleR}>
                        <div className="cabecera-registro">
                            <h2>Nuevo Usuario</h2>
                        </div>
                        <br />
                        <div className="formulario-nuevo">
                            <FormControl>
                                <div className="registro-izq">
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <AssignmentIndIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                        <TextField id="usuario" label="Nombre Usuario" variant="filled" value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                            sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <PasswordIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                        <TextField id="contra" label="Contraseña" variant="filled" value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                            sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2, }}>
                                        <AlternateEmailIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                        <TextField id="email" label="Email" variant="filled" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                    </Box>
                                </div>

                                <div className="registro-der">
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <EmojiEmotionsIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                        <TextField id="nombre" label="Nombre" variant="filled" value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <SchoolIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                        <TextField id="marca" label="Carrera" variant="filled" value={carrera}
                                            onChange={(e) => setCarrera(e.target.value)}
                                            sx={{ input: { color: 'black', backgroundColor: '#fff', width: '200px', height: '10px' } }} />
                                    </Box>
                                </div>
                            </FormControl>
                            <br />
                            <br />
                        </div>
                        <div className="botones-formnuevo">
                            <Button className="btn-registrar" variant="contained" color="success" onClick={handleCrearSubmit}>
                                Registrar
                            </Button>
                            <Button className="btn-cancelarRegistro" variant="contained" color="info"
                                onClick={() => setOpenNuevo(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>

            {/* Fin modal registro usuario */}



            {/* Modal Acerca De */}

            <Dialog
                open={openAcerca}
                TransitionComponent={Transition}
                keepMounted
                setOpenAcerca={false}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#00202e',
                        borderRadius: 5,
                        border: '2px solid #bc5090',
                    },
                }}
            >
                <DialogTitle sx={{ color: '#ffa600' }}>{"Proyecto Web Avanzado 2do Parcial"}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#ffd380', fontFamily: 'Roboto', fontSize: '20px' }} id="alert-dialog-slide-description">
                        <br /> Proyecto de fin de semestre denominado EDUNETWORK <br />
                        El front de esta aplicacion web fue desarrollada en REACT, <br />
                        para el back se uso PYTHON, mientras que para la base de datos <br />
                        se uso POSTGRESQL. <br />
                        <br /> Cada integrante trabajo arduamente en este proyecto.<br />
                        A continuacion se enlista a los integrantes: <br />
                        ~ Alarcon Rubio Denisse Isabela <br />
                        ~ De la Cruz Alay Joselyne Estefania <br />
                        ~ Nieto Toala Rosendo David <br />
                        ~ Osorio Morales Naomi Yerlin


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpenAcerca(false)}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>


            {/* Fin modal Acerca De */}


            {/* Modal Salir */}

            <Dialog
                open={openSalir}
                TransitionComponent={Transition}
                keepMounted
                setOpenAcerca={false}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: '#00202e',
                        borderRadius: 5,
                        border: '2px solid #bc5090',
                    },
                }}
            >
                <DialogTitle sx={{ color: '#ffa600' }}>{"Gracias por su visita"}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: '#ffd380', fontFamily: 'Roboto', fontSize: '20px' }} id="alert-dialog-slide-description">
                        Vuelva Pronto
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpenSalir(false)}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Fin modal Salir */}
        </div>
    );

}

export default Singin;