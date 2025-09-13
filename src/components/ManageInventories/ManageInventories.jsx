import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ClassIcon from '@mui/icons-material/Class';
import DescriptionIcon from '@mui/icons-material/Description';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { MenuItem, Card, Button, InputAdornment } from '@mui/material'
import { Roles } from '../../constants/Roles'
import PropTypes from "prop-types";
import styles from './styles.module.css'

export default function ManageInventories({action}) {
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
            onChange={()=>{}}
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
            {Roles.map((rol, i)=> (
                <MenuItem key={i} onClick={()=> {}}>{rol}</MenuItem>
            ))}
            </TextField>
        )}
        <TextField
          id=""
          label="Descripción"
          size='small'
          onChange={()=>{}}
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
          onChange={()=>{}}
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
        {action == "addInventory" ? (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}}>Cargar inventario</Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}}>Modificar inventario</Button>
        )}
      </Card>
    </div>
  )
}

ManageInventories.propTypes = {
  action: PropTypes.string.isRequired,
};
