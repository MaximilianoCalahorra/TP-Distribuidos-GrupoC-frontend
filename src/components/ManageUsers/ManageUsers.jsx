import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { MenuItem, Card, Button, InputAdornment } from '@mui/material'
import UsuarioService from "../../services/UsuarioService";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Roles } from '../../constants/Roles'
import PropTypes from "prop-types";
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';

export default function ManageUsers({action}) {
  const { id } = useParams();
  const [snackbarVisibility, setSnackbarVisibility] = useState (false);
  const [snackbar, setSnackbar] = useState({
    status: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });
  const [userData, setUserData] = useState({
    nombreUsuario: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    rol: {
      nombre: "",
    },
  })

  const authToken = useSelector((state) => state.authToken)
  
  useEffect (()=> {
    if (id) {
      const traerUsuario = async () => {
        const response = await UsuarioService.traerUsuario(id, authToken);
        setUserData(response.data);
      }
      traerUsuario ();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createUser = async () => {
    setIsLoading(false);
    setSnackbarVisibility(false);
    try {
      await UsuarioService.crearUsuario(userData, authToken);
      setLoadingScreen({
        message: "Creando usuario",
        duration: 2100,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Usuario creado con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setUserData({
          nombreUsuario: "",
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          rol: "",
        })
        setSnackbarVisibility(true);
      }, 2000)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbar({
        message: "Ya existe un usuario con ese email o nombre de usuario!",
        status: "error"
      })
      setSnackbarVisibility(true);
    }
  }

  const modifyUser = async () => {
    setIsLoading(false);
    setSnackbarVisibility(false);
    try {
      const payload = {...userData, idUsuario: id}
      await UsuarioService.modificarUsuario(payload, authToken);
      setLoadingScreen({
        message: "Modificando usuario",
        duration: 2100,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Usuario modificado con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setUserData({
          nombreUsuario: "",
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
          rol: "",
        })
        setSnackbarVisibility(true);
      }, 2000)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbar({
        message: "Ya existe un usuario con ese email o nombre de usuario!",
        status: "error"
      })
      setSnackbarVisibility(true);
    }
  }

  const datosCompletos = (objeto) => {
    return Object.values(objeto).every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  return (
    <div className={styles.container}>
      <Card elevation={5} sx={{display:"flex", flexDirection:"column", padding:"20px", gap:"30px"}}>
        {action == "addUser" ? (
          <h1>Crear nuevo usuario</h1>
        ) : (
          <h1>Modificar usuario</h1>
        )}
         <TextField
          select
          label="Rol"
          size='small'
          value={userData.rol.nombre}
          onChange={(e)=>setUserData({...userData, rol: {nombre: e.target.value}})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SupervisorAccountIcon />
                </InputAdornment>
              ),
            },
          }}
        >
          {Roles.map((rol, i)=> (
            <MenuItem key={i} value={rol}>{rol}</MenuItem>
          ))}
        </TextField>
        <TextField
          id=""
          label="Nombre de usuario"
          size='small'
          value={userData.nombreUsuario}
          onChange={(e)=>setUserData({...userData, nombreUsuario: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id=""
          label="Nombre"
          size='small'
          value={userData.nombre}
          onChange={(e)=>setUserData({...userData, nombre: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id=""
          label="Apellido"
          size='small'
          value={userData.apellido}
          onChange={(e)=>setUserData({...userData, apellido: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id=""
          label="Telefono"
          size='small'
          value={userData.telefono}
          onChange={(e)=>setUserData({...userData, telefono: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id=""
          label="E-mail"
          size='small'
          value={userData.email}
          onChange={(e)=>setUserData({...userData, email: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        {action == "addUser" ? (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}} onClick={()=> {createUser ()}} 
          disabled={!datosCompletos(userData)}>Cargar usuario</Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}} onClick={()=> {modifyUser ()}}
          disabled={!datosCompletos(userData)}>Modificar usuario</Button>
        )}
      </Card>
      {snackbarVisibility && (
        <Snackbar
          status={snackbar.status}
          message={snackbar.message}
          visibility={snackbarVisibility}
        />
      )}
      {isLoading && (
        <LoadingScreen
            message={loadingScreen.message}
            duration={loadingScreen.duration}
        />
      )}
    </div>
  )
}

ManageUsers.propTypes = {
  action: PropTypes.string.isRequired,
};
