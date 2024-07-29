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
import Modal from '@mui/material/Modal';
import { FormControl } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AndroidIcon from '@mui/icons-material/Android';
import SchoolIcon from '@mui/icons-material/School';
import Swal from 'sweetalert2';
import logo1 from '../images/_7ec68ac0-34c7-45c0-baed-b3555f7ccf48.jpeg';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import BackspaceIcon from '@mui/icons-material/Backspace';
import LogoutIcon from '@mui/icons-material/Logout';
import "../styles/vtchats.css";



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
        backgroundColor: '#ffffff',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#ffffff',
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

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
    p: 4,
};

const styleRes = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: '#ffe9c0',
    p: 4,
};



function Chats() {


    const id = localStorage.getItem('id_stu');
    const nombre = localStorage.getItem('firstname_stu');
    const carrera = localStorage.getItem('career_stu');
    const tokenapp = localStorage.getItem('authToken');

    const [buzon, setBuzon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [destinatario, setDestinatario] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const navigate = useNavigate();


    const [openMensaje, setOpenMensaje] = useState('');
    const [openRespuesta, setOpenRespuesta] = useState('');
    const [selecBuzon, setSelecBuzon] = useState({ id_buzon: 0, empre_buzon: "", detalle_corto: "", detalle_completo: "", fecha_buzon: "" });

    const openModal = (datos, tipo) => {
        setSelecBuzon(datos);
        (tipo === 'verMensaje') && setOpenMensaje(true);
        (tipo === 'respuesta') && setOpenRespuesta(true);

    };

    //Funcion para consumir listar buzon

    useEffect(() => {

        const fetchBuzon = async () => {
            try {

                const response = await fetch('http://127.0.0.1:5000/mailbox/list', {
                    headers: {
                        'tokenapp': tokenapp,
                    }
                });
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const data = await response.json();
                setBuzon(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchBuzon();
    }, []);

    //Final de funcion para consumir listar buzon




    //Funcion para enviar respuesta de correo

    const sendRespuesta = async () => {

        alert("Mensaje enviado.");


    };

    const handleRespuestaSubmit = (event) => {
        event.preventDefault();

        if (!respuesta) {
            alert("Campo Vacio.")
            return;
        }

        sendRespuesta();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    //Final funcion para enviar respuesta del correo



    const handleRegresar = async () => {

        Swal.fire({
            icon: "success",
            title: "Regresando",
        });
        setTimeout(() => {
            navigate('/pagehome/');
        }, 1000);
    }

    const handleSalir = async () => {

        Swal.fire({
            icon: "success",
            title: "Saliendo",
        });
        setTimeout(() => {
            navigate("/");
        }, 1000);


    }

    //Funciones para mostrar menu lateral

    const actions = [
        { icon: <LogoutIcon onClick={handleSalir} />, name: 'Salir' },
        { icon: <BackspaceIcon onClick={handleRegresar} />, name: 'Regresar' },
    ];

    // Fin funciones para mostrar menu lateral

    return (

        <div className="container-vtChats">
            <Container >
                <Box sx={{ height: '100vh' }}>
                    <div className="header-vtChats">
                        <h1>EduNetwork</h1>
                        <div className="logo-cabeceraChats">
                            <img src={logo1} alt="" width="400"></img>
                        </div>
                        <br />
                        <br />
                        <div className="nombre-marcaChats">
                            <div className="icono-nombreChats">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <Button> <AndroidIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} ></AndroidIcon> </Button>
                                    <TextField id="nombreusuario" label="Usuario" variant="filled" InputProps={{ readOnly: true }}
                                        value={nombre}
                                        sx={{ input: { color: 'black', width: '200px', height: '10px' } }} />
                                </Box>
                            </div>

                            <div className="icono-telChats">
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                    <SchoolIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                    <TextField id="carrera" label="Carrera" variant="filled" InputProps={{ readOnly: true }}
                                        value={carrera}
                                        sx={{ input: { color: 'black', width: '200px', height: '10px' } }} />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="header-subChats">
                        <br />
                        <h2>Chats</h2>
                    </div>

                    <div className="contenido-tablaChats">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="center">Empresa</StyledTableCell>
                                        <StyledTableCell align="center">Descripcion</StyledTableCell>
                                        <StyledTableCell align="center">Fecha</StyledTableCell>
                                        <StyledTableCell align="center">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        buzon.map((dato, key) => {
                                            return <StyledTableRow key={dato.id_buzon}>
                                                <StyledTableCell style={{ display: 'none' }}>{dato.id_buzon}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.empre_buzon}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.detalle_corto}</StyledTableCell>
                                                <StyledTableCell align="center">{dato.fecha_buzon}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <div className="btn-acciones">
                                                        <Button
                                                            onClick={() => openModal(dato, 'verMensaje')}> <VisibilityIcon></VisibilityIcon>
                                                        </Button>
                                                        <Button
                                                            onClick={() => openModal(dato, 'respuesta')} ><InsertCommentIcon></InsertCommentIcon>
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

            {/* Modal para responder ver mensaje */}

            <Modal open={openRespuesta}>
                <Box sx={styleRes}>
                    <FormControl>
                        <div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: 2 }}>
                                <ContactMailIcon className="icono" style={{ fontSize: 40, color: '#bc5090', marginRight: '8px' }} />
                                <TextField id="destinatario" label="Destintario" variant="filled" readOnly
                                    sx={{ input: { color: 'black', width: '200px', height: '10px' } }}
                                    value={selecBuzon && selecBuzon.empre_buzon}
                                    onChange={(e) => setDestinatario(e.target.value)} />
                            </Box>
                        </div>
                        <Box component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off">
                            <ReviewsIcon className="icono" style={{ fontSize: 40, color: '#bc5090' }} />
                            <TextField
                                id="standard" label="Respuesta" multiline={true}
                                rows={5} variant="filled"
                                inputProps={{ style: { color: 'black' } }}
                                value={respuesta}
                                onChange={(e) => setRespuesta(e.target.value)} />
                        </Box>
                    </FormControl>
                    <div className="boton-respuesta">
                        <Button className="btn-enviarMensaje" variant="contained" color="secondary"
                            onClick={handleRespuestaSubmit}>
                            Enviar
                        </Button>
                        <Button className="btn-cancelarMensaje" variant="contained" color="info"
                            onClick={() => setOpenRespuesta(false)}>
                            Cerrar
                        </Button>
                    </div>
                </Box>
            </Modal>


            {/* Modal para ver mensaje completo */}

            <Modal open={openMensaje}>
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
                                value={selecBuzon && selecBuzon.detalle_completo}
                                inputProps={{ style: { color: 'black' } }}
                            />
                        </Box>
                    </FormControl>
                    <div className="boton-mensaje">
                        <Button className="btn-cancelarMensaje" variant="contained" color="info"
                            onClick={() => setOpenMensaje(false)}>
                            Cerrar
                        </Button>
                    </div>
                </Box>
            </Modal>


        </div>
    );
}

export default Chats;