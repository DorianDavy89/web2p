import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Modal from '@mui/material/Modal';
import { FormControl } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';
import AndroidIcon from '@mui/icons-material/Android';
import SchoolIcon from '@mui/icons-material/School';
import TerminalIcon from '@mui/icons-material/Terminal';
import Swal from 'sweetalert2';
import logo1 from '../images/_7ec68ac0-34c7-45c0-baed-b3555f7ccf48.jpeg';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import "../styles/vntinforme.css";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#003f5c',
        color: theme.palette.common.white,
        fontSize: '18px',
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#fff0d4',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#fff0d4', // Ajusta el color para las filas pares si es necesario
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const styleP = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    bgcolor: 'background.paper',
    border: '2px solid #8a508f',
    boxShadow: 24,
    backgroundColor: '#00202e',
    borderRadius: 5,
    p: 4,
};

const styleB = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 880,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#ffe9c0',
    borderRadius: 5,
    p: 4,
};

const styleMen = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#ffe9c0',
    borderRadius: 5,
    p: 4,
};

const styleH = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#00202e',
    borderRadius: 5,
    p: 4,
};

const styleE = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#ffe9c0',
    borderRadius: 5,
    p: 4,
    color: 'white'
};


function Pagehome() {

    const id = localStorage.getItem('id_stu');
    const user = localStorage.getItem('user_stu');
    const email = localStorage.getItem('email_stu');
    const nombre = localStorage.getItem('firstname_stu');
    const apellido = localStorage.getItem('lastname_stu');
    const numero = localStorage.getItem('whatsapp_stu');
    const universidad = localStorage.getItem('university_stu');
    const carrera = localStorage.getItem('career_stu');
    const habilidades = localStorage.getItem('skills_stu');
    const curriculum = localStorage.getItem('est_hoja');
    const tokenapp = localStorage.getItem('authToken');

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const [openver, setOpenVer] = useState(false);
    const [sendPdf, setSendPdf] = useState(false);
    const [openEditar, setOpenEditar] = useState(false);
    const [openHoja, setOPenHoja] = useState(false);
    const [openBuzon, setOPenBuzon] = useState(false);
    const [openEliminar, setOPenEliminar] = useState(false);
    const [openVacante, setOPenVacante] = useState(false);
    const [seleccionarPerfil, setSeleccionarPerfil] = useState("");
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState('');
    const [image, setImage] = useState(null);
    const [selecVacante, setSelecVacante] = useState({ id_empresa: 0, nombre_empresa: "", correo_empresa: "", fecha_postulacion: "", descripcion_corta: "", descripcion_completa: "" });

    const openModal = (datos, tipo) => {
        setSeleccionarPerfil({ id, email, nombre, apellido, numero, universidad, carrera, habilidades, curriculum });
        setSelecVacante(datos);
        (tipo === 'Ver') && setOpenVer(true);
        (tipo === 'Enviarpdf') && setSendPdf(true);
        (tipo === 'Editar') && setOpenEditar(true);
        (tipo === 'Hoja') && setOPenHoja(true);
        (tipo === 'Buzon') && setOPenBuzon(true);
        (tipo === 'verVacante') && setOPenVacante(true);
        (tipo === 'Eliminar') && setOPenEliminar(true);
    };

    const handleChangeEditar = e => {
        const { name, value } = e.target;
        setSeleccionarPerfil((prevState) => (
            { ...prevState, [name]: value }
        ))
    }

    const handleFileChange = e => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : '');
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log(file);
    };


    //Funcion para imagen de perfil

    useEffect(() => {

        if (id) {
            const storedImage = localStorage.getItem(`userImage_${id}`);
            if (storedImage) {
                setImage(storedImage);
            }
        }
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataURL = reader.result;
                setImage(imageDataURL);
                localStorage.setItem(`userImage_${id}`, imageDataURL);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarClick = () => {
        document.getElementById('fileInput').click();
    };


    //Funcion para consumir listar vacantes

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/vacant/list', {
                    headers: {
                        'tokenapp': tokenapp,
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setUsers(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [tokenapp]);

    // Final de funcion para consumir listar empresas



    //Funciones para consumir actualizar datos del estudiante

    const actualizarPerfil = async () => {


        try {
            const response = await fetch(`http://127.0.0.1:5000/student/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'tokenapp': tokenapp,
                },
                body: JSON.stringify({
                    email_stu: seleccionarPerfil.email,
                    firstname_stu: seleccionarPerfil.nombre,
                    lastname_stu: seleccionarPerfil.apellido,
                    whatsapp_stu: seleccionarPerfil.numero,
                    university_stu: seleccionarPerfil.universidad,
                    career_stu: seleccionarPerfil.carrera,
                    skills_stu: seleccionarPerfil.habilidades
                })
            });

            const data = await response.json();
            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Cliente Actualizado!",
                    footer: 'Espere a actualizar'
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
                text: "Algo salio mal!",
                footer: 'Vuelve a Revisar'
            });
        }
    };


    const handleEditarSubmit = (event) => {
        event.preventDefault();
        actualizarPerfil();
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        setOpenEditar(false);
    };

    //Final de funciones para consumir actualizar datos del estudiante



    //Funciones para consumir actualizar hoja de vida

    const actualizarHojaVida = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:5000/student/curriculum/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'tokenapp': tokenapp,
                },
                body: JSON.stringify({
                    hoja_stu: fileName,
                    est_hoja: "activado"

                })
            });

            const data = await response.json();
            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Perfecto",
                    text: "Curriculum Subido!",
                    footer: 'Revise'
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

    const handleCurrSubmit = (event) => {
        event.preventDefault();

        actualizarHojaVida();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        setOPenHoja(false);
    };

    //Final funciones para consumir crear hoja de vida


    const handleChats = async () => {

        Swal.fire({
            icon: "success",
            title: "Chats",
        });
        setTimeout(() => {
            navigate('/chats/');
        }, 1000);


    }



    //Funciones para mostrar menu lateral

    const actions = [
        { icon: <DeleteForeverIcon onClick={() => openModal('', 'Eliminar')} style={{ color: 'red' }} />, name: 'Eliminar Cuenta' },
        { icon: <PictureAsPdfIcon onClick={() => openModal('', 'Hoja')} />, name: 'Curriculum' },
        { icon: <ChatIcon onClick={handleChats} />, name: 'Chats' },
        { icon: <AccountBoxIcon onClick={() => openModal('', 'Editar')} />, name: 'Editar Perfil' },
    ];

    // Fin funciones para mostrar menu lateral



    //Funcion para enviar curriculum del estudiante

    const sendCurr = async () => {


        if (curriculum) {
            Swal.fire({
                icon: "success",
                title: "Perfecto",
                text: "Curriculum Enviado con Exito!",
                footer: 'Gracias'
            });
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usted aun no ha Subido su Curriculum!",
                footer: 'Proceda a subirlo en la seccion de menu lateral'
            });
        }

    };

    const handlesendCurrSubmit = (event) => {
        event.preventDefault();

        sendCurr();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    //Fin funcion para enviar curriculum del estudiante




    // Funcion para eliminar cuenta

    const eliminarCuenta = async () => {


        try {
            const response = await fetch(`http://127.0.0.1:5000/student/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'tokenapp': tokenapp
                },
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "¡Perfil Eliminado!",
                    text: "Regresando a pantalla inicial."
                });
            } else if (response.status === 404) {
                Swal.fire({
                    icon: "error",
                    title: "¡Oops!",
                    text: "Algo salió mal. Cliente no encontrado."
                });
            }
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            Swal.fire({
                icon: "error",
                title: "¡Oops!",
                text: "Algo salió mal. Por favor, vuelve a intentarlo."
            });
        }
    };

    const handleEliminarSubmit = (event) => {
        event.preventDefault();
        eliminarCuenta();
        setTimeout(() => {
            navigate("/");
        }, 2000);
        setOPenEliminar(false);

    };

    return (

        <div className="container-vtInfrorme">
            <Container >
                <Box sx={{ height: '100vh' }}>
                    <div className="header-vtInforme">
                        <h1>EduNetwork</h1>
                        <div className="icon-salir">
                            <Link href="/" className="icon-salir" ><LogoutIcon sx={{ fontSize: 40, color: '#bc5090' }} /></Link>
                        </div>
                        <div className="logo-cabecera">
                            <img src={logo1} alt="" width="400"></img>
                        </div>
                        <br />
                        <br />
                        <div className="nombre-marca">
                            <div className="icono-nombre">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <Button> <AndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} ></AndroidIcon> </Button>
                                    <TextField id="nombreusuario" label="Usuario" variant="filled" InputProps={{ readOnly: true }}
                                        value={nombre}
                                        sx={{ input: { color: 'black', backgroundColor: '#fbf2c4', width: '200px', height: '10px' } }} />
                                </Box>
                            </div>

                            <div className="icono-tel">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <SchoolIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="carrera" label="Carrera" variant="filled" InputProps={{ readOnly: true }}
                                        value={carrera}
                                        sx={{ input: { color: 'black', backgroundColor: '#fbf2c4', width: '200px', height: '10px' } }} />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="header-sub">
                        <br />
                        <h2>Vacantes Disponibles</h2>
                    </div>

                    <div className="contenido-tabla">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Nombre Empresa</StyledTableCell>
                                        <StyledTableCell align="center">Detalle</StyledTableCell>
                                        <StyledTableCell align="center">Fecha publicacion</StyledTableCell>
                                        <StyledTableCell align="center">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        users.map((dato, key) => {
                                            return <StyledTableRow key={dato.id_empresa}>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.id_empresa}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.nombre_empresa}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.descripcion_corta}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.fecha_postulacion}</StyledTableCell>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.correo_empresa}</StyledTableCell>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.descripcion_completa}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <div className="btn-acciones">
                                                        <Button
                                                            onClick={() => openModal(dato, 'verVacante')}> <VisibilityIcon></VisibilityIcon>
                                                        </Button>
                                                        <Button
                                                            onClick={handlesendCurrSubmit} ><PictureAsPdfIcon></PictureAsPdfIcon>
                                                        </Button>
                                                    </div>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <br />
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
                            />
                        ))}
                    </SpeedDial>
                </Box>
            </Container>


            {/* Modal editar perfil */}

            <div className="modal-config">
                <Modal open={openEditar}>
                    <Box sx={styleP}>
                        <div className="cabecera-config">
                            <h2>Perfil</h2>
                        </div>

                        <div className="identificador">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                <AndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                <TextField id="id_usuario" label="ID" variant="filled" value={seleccionarPerfil && seleccionarPerfil.id} InputProps={{ readOnly: true }}
                                    sx={{ input: { color: 'white', width: '50px', height: '15px', backgroundColor: '#003f5c' } }} />
                            </Box>
                        </div>

                        <div className="icono-perfil">
                            <Stack direction="row" spacing={2}>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <Avatar sx={{ width: 70, height: 70 }}
                                    onClick={handleAvatarClick}
                                    src={image}>
                                    {!image && nombre}
                                </Avatar>
                            </Stack>
                        </div>

                        <br />
                        <div className="formulario-mant">
                            <FormControl>
                                <div className="lado-iz">
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <AlternateEmailIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField
                                            id="email" label="Email" variant="filled" value={seleccionarPerfil && seleccionarPerfil.email}
                                            name="email"
                                            onChange={handleChangeEditar}
                                            sx={{ input: { color: '#00202e', fontWeight: 'Bold', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <EmojiEmotionsIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField
                                            id="firstname_stu" label="Nombre" variant="filled" value={seleccionarPerfil && seleccionarPerfil.nombre}
                                            name="nombre"
                                            onChange={handleChangeEditar}
                                            sx={{ input: { color: '#00202e', fontWeight: 'Bold', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <InsertEmoticonIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField
                                            id="lastname_stu" label="Apellido" variant="filled" value={seleccionarPerfil && seleccionarPerfil.apellido}
                                            name="apellido"
                                            onChange={handleChangeEditar}
                                            sx={{ input: { color: '#00202e', fontWeight: 'Bold', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <WhatsAppIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField
                                            id="whatsapp_stu" label="Whatsapp" variant="filled" value={seleccionarPerfil && seleccionarPerfil.numero}
                                            name="numero"
                                            onChange={handleChangeEditar}
                                            sx={{ input: { color: '#00202e', fontWeight: 'Bold', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                        />
                                    </Box>

                                </div>
                                <div className="lado-der">
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <HomeWorkIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField
                                            id="universidad" label="Universidad" variant="filled" value={seleccionarPerfil && seleccionarPerfil.universidad}
                                            name="universidad"
                                            onChange={handleChangeEditar}
                                            sx={{ input: { color: '#00202e', fontWeight: 'Bold', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <SchoolIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField
                                            id="carrera" label="Carrera" variant="filled" value={seleccionarPerfil && seleccionarPerfil.carrera}
                                            name="carrera"
                                            onChange={handleChangeEditar}
                                            sx={{ input: { color: '#00202e', fontWeight: 'Bold', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                        />
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <TerminalIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField
                                            id="habilidades" label="Habilidades" variant="filled" value={seleccionarPerfil && seleccionarPerfil.habilidades}
                                            name="habilidades"
                                            onChange={handleChangeEditar}
                                            sx={{ input: { color: '#00202e', fontWeight: 'Bold', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                        />
                                    </Box>

                                </div>
                            </FormControl>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="botones-formconfig">
                            <Button className="btn-registrarconfig" variant="contained" color="success" onClick={handleEditarSubmit}>
                                Actualizar
                            </Button>
                            <Button className="btn-cancelarconfig" variant="contained" color="info"
                                onClick={() => setOpenEditar(false)}>
                                Cancelar
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>



            {/* Modal subir hoja de vida */}

            <div className="modal-config">
                <Modal open={openHoja}>
                    <Box sx={styleH}>
                        <div className="cabecera-hoja">
                            <h2>Hoja de Vida</h2>
                        </div>
                        <br />

                        <div className="formulario-hoja">
                            <FormControl>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <AndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                    <TextField id="id_usuario" label="ID Usuario" variant="filled" value={seleccionarPerfil && seleccionarPerfil.id} InputProps={{ readOnly: true }}
                                        sx={{ input: { color: '#00202e', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }} />
                                </Box>

                                <div className="lado-hoja">
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                        <PictureAsPdfIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '15px' }} />
                                        <TextField id="hojaVida" label="Suba su Curriculum" variant="filled" InputProps={{ readOnly: true }}
                                            sx={{ input: { color: '#00202e', width: '200px', height: '15px', backgroundColor: '#fff0d4' } }}
                                            value={fileName}
                                            onChange={(e) => setFileName(e.target.value)} />
                                    </Box>
                                    <form onSubmit={handleSubmit}>
                                        <input type="file" onChange={handleFileChange} />
                                    </form>

                                </div>
                            </FormControl>
                        </div>
                        <br />
                        <br />
                        <div className="botones-hoja">
                            <Button className="btn-registrarHoja" variant="contained" color="secondary" onClick={handleCurrSubmit}>
                                Subir
                            </Button>
                            <Button className="btn-cancelarHoja" variant="contained" color="info"
                                onClick={() => setOPenHoja(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>


            {/* Modal para ver vacante completo */}

            <Modal open={openVacante}>
                <Box sx={styleMen}>
                    <FormControl>
                        <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off">
                            <ReviewsIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                            <TextField
                                id="standard" label="Comentario" multiline={true} readOnly
                                rows={5} variant="filled"
                                value={selecVacante && selecVacante.descripcion_completa}
                                inputProps={{ style: { color: 'black' } }}
                            />
                        </Box>
                    </FormControl>
                    <div className="boton-mensaje">
                        <Button className="btn-cancelarMensaje" variant="contained" color="info"
                            onClick={() => setOPenVacante(false)}>
                            Cerrar
                        </Button>
                    </div>
                </Box>
            </Modal>


            {/* Modal eliminar cuenta */}

            <Modal open={openEliminar}>
                <Box sx={styleE}>
                    <FormControl>
                        <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '30ch' },
                            }}
                            noValidate
                            autoComplete="off">
                            <HighlightOffIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                            <TextField
                                id="standard" label="Accion Irreversible, Eliminar Cuenta?" multiline={true}
                                rows={2} variant="filled"
                                inputProps={{ style: { color: 'black' } }} />
                        </Box>
                    </FormControl>
                    <div className="botones-eliminar">
                        <Button className="btn-eliminar" variant="contained" color="warning" onClick={handleEliminarSubmit}>
                            Si
                        </Button>
                        <Button className="btn-cancelarelim" variant="contained" color="info"
                            onClick={() => setOPenEliminar(false)}>
                            No
                        </Button>
                    </div>
                </Box>
            </Modal>

        </div>
    );
}

export default Pagehome;