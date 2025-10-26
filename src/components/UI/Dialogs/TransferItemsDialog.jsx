import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Divider, Typography, List, ListItem, ListItemText, TextField } from '@mui/material';
import PropTypes from "prop-types";
import { Dialog, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getInventoryAmount } from '../../../Utils/Utils';
import { useEffect, useState } from "react";
import { Snackbar, LoadingScreen } from "../index"
import { useSelector } from '../../../store/userStore';
import DonationsRequestService from "../../../services/DonationsRequestService";

function TransferItemsList({ mostrarAlerta, idSolicitud, idOrganizacion, elementos, inventarios, closeAlerta, onTransferred }) {
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

    const [itemsActualizados, setItemsActualizados] = useState([]);
    const handleCantidadChange = (index, cantidadSeleccionada) => {
        setItemsActualizados((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, cantidad: Number(cantidadSeleccionada) } : item
            )
        );
    };
      
    const authToken = useSelector((state) => state.authToken)

    const crearTransferencia = async () => {
        setIsLoading(false);
        setSnackbarVisibility(false);
        try {
            const payload = {
                idSolicitudDonacion: idSolicitud, 
                idOrganizacionReceptora: idOrganizacion,
                items: itemsActualizados
    
            };
            await DonationsRequestService.crearTransferencia(authToken, payload);
            setLoadingScreen({
                message: "Realizando transferencia",
                duration: 2200,
            }),
            setIsLoading(true),
            setSnackbar({
                message: "Transferencia realizada con éxito!",
                status: "success"
            }),
            setTimeout(() => {
                closeAlerta();
                setSnackbarVisibility(true);
                onTransferred?.();
            }, 2000)
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setSnackbar({
                message: "Error en transferencia!",
                status: "error"
            })
            setSnackbarVisibility(true);
        }
    }

    useEffect(()=> {
        setItemsActualizados(elementos);
    }, [elementos])

    const datosCompletos = (array) => {
        return array.every(item => 
            Object.entries(item).every(([key, valor]) => {
            if (key === "cantidad") {
                return Number(valor) > 0; // cantidad debe ser mayor a 0
            }
            return valor !== null && valor !== undefined && valor !== "";
            })
  );
};

  return (
    <>
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
            Transferir items
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
            {elementos.length === 0 ? (
            <Typography variant="body1" sx={{ mt: 2 }}>
            No existen items para transferir
            </Typography>
            ) : (
            <List sx={{ width: '100%' }}>
                {elementos.map((item, index) => (
                <ListItem key={index} divider>
                    <ListItemText
                    primary={item?.categoria || (item?.nombre + " " + item?.apellido)}
                    secondary={(item?.rol ? `Rol: ${item?.rol?.nombre}` : null)  || (item?.cantidad && item?.descripcion ? `Cantidad: ${item?.cantidad} - ${item?.descripcion} ` : null) || (item?.descripcion)}
                    
                    />
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginRight:"15px"}}>
                        <h5>Stock actual: </h5>
                        <h5 style={{color:"green"}}>{getInventoryAmount(inventarios, item)?.cantidad} U</h5>
                    </div>
                    <TextField 
                        type='number' 
                        label='Cantidad' 
                        size='small' 
                        sx={{width:"30%"}} 
                        value={itemsActualizados[index]?.cantidad ?? ""}
                        onChange={(e)=> {handleCantidadChange(index, e.target.value)}}
                    />
                </ListItem>
                ))}
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ fontWeight: "bold", marginTop:"20px" }} 
                    onClick={()=> {crearTransferencia()}}
                    startIcon={<SendIcon/>}
                    disabled={!datosCompletos(itemsActualizados)}
                >
                    Realizar transferencia
                </Button>
            </List>
            )}
        </DialogContent>
        </Dialog>
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
    </>
  );
}

TransferItemsList.propTypes = {
  mostrarAlerta: PropTypes.bool.isRequired,
  idSolicitud: PropTypes.string.isRequired,
  idOrganizacion: PropTypes.string.isRequired,
  elementos: PropTypes.array.isRequired,
  inventarios: PropTypes.array.isRequired,
  closeAlerta: PropTypes.func.isRequired,
  onTransferred: PropTypes.func.isRequired
};

export default TransferItemsList;