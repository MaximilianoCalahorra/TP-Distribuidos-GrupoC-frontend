import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, Typography, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from "prop-types";
import { Dialog } from '@mui/material';

function MembersListDialog({ mostrarAlerta, miembros, voluntariosExternos, closeAlerta }) {

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
      <DialogTitle sx={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
        <img src="/IconoPagina.png" alt="" style={{ height: "50px" }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
          Miembros
        </Typography>
      </DialogTitle>

      <Divider sx={{ border: "solid 2px rgb(25, 118, 210)" }} />

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

      <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        {miembros.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No existen miembros asociados a este evento
          </Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {miembros.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={item?.nombre + " " + item?.apellido}
                  secondary={(item?.rol ? `Rol: ${item?.rol?.nombre}` : null)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

       <DialogTitle sx={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
        <img src="/IconoPagina.png" alt="" style={{ height: "50px" }} />
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
          Listado de Voluntarios externos
        </Typography>
      </DialogTitle>

      <Divider sx={{ border: "solid 2px rgb(25, 118, 210)" }} />

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

      <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        {voluntariosExternos.length === 0 ? (
          <Typography variant="body1" sx={{ mt: 2 }}>
            No existen voluntarios externos asociados a este evento
          </Typography>
        ) : (
          <List sx={{ width: '100%' }}>
            {voluntariosExternos.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={item?.nombre + " " + item?.apellido}
                  secondary={(item?.idOrganizacion ? `Organización: ${item?.idOrganizacion}` : null)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}

MembersListDialog.propTypes = {
  mostrarAlerta: PropTypes.bool.isRequired,
  miembros: PropTypes.array.isRequired,
  voluntariosExternos: PropTypes.array.isRequired,
  closeAlerta: PropTypes.func.isRequired,
};

export default MembersListDialog;