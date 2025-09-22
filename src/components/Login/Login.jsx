import { Card, TextField, Button, IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import styles from './styles.module.css';
import UsuarioService from "../../services/UsuarioService";
import { useDispatch } from "../../store/userStore";
import { SET_AUTH_TOKEN, SET_USER_EMAIL, SET_USER_NAME, SET_USER_ROL } from "../../store/actionsTypes";
import { LoadingScreen, Snackbar } from "../UI/index"
import { useNavigate } from "react-router-dom";
import { handleNavigate, toBase64 } from "../../Utils/Utils";

export default function Login() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const [passwordVisibility, setPasswordVisibility] = useState (false);
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
  const [userData, setUserData] = useState ({
    nombreUsuario: "",
    clave: ""
  })
  const login = async () => {
    setSnackbarVisibility(false);
    try {
      const response = await UsuarioService.login(userData);
      dispatch({type: SET_USER_ROL, payload: response.data.rol.nombre});
      dispatch({type: SET_USER_NAME, payload: response.data.nombreUsuario});
      dispatch({type: SET_AUTH_TOKEN, payload: toBase64(response.data.nombreUsuario, response.data.clave)})
       dispatch({type: SET_USER_EMAIL, payload: response.data.email})
      setLoadingScreen({
        message: "Iniciando Sesión",
        duration: 2100,
      }),
      setIsLoading(true),
      setTimeout(() => {
        setUserData({
          nombreUsuario: "",
          clave: ""
        })
        handleNavigate (response.data.rol.nombre, navigate);
      }, 2000)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbar({
        message: "Credenciales inválidas!",
        status: "error"
      })
      setSnackbarVisibility(true);
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Empuje Comunitario</h1>
      </div>
      <Card className={styles.cardContainer} elevation={15}>
        <div className={styles.cardImgContainer}>
          <img src="/IconoPagina.png" alt="" />
        </div>
        <div className={styles.inputsContainer}>
            <div>
              <h2>Iniciar Sesión</h2>
            </div>
            <TextField
              id="filled-hidden-label-small"
              label="Usuario/E-mail"
              value={userData.nombreUsuario}
              onChange={(e)=> setUserData({...userData, nombreUsuario: e.target.value})}
              size="medium"
              sx={{width:"100%"}}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              id=""
              label="Contraseña"
               value={userData.clave}
              onChange={(e)=> setUserData({...userData, clave: e.target.value})}
              type={passwordVisibility ? "text" : "password"}
              size="medium"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                  <IconButton onClick={()=> {setPasswordVisibility(!passwordVisibility)}} >
                    <InputAdornment position="end">
                      {!passwordVisibility ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </InputAdornment>
                  </IconButton>  
                  )
                },
              }}
            />
          <div className={styles.buttonContainer}>
            <Button variant="contained" color="primary" startIcon={<LoginIcon />} sx={{fontWeight:"bold"}} onClick={login}>
              Ingresar
            </Button>
          </div>
        </div>
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
