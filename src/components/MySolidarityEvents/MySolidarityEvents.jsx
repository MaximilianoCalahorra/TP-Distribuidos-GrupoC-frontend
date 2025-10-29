import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
  MenuItem,
  TextField,
  Chip, 
  Stack,
  IconButton, 
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles.module.css";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useSelector } from '../../store/userStore';
import { useState, useEffect } from "react";
import LanguageIcon from '@mui/icons-material/Language';
import SolidarityEventService from "../../services/SolidarityEventService";
import FeedIcon from '@mui/icons-material/Feed';
import DownloadIcon from '@mui/icons-material/Download';
import { Roles } from '../../constants/Roles'
import { getMonth, formatearFecha } from '../../Utils/Utils'
import { AlertaDialog, Snackbar, LoadingScreen, EditSolidarityEventDialog } from "../UI/index"
import UsuarioService from "../../services/UsuarioService";

export default function MySolidarityEvents() {
  const [mySolidarityEvents, setMySolidarityEvents] = useState([]);
  const [reload, setReload] = useState (true);
  const [reload2, setReload2] = useState (true);
  const [usuariosActivos, setUsuariosActivos] = useState([]);
  const userEmail = useSelector((state)=> state.userEmail)
  const [filtros, setFiltros] = useState ({
    usuarioEmail: userEmail,
    fechaHoraDesde: "",
    fechaHoraHasta: "",
    repartoDonaciones: "AMBOS"
  })
  const [filterName, setFilterName] = useState("");
  const userRol = useSelector((state) => state.userRol)
  const esPresidenteOCoordinador = userRol == Roles [0] || userRol == Roles [2];
  const [myFilters, setMyFilters] = useState([]);

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

  const [selectedFilter, setSelectedFilter] = useState([]);
  const [showRemoveFilterAlert, setShowRemoveFilterAlert] = useState(false);
  const closeRemoveFilterAlert = () => setShowRemoveFilterAlert(false);
  const openRemoveFilterAlert = (filter) => {
    setSelectedFilter(filter);
    setShowRemoveFilterAlert(true);
  }

  const [showEditFilterAlert, setShowEditFilterAlert] = useState(false);
  const closeEditFilterAlert = () => setShowEditFilterAlert(false);
  const openEditFilterAlert = (filter) => {
    setSelectedFilter(filter);
    setShowEditFilterAlert(true);
  }

  const authToken = useSelector((state) => state.authToken)
  //Obtener eventos solidarios:
  const fetchEventosSolidarios = async () => {
    try {
      const response = await SolidarityEventService.obtenerInformeEventosSolidarios(authToken, filtros);
      setMySolidarityEvents(response.data.data.informeParticipacionEventos); //Seteamos los eventos solidarios de la página con la respuesta del cliente gRPC.
    } catch (error) {
      console.error("Error al obtener los eventos solidarios:", error.response?.data || error.message);
    }
  }

  const guardarFiltro = async () => {
    const payload = {
      nombreFiltro: filterName,
      emailUsuario: filtros.usuarioEmail,
      fechaHoraDesde: filtros.fechaHoraDesde,
      fechaHoraHasta: filtros.fechaHoraHasta,
      repartoDonaciones: filtros.repartoDonaciones,
    }
    try {
      setIsLoading(false);
      setSnackbarVisibility(false);
      await SolidarityEventService.crearFiltro(authToken, payload);
      setLoadingScreen({
        message: "Creando filtro",
        duration: 2200,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Filtro creado con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setReload2(true);
        setSnackbarVisibility(true);
        setFilterName("");
        setFiltros({
          usuarioEmail: userEmail,
          fechaHoraDesde: "",
          fechaHoraHasta: "",
          repartoDonaciones: "AMBOS"
        })
      }, 2000)
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setSnackbar({
        message: "El filtro ya está creado!",
        status: "error"
      })
    }
  }

  const eliminarFiltro = async (idFiltro) => {
      try {
        setIsLoading(false);
        setSnackbarVisibility(false);
        await SolidarityEventService.eliminarFiltro(authToken, idFiltro);
        setLoadingScreen({
          message: "Eliminando filtro",
          duration: 2200,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Filtro eliminado con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setReload2(true);
          setSnackbarVisibility(true);
          closeRemoveFilterAlert();
        }, 2000)
      } catch (error) {
        console.error("Error al obtener las transferencias entrantes:", error.response?.data || error.message);
      }
    }

  useEffect(()=> {
    if (reload) {
      fetchEventosSolidarios();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  useEffect(()=> {
    const traerUsuariosActivos = async () => {
      const response = await UsuarioService.listarUsuariosActivos();
      setUsuariosActivos(response.data.usuariosActivos)
    }
    traerUsuariosActivos ();
  }, []);

  const fetchFiltrosGuardados = async () => {
    try {
      const response = await SolidarityEventService.obtenerFiltros(authToken);
      setMyFilters(response.data);
    } catch (error) {
      console.error("Error al obtener los filtros guardados:", error.response?.data || error.message);
    }
  }

  useEffect(()=> {
    if (reload2) {
      fetchFiltrosGuardados ();
      setReload2(false);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload2])

  const establecerFiltro = (filtro) => {
    setFiltros((prev) => ({
      ...prev,
      usuarioEmail: filtro.emailUsuario,
      fechaHoraDesde: filtro.fechaHoraDesde,
      fechaHoraAlta: filtro.fechaHoraAlta,
      repartoDonaciones: filtro.repartoDonaciones,
    }));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Informe de Eventos Solidarios</h1>
        <div className={styles.buttonsContainer}>
          <div className={styles.filtersContainer}>
            <TextField
              select
              label="Usuario"
              sx={{width:"20%"}}
              size='small'
              value={filtros.usuarioEmail}
              disabled={!esPresidenteOCoordinador} 
              onChange={(e) =>
                setFiltros({ ...filtros, usuarioEmail: e.target.value })
              }
            >
              {!esPresidenteOCoordinador ? (
                <MenuItem value={filtros.usuarioEmail}>{filtros.usuarioEmail}</MenuItem>
              ) : (
                usuariosActivos.map((usuario) => {
                  return (
                    <MenuItem value={usuario.email}>{usuario.email}</MenuItem>
                  )
                })
              )}
            </TextField>
            <TextField
              select
              label="Reparto donaciones"
              size='small'
              sx={{width:"13%"}}
              value={filtros.repartoDonaciones}
              onChange={(e) => setFiltros({...filtros, repartoDonaciones: e.target.value})}
            >
              <MenuItem value="AMBOS">AMBOS</MenuItem>
              <MenuItem value="SI">SI</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </TextField>
            <TextField
              id=""
              label="Fecha y Hora Desde"
              type='datetime-local'
              size='small'
              sx={{width:"16%"}}
              value={filtros.fechaHoraDesde || ""}
              onChange={(e) => setFiltros({...filtros, fechaHoraDesde: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
             <TextField
              id=""
              label="Fecha y Hora Hasta"
              type='datetime-local'
              size='small'
              sx={{width:"16%"}}
              value={filtros.fechaHoraHasta || ""}
              onChange={(e) => setFiltros({...filtros, fechaHoraHasta: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ fontWeight: "bold" }}
              onClick={() => setReload(true)}
              startIcon={<FileUploadIcon />}
            >
              Aplicar filtros
            </Button>
             <Button
              variant="contained"
              sx={{ fontWeight: "bold", backgroundColor:"orange" }}
              onClick={() => setFiltros({
                usuarioEmail: userEmail,
                fechaHoraDesde: "",
                fechaHoraHasta: "",
                repartoDonaciones: "AMBOS"
              })}
              startIcon={<RestartAltIcon/>}
            >
              Reestablecer
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.filtersSavedContainer}>
        <TextField
          type="text"
          label="Nombre del filtro"
          size='small'
          sx={{width:"50%"}}
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        >
        </TextField>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: "bold" }}
          onClick={() => {guardarFiltro()}}
          disabled={filterName == ""}
        >
          Guardar filtro
        </Button>
      </div>
      <div className={styles.filtersSavedContainer}>
        <h4>Mis filtros:</h4>
        {myFilters.length === 0 ? (
          <h5 style={{color:"red"}}>No hay filtros guardados</h5>
        ) : (myFilters.map((filter) => (
          <Stack direction="row" spacing={1}>
            <Chip
              label={filter.nombreFiltro}
              sx={{
                backgroundColor: "#9c27b0",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#a15eadff",
                  boxShadow: "none",          
                },
                "& .MuiChip-label": {
                  cursor: "inherit",
                },
              }}
              onDelete={()=> {openRemoveFilterAlert(filter)}}
              onClick={() => {establecerFiltro(filter)}}
              deleteIcon={<CloseIcon sx={{ color: "white" }} />}
            />
            <IconButton size="small" onClick={()=> {openEditFilterAlert(filter)}}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Stack>
        )))}
      </div>
      {mySolidarityEvents.length === 0 ? (
        <h2 style={{color:"red", fontWeight:"bold"}}>No hay eventos solidarios registrados</h2>
      ) : (mySolidarityEvents.map((mySolidarityEvent) => {
        return (
          <div className={styles.tableContainer}>
            <Typography variant="h5" sx={{display:"flex", flexDirection:"row", alignItems:"center", gap:"5px", fontWeight:"bold"}}>
              Mes:
              <Typography variant="h5" color="primary" sx={{fontWeight:"bold"}}>
                {getMonth(mySolidarityEvent.mes)}
              </Typography>
            </Typography>
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
                        borderBottom: "solid black 2px"
                      }}
                    >
                      Día
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                        borderLeft: "solid black 2px",
                        borderTop: "solid black 2px",
                        borderBottom: "solid black 2px"
                      }}
                    >
                      Nombre Evento
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                        borderLeft: "solid black 2px",
                        borderTop: "solid black 2px",
                        borderBottom: "solid black 2px"
                      }}
                    >
                      Descripcion
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                        borderLeft: "solid black 2px",
                        borderTop: "solid black 2px",
                        borderBottom: "solid black 2px"
                      }}
                    >
                      Reparto donaciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {mySolidarityEvent.eventos.map((event) => {
                  return (
                    <TableRow>
                        <TableCell align="center" 
                        sx={{
                          color: "black",
                          fontWeight: "Bold",
                          border: "solid black 2px",
                        }}>
                        {formatearFecha(event.dia)}
                      </TableCell>
                      <TableCell align="center" 
                        sx={{
                          color: "black",
                          fontWeight: "Bold",
                          border: "solid black 2px",
                        }}>
                        {event.nombreEvento}
                      </TableCell>
                      <TableCell align="center" 
                        sx={{
                          color: "black",
                          fontWeight: "Bold",
                          border: "solid black 2px",
                        }}>
                        {event.descripcion}
                      </TableCell>
                      <TableCell align="center" 
                        sx={{
                          color: "black",
                          fontWeight: "Bold",
                          border: "solid black 2px",
                        }}>
                        {event.repartoDonaciones == false ? "No" : "Si"}
                      </TableCell>
                    </TableRow>
                  )
                })}
                </TableBody>
              </Table>
            </Card>
          </div>
        )
       })
      )}
      <AlertaDialog
        mostrarAlerta={showRemoveFilterAlert}
        accion={() => {eliminarFiltro(selectedFilter.id)}}
        closeAlerta={closeRemoveFilterAlert}
        mensajeAlerta={"Vas a eliminar tu filtro personalizado: " + selectedFilter.nombreFiltro}
      />
      <EditSolidarityEventDialog
        mostrarAlerta={showEditFilterAlert}
        closeAlerta={closeEditFilterAlert}
        filtro={selectedFilter}
        onEdited={()=> {setReload2(true)}}
        usuariosActivos={!esPresidenteOCoordinador ? [] : usuariosActivos}
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