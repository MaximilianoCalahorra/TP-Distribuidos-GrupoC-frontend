import { Card, TextField, Button, IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import styles from './styles.module.css';

export default function Login() {

  const [passwordVisibility, setPasswordVisibility] = useState (false);



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
              onChange={()=> {}}
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
              onChange={()=> {}}
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
            <Button variant="contained" color="primary" startIcon={<LoginIcon />} sx={{fontWeight:"bold"}}>
              Ingresar
            </Button>
          </div>
        </div>
      </Card>
  </div>
  )
}
