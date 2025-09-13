import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Divider, Typography} from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';

function ListDialog({mostrarAlerta, elementos, closeAlerta, tipoListado}) {

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
    <DialogTitle sx={{textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
      <img src="/IconoPagina.png" alt="" 
        style={{height:"50px"}}
      />
      <Typography variant="h5" color="initial" sx={{fontWeight:"bold", color:"black"}}>
        Listado de {tipoListado}
      </Typography>
    </DialogTitle>
    <Divider sx={{border:"solid 2px rgb(25, 118, 210)"}}></Divider>
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
      {elementos.length == 0 && (
        <h4>No existen {tipoListado} asociados a este evento</h4>
      )}
    </DialogContent>
  </Dialog>
  );
}

ListDialog.propTypes = {
    mostrarAlerta: PropTypes.bool.isRequired,
    elementos: PropTypes.array.isRequired,
    closeAlerta: PropTypes.func.isRequired,
    mensajeAlerta: PropTypes.string.isRequired
};

export default ListDialog;