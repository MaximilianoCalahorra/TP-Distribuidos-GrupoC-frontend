import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClassIcon from '@mui/icons-material/Class';
import DescriptionIcon from '@mui/icons-material/Description';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { MenuItem, Card, Button, InputAdornment } from '@mui/material'
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styles from './styles.module.css'
import InventarioService from '../../services/InventarioService';
import { Categorias } from '../../constants/Categorias'
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';

export default function ManageInventories({action}) {
  const [inventoryData, setInventoryData] = useState({
    categoria: "",
    descripcion: "",
    cantidad: "",
  })
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
    if (id) {
      const traerInventario = async () => {
        const response = await InventarioService.traerInventario(id, authToken);
        setInventoryData(response.data);
      }
      traerInventario ();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Manejador del envío del formulario:
  const handleSubmit = async () => {
    setIsLoading(false);
    setSnackbarVisibility(false);
    if (action == 'addInventory') {
      try {
        await InventarioService.crearInventario(inventoryData, authToken); //Agregar un inventario.
        setLoadingScreen({
          message: "Creando inventario",
          duration: 2100,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Inventario creado con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setInventoryData({
          categoria: "",
          descripcion: "",
          cantidad: "",
        })
        setSnackbarVisibility(true);
      }, 2000)
       // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setSnackbar({
          message: "Error al crear el inventario!",
          status: "error"
        })
        setSnackbarVisibility(true);
      }
    } else {
      try {
        await InventarioService.modificarInventario(id, inventoryData, authToken); //Modificar un inventario.
        setLoadingScreen({
          message: "Modificando inventario",
          duration: 2100,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Inventario modificado con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setInventoryData({
            categoria: "",
            descripcion: "",
            cantidad: "",
          })
          setSnackbarVisibility(true);
        }, 2000)
       // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setSnackbar({
          message: "Error al crear el inventario!",
          status: "error"
        })
        setSnackbarVisibility(true);
      }
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
        {action == "addInventory" ? (
          <h1>Crear nuevo inventario</h1>
        ) : (
          <h1>Modificar inventario</h1>
        )}
        {action == "addInventory" && (
            <TextField
            select
            label="Categoría"
            size='small'
            value={inventoryData.categoria}
            onChange={(e) => setInventoryData({...inventoryData, categoria: e.target.value})}
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
            {Categorias.map((categoria, i)=> (
                <MenuItem key={i} value={categoria}>
                  {categoria}
                </MenuItem>
            ))}
            </TextField>
        )}
        <TextField
          id=""
          label="Descripción"
          size='small'
          value={inventoryData.descripcion}
          onChange={(e) => setInventoryData({...inventoryData, descripcion: e.target.value})}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id=""
          label="Cantidad"
          type='number'
          size='small'
          value={inventoryData.cantidad}
          onChange={(e) => setInventoryData({...inventoryData, cantidad: e.target.value})}
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
          disabled={!datosCompletos(inventoryData)}
        >
          {action === "addInventory" ? "Cargar inventario" : "Modificar inventario"}
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

ManageInventories.propTypes = {
  action: PropTypes.string.isRequired,
};