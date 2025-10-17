import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClassIcon from '@mui/icons-material/Class';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { MenuItem, Card, Button, InputAdornment } from '@mui/material'
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styles from './styles.module.css'
import InventarioService from '../../services/InventarioService';
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';
import DonacionService from '../../services/DonacionService';
import SolidarityEventService from '../../services/SolidarityEventService';

export default function ManageDonations() {
  const [donationData, setDonationData] = useState({
    idEventoSolidario: "",
    cantidad: "",
    idInventario: "",
  })
  const [inventories, setInventories] = useState([]);
  const [solidarityEvent, setSolidarityEvent] = useState([]);
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
  
  const { id } = useParams(); //Obtener el id enviado a través de la ruta.
  const authToken = useSelector((state) => state.authToken)

  useEffect (()=> {
    const traerInventariosActivos = async () => {
      const response = await InventarioService.listarInventariosActivos(authToken);
      setInventories(response.data.inventarios);
    }
    traerInventariosActivos ();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect (()=> {
    if (id) {
      const traerEventoSolidario = async () => {
        const response = await SolidarityEventService.obtenerEventoSolidarioPorId(authToken, id);
        setSolidarityEvent(response.data);
        setDonationData({...donationData, idEventoSolidario: id})
      }
      traerEventoSolidario ();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Manejador del envío del formulario:
  const handleSubmit = async () => {
    console.log(donationData)
    setIsLoading(false);
    setSnackbarVisibility(false);
      try {
        await DonacionService.crearDonacion(id, donationData, authToken); //Agregar una donación.
        setLoadingScreen({
          message: "Creando donación",
          duration: 2100,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Donación creada con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setDonationData({
            idEventoSolidario: "",
            cantidad: "",
            idInventario: "",
          })
        setSnackbarVisibility(true);
      }, 2000)
       // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setSnackbar({
          message: "Error al crear la donación!",
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
        <h1>Crear donación</h1>
        <TextField
          id=""
          label="Evento solidario"
          size='small'
          disabled
          value={solidarityEvent.nombre}
          onChange={(e) => setDonationData({...donationData, idEventoSolidario: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ProductionQuantityLimitsIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
        select
        label="Inventario"
        size='small'
        value={donationData.idInventario}
        onChange={(e) => setDonationData({...donationData, idInventario: e.target.value})}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
              <ClassIcon />
              </InputAdornment>
            ),
          },
        }}
        >
          {inventories
          .filter(inv => Number(inv.cantidad ?? 0) > 0)
          .map((inventory)=> (
              <MenuItem key={inventory.idInventario} value={inventory.idInventario}>
                {inventory.categoria + " - " + inventory.descripcion + " - " + inventory.cantidad}
              </MenuItem>
          ))}
        </TextField>
        <TextField
          id=""
          label="Cantidad"
          type='number'
          size='small'
          value={donationData.cantidad}
          onChange={(e) => setDonationData({...donationData, cantidad: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ProductionQuantityLimitsIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FileUploadIcon />}
          sx={{ fontWeight: "bold" }}
          onClick={handleSubmit}
          disabled={!datosCompletos(donationData)}
        >
          Crear donación
        </Button>
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

ManageDonations.propTypes = {
  action: PropTypes.string.isRequired,
};