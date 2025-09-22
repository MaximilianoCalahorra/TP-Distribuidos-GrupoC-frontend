import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
  Box,
  TableBody,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AlertDialog from "../UI/Dialogs/AlertaDialog";
import styles from "./styles.module.css";
import InventarioService from "../../services/InventarioService";
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';

export default function Inventories() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [inventarios, setInventarios] = useState([]);
  const [reload, setReload] = useState (true);
  const [inventarioSeleccionado, setInventarioSeleccionado] = useState(null);
  const authToken = useSelector((state) => state.authToken)
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
  
  //Cerrar alerta:
  const closeAlert = () => {
    setShowAlert(false);
    setInventarioSeleccionado(null); //Restablecemos el inventario seleccionado.
  }

  //Abrir alerta:
  const openAlert = (inventario) => {
    setInventarioSeleccionado(inventario); //Guardamos el inventario seleccionado.
    setShowAlert(true);
  }

  //Obtener inventarios:
  const fetchInventarios = async () => {
    try {
      const response = await InventarioService.listarInventarios(authToken);
      setInventarios(response.data.inventarios); //Seteamos los inventarios de la página con la respuesta del cliente gRPC.
    } catch (error) {
      console.error("Error al obtener inventarios:", error.response?.data || error.message);
    }
  }

  //Cargar los inventarios en el primer renderizado de la página:
  useEffect(() => {
    if (reload) {
      fetchInventarios();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  //Manejador de activar/deshabilitar inventario:
  const handleToggleInventario = async () => {
    if (!inventarioSeleccionado) return;
    setIsLoading(false);
    setSnackbarVisibility(false);
    try {
      //Si el inventario está desactivado:
      if (inventarioSeleccionado.eliminado) {
        await InventarioService.habilitarInventario(inventarioSeleccionado.idInventario, authToken); //Lo activa.
        setLoadingScreen({
          message: "Habilitando inventario",
          duration: 2200,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Inventario habilitado con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setReload(true);
          closeAlert();
          setSnackbarVisibility(true);
        }, 2000)
      } else { //Está desactivado
        await InventarioService.eliminarLogicoInventario(inventarioSeleccionado.idInventario, authToken); //Lo desactiva
        setLoadingScreen({
          message: "Deshabilitando inventario",
          duration: 2200,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Inventario deshabilitado con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setReload(true);
          closeAlert();
          setSnackbarVisibility(true);
        }, 2000)
      }

      fetchInventarios(); //Recarga los inventarios en la vista.
    } catch (error) {
      console.error("Error al cambiar el estado del inventario:", error);
    } finally {
      closeAlert();
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Gestión de Inventarios</h1>
        <Button variant="contained" color="success" sx={{ fontWeight: "bold" }} onClick={()=> {navigate("/inventories/newInventory")}}>
          Registrar nuevo inventario
        </Button>
      </div>
      <Card elevation={15} sx={{ width: "98%" }}>
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
                }}
              >
                Descripción
              </TableCell>
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
                Cantidad
              </TableCell>
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
                Eliminado
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
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventarios.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay inventarios registrados
                </TableCell>
              </TableRow>
            ) :
            (inventarios.map((inventario) => {
              return (
                <TableRow key={inventario.idInventario}>
                  <TableCell align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {inventario.categoria}
                  </TableCell>
                  <TableCell  align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {inventario.descripcion}
                  </TableCell>
                  <TableCell  align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {inventario.cantidad}
                  </TableCell>
                  <TableCell  align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {inventario.eliminado ? "Sí" : "No"}
                  </TableCell>
                  <TableCell align="center"
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                    width: "50px",
                  }}>
                    <div className={styles.actionsContainer}>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "orange", fontWeight: "bold" }}
                        onClick={()=> {navigate(`/inventories/modifyInventory/${inventario.idInventario}`)}}
                      >
                        Modificar
                      </Button>
                      <Button
                        variant="contained"
                        color={inventario.eliminado == false ? "error" : "success"}
                        sx={{ fontWeight: "bold" }}
                        onClick={() => {openAlert (inventario)}}
                      >
                        {inventario.eliminado == false ? "Desactivar" : "Activar"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            }))}
          </TableBody>
        </Table>
      </Card>
      <AlertDialog
        mostrarAlerta={showAlert}
        accion={handleToggleInventario}
        closeAlerta={closeAlert}
        mensajeAlerta={`Vas a ${inventarioSeleccionado?.eliminado ? "activar" : "desactivar"} el inventario: ${inventarioSeleccionado?.descripcion}`}
      />
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
  );
}