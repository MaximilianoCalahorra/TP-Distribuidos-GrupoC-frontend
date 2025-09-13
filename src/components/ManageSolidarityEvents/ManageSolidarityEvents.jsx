import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import FormControl from '@mui/material/FormControl';
import { Card, Button, InputAdornment } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PropTypes from "prop-types";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import styles from './styles.module.css'

export default function ManageSolidarityEvents({action}) {

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
        {action == "addSolidarityEvent" ? (
          <h1>Crear nuevo evento solidario</h1>
        ) : (
          <h1>Modificar evento solidario</h1>
        )}
        <TextField
        label="Nombre"
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
          label="Fecha y Hora"
          type='date'
          size='small'
          onChange={()=>{}}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <div>
            <FormControl sx={{width: 500 }}>
                <InputLabel id="demo-multiple-chip-label">Miembros</InputLabel>
                <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={()=>{}}
                onChange={()=>{}}
                input={<OutlinedInput id="select-multiple-chip" label="Miembros" />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>Añadir miembros</em>
                    }
                    return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                }}
                MenuProps={MenuProps}
                >
                </Select>
            </FormControl>
        </div>
        {action == "addSolidarityEvent" ? (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}}>Cargar evento solidario</Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}}>Modificar evento solidario</Button>
        )}
      </Card>
    </div>
  )
}

ManageSolidarityEvents.propTypes = {
  action: PropTypes.string.isRequired,
};
