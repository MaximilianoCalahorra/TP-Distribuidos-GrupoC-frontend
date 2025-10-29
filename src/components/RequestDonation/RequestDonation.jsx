import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClassIcon from '@mui/icons-material/Class';
import DescriptionIcon from '@mui/icons-material/Description';
import { 
  MenuItem, 
  Card, 
  Button, 
  InputAdornment,   
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody 
} from '@mui/material'
import { useState } from 'react';
import styles from './styles.module.css'
import { Categorias } from '../../constants/Categorias'
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';
import DonationsRequestService from '../../services/DonationsRequestService';

export default function RequestDonation() {

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

  const [itemDonacion, setItemDonacion] = useState ({
    categoria: "",
    descripcion: ""
  })

  const [listadoItems, setListadoItems] = useState ([]);

  const agregarItemAListado = () => {

     setListadoItems((prev) => [
      ...prev,
      {
        ...itemDonacion,
        tempId: Date.now()
      }
    ]);

    setItemDonacion({ categoria: "", descripcion: ""});
  }

  const authToken = useSelector((state) => state.authToken)

  const generateDonationRequest = async (listadoItems) => {
      setIsLoading(false);
      setSnackbarVisibility(false);
      try {
        const payload = {
          items: listadoItems.map(({ categoria, descripcion }) => ({
            categoria,
            descripcion
          }))
        };
        await DonationsRequestService.crearSolicitudDeDonacion(authToken, payload);
        setLoadingScreen({
          message: "Generando solicitud de donación",
          duration: 2100,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Solicitud de donación creada con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setListadoItems([])
          setSnackbarVisibility(true);
        }, 2000)
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setSnackbar({
          message: "Error al crear la solicitud!",
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
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Card elevation={5} sx={{display:"flex", flexDirection:"column", padding:"20px", gap:"30px"}}>
          <h1>Crear nueva solicitud de donación </h1>
          <TextField
              select
              label="Categoría"
              size='small'
              value={itemDonacion.categoria}
              onChange={(e) => setItemDonacion({...itemDonacion, categoria: e.target.value})}
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
          <TextField
            id=""
            label="Descripción"
            size='small'
            value={itemDonacion.descripcion}
            onChange={(e) => setItemDonacion({...itemDonacion, descripcion: e.target.value})}
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            sx={{ fontWeight: "bold" }}
            onClick={agregarItemAListado}
            disabled={!datosCompletos(itemDonacion)}
          >
            Agregar solicitud
          </Button>
        </Card>
      </div>
      <div className={styles.list}>
        <Card elevation={5} sx={{display:"flex", flexDirection:"column", padding:"20px", gap:"30px"}}>
          <h1>Listado de items</h1>
           <Button
            variant="contained"
            color="primary"
            startIcon={<FileUploadIcon />}
            sx={{ fontWeight: "bold", width:"50%", alignSelf:"center" }}
            disabled={listadoItems.length === 0}
            onClick={()=> {generateDonationRequest(listadoItems)}}
          >
            Cargar items
          </Button>
          <Table aria-label="simple table">
            <TableHead
              sx={{
                backgroundColor: "rgb(5, 53, 101)",
                borderRadius: "10px 10px 0 0",
              }}
            >
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "Bold",
                    borderLeft: "solid black 2px",
                    borderTop: "solid black 2px",
                    borderBottom: "solid black 2px",
                  }}
                >
                  Categoría
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: "white",
                    fontWeight: "Bold",
                    borderLeft: "solid black 2px",
                    borderTop: "solid black 2px",
                    borderBottom: "solid black 2px",
                    borderRight: "solid black 2px",
                  }}
                >
                  Descripción
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listadoItems.length === 0 ? (
                <TableRow>
                  <TableCell align="center" colSpan={2} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                    No hay items agregados a la lista
                  </TableCell>
                </TableRow>
              ) :
              (listadoItems.map((item) => {
                return (
                  <TableRow key={item.tempId}>
                    <TableCell align="center" 
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}>
                      {item.categoria}
                    </TableCell>
                    <TableCell align="center" 
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}>
                      {item.descripcion}
                    </TableCell>
                  </TableRow>
                )
              }))}
            </TableBody>
          </Table>
        </Card>
      </div>
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