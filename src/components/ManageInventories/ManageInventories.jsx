import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClassIcon from '@mui/icons-material/Class';
import DescriptionIcon from '@mui/icons-material/Description';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { MenuItem, Card, Button, InputAdornment } from '@mui/material'
import PropTypes from "prop-types";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css'
import InventarioService from '../../services/InventarioService';
import { Categorias } from '../../constants/Categorias'

export default function ManageInventories({action}) {
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams(); //Obtener el id enviado a través de la ruta.

  //Manejador del envío del formulario:
  const handleSubmit = async() => {
    try {
      const payload = {
        categoria,
        descripcion,
        cantidad,
      };

      if (action == 'addInventory') {
        await InventarioService.crearInventario(payload); //Agregar un inventario.
      } else {
        await InventarioService.modificarInventario(id, payload); //Modificar un inventario.
      }

      navigate("/inventories"); //Redirigir a la página de inventarios.
    } catch (error) {
      console.error("Error al guardar inventario:", error.response?.data || error.message);
    }
  }

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
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
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
          onChange={(e)=>{setDescripcion(e.target.value)}}
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
          onChange={(e)=>{setCantidad(Number(e.target.value))}}
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
        >
          {action === "addInventory" ? "Cargar inventario" : "Modificar inventario"}
        </Button>
      </Card>
    </div>
  )
}

ManageInventories.propTypes = {
  action: PropTypes.string.isRequired,
};