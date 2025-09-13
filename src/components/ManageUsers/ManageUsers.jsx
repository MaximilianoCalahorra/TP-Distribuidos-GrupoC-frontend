import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Select, MenuItem, FormControl, InputLabel, Card, Button, InputAdornment } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Roles } from '../../constants/Roles'
import PropTypes from "prop-types";
import styles from './styles.module.css'

export default function ManageUsers({action}) {
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
          onChange={()=>{}}
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
            <MenuItem key={i} onClick={()=> {}}>{rol}</MenuItem>
          ))}
        </TextField>
        <TextField
          id=""
          label="Nombre de usuario"
          size='small'
          onChange={()=>{}}
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
          onChange={()=>{}}
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
          onChange={()=>{}}
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
          onChange={()=>{}}
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
          onChange={()=>{}}
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
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}}>Cargar usuario</Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}}>Modificar usuario</Button>
        )}
      </Card>
    </div>
  )
}

ManageUsers.propTypes = {
  action: PropTypes.string.isRequired,
};
