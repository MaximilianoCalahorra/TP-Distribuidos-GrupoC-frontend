import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Typography, Box, Button} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';

function AlertaDialog({mostrarAlerta, accion, closeAlerta, mensajeAlerta}) {

  return (
    <Dialog
    onClose={closeAlerta}
    aria-labelledby="customized-dialog-title"
    open={mostrarAlerta}
    sx={{
      "& .MuiDialog-paper": {
        borderRadius: "16px",
        padding: "16px", 
        backgroundColor: "#f0f0f0",
        width: "600px",
      },
    }}
  >
    <IconButton
      aria-label="close"
      onClick={closeAlerta}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'black',
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
        <Box sx={{textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
            <img src="/IconoPagina.png" alt="" 
                style={{height:"80px"}}
            />
            <img src="/alerta.png" alt="" 
                style={{height:"100px"}}/>
        </Box>
        <Typography variant="h4" color="error" sx={{fontWeight:"bold"}}>¡ATENCIÓN!</Typography>
        <Typography variant="h6" color="black" sx={{fontWeight:"bold"}}>{mensajeAlerta}.</Typography>
        <Typography variant="h6" color="black" sx={{fontWeight:"bold"}}>¿Estás seguro?</Typography>
        <Box sx={{display:"flex", gap:"20px", pt:2}}>
            <Button variant="outlined" color="error" onClick={closeAlerta}>Cancelar</Button>
            <Button variant='contained' color='primary' onClick={accion}>Confirmar</Button>
        </Box>
    </DialogContent>
  </Dialog>
  );
}


AlertaDialog.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    accion: PropTypes.func.isRequired,
    closeAlerta: PropTypes.func.isRequired,
    mensajeAlerta: PropTypes.string.isRequired
};

export default AlertaDialog;