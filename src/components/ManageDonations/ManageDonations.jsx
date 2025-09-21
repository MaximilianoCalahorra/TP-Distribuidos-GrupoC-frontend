import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import FormControl from '@mui/material/FormControl';
import { Card, Button, InputAdornment } from '@mui/material'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './styles.module.css'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DonacionService from '../../services/DonacionService';
import InventarioService from '../../services/InventarioService';

export default function ManageDonations() {

  const [cantidad, setCantidad] = useState(0);
  const [inventariosActivos, setInventariosActivos] = useState([]);
  const [idInventario, setIdInventario] = useState(""); //Inventario seleccionado.
  const navigate = useNavigate();
  const { id } = useParams(); //Obtener el id del evento enviado a través de la ruta.

  //Obtener inventarios activos al montar el componente:
  useEffect(() => {
    fetchInventariosActivos();
  }, []);

  //Obtener inventarios activos:
  const fetchInventariosActivos = async () => {
    try {
      const response = await InventarioService.listarInventariosActivos();
      setInventariosActivos(response.data.inventarios); //Seteamos las donaciones del evento de la página con la respuesta del cliente gRPC.
    } catch (error) {
      console.error("Error al obtener donaciones:", error.response?.data || error.message);
    }
  }

  //Manejador del envío del formulario:
  const handleSubmit = async(idEventoSolidario) => {
    try {
      const payload = {
        cantidad,
        idInventario
      };

      await DonacionService.crearDonacion(idEventoSolidario, payload); //Crear una donación.

      navigate("/solidarityEvents"); //Redirigir a la página de eventos solidarios.
    } catch (error) {
      console.error("Error al guardar donación:", error.response?.data || error.message);
    }
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
      PaperProps: {
          style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
          },
      },
  };

  return (
    <div className={styles.container}>
      <Card elevation={5} sx={{display:"flex", flexDirection:"column", padding:"20px", gap:"30px"}}>
        <h1>Crear donación</h1>
        <div>
            <FormControl sx={{width: 500 }}>
                <InputLabel id="inventario-label">Inventario</InputLabel>
                <Select
                labelId="inventario-label"
                id="inventario-select"
                value={idInventario}
                onChange={(e) => {setIdInventario(e.target.value)}}
                input={<OutlinedInput label="Inventario" />}
                MenuProps={MenuProps}
                >
                  {inventariosActivos.map((inv) => (
                    <MenuItem key={inv.id} value={inv.idInventario}>
                      {inv.categoria} - {inv.descripcion}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
        </div>
        <TextField
            id=""
            label="Cantidad"
            type='number'
            size='small'
            value={cantidad}
            onChange={(e) => {setCantidad(e.target.value)}}
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
        <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}} onClick={() => handleSubmit(id)}>Cargar donación</Button>
      </Card>
    </div>
  )
}