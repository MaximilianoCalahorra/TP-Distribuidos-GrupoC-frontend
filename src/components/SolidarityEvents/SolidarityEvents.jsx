import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AlertDialog from "../UI/Dialogs/AlertaDialog";
import MembersListDialog from "../UI/Dialogs/MembersListDialog";
import ListDialog from "../UI/Dialogs/ListDialog";
import styles from "./styles.module.css";
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';
import SolidarityEventService from "../../services/SolidarityEventService";
import { authUserIsPresent, formatProtoTimestamp } from "../../Utils/Utils";
import DonacionService from "../../services/DonacionService";
import { Roles } from "../../constants/Roles";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import LanguageIcon from '@mui/icons-material/Language';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
dayjs.extend(customParseFormat);

export default function SolidarityEvents() {
  const [membersList, setMembersList] = useState([]);
  const [externalVolunteersList, setExternalVolunteersList] = useState([]);
  const authToken = useSelector((state) => state.authToken)
  const userAuthenticated = useSelector((state) => state.username)
  const userRol = useSelector((state) => state.userRol)
  const [reload, setReload] = useState (true);
  const [solidarityEvents, setSolidarityEvents] = useState([]);
  const navigate = useNavigate();

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

  const [showDisableEventAlert, setShowDisableEventAlert] = useState(false);
  const closeDisableEventAlert = () => setShowDisableEventAlert(false);
  const openDisableEventAlert = (solidarityEvent) => {
    setSelectedSolidarityEvent(solidarityEvent);
    setShowDisableEventAlert(true);
  } 

  const [action, setAction] = useState ("");
  const [selectedSolidarityEvent, setSelectedSolidarityEvent] = useState ([]);
  const [showEventAlert, setShowEventAlert] = useState(false);
  const closeEventAlert = () => setShowEventAlert(false);
  const openEventAlert = (event, accion) => {
    setSelectedSolidarityEvent(event);
    setShowEventAlert(true);
    setAction (accion); 
  }

  const [showMembersList, setShowMemberList] = useState(false);
  const closeMembersList = () => {
    setShowMemberList(false);
  }
  const openMembersList = (miembros, voluntariosExternos) => {
    setShowMemberList(true);
    setMembersList(miembros);
    setExternalVolunteersList(voluntariosExternos);
  }

  
  const [showPublishEventAlert, setShowPublishEventAlert] = useState(false);
  const closePublishEventAlert = () => setShowPublishEventAlert(false);
  const openPublishEventAlert = (solidarityEvent) => {
    setSelectedSolidarityEvent(solidarityEvent);
    setShowPublishEventAlert(true);
  } 

  const [donaciones, setDonaciones] = useState([]);
  const [showDonationsList, setShowDonationsList] = useState(false);

  // Abrir diálogo y cargar donaciones
  const openDonationsList = async (idEventoSolidario) => {
    try {
      const response = await DonacionService.listarDonacionesPorEvento(idEventoSolidario, authToken);
      setDonaciones(response.data.donaciones);
      setShowDonationsList(true); // Abrimos el diálogo solo después de tener los datos
    } catch (error) {
      console.error("Error al obtener donaciones:", error.response?.data || error.message);
    }
  };

  // Cerrar diálogo
  const closeDonationsList = () => {
    setShowDonationsList(false);
    setDonaciones([]); // Limpiamos las donaciones del evento anterior
  };

  const participateInSolidarityEvent = async (idSolidarityEvent) => {
      setIsLoading(false);
      setSnackbarVisibility(false);
      await SolidarityEventService.participarDeEventoSolidario(authToken, idSolidarityEvent);
      setLoadingScreen({
        message: "Inscribiendote en el evento",
        duration: 2200,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Inscripción realizada con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setReload(true);
        closeEventAlert();
        setSnackbarVisibility(true);
      }, 2000)
    }

    const unsuscribeFromSolidarityEvent = async (idSolidarityEvent) => {
      setIsLoading(false);
      setSnackbarVisibility(false);
      await SolidarityEventService.darseDeBajaDeEventoSolidario(authToken, idSolidarityEvent);
      setLoadingScreen({
        message: "Dandote de baja del evento",
        duration: 2200,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Baja realizada con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setReload(true);
        closeEventAlert();
        setSnackbarVisibility(true);
      }, 2000)
    }

    const eliminarEventoSolidario = async (idSolidarityEvent) => {
      setIsLoading(false);
      setSnackbarVisibility(false);
      await SolidarityEventService.eliminarEventoSolidario(authToken, idSolidarityEvent);
      setLoadingScreen({
        message: "Eliminando evento",
        duration: 2200,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Evento eliminado con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setReload(true);
        closeDisableEventAlert();
        setSnackbarVisibility(true);
      }, 2000)
    }

  useEffect (() => {
    if (reload) {
      const getUsers = async () => {
        const response = await SolidarityEventService.listarEventosSolidarios(authToken);
        setSolidarityEvents(response.data.eventos);
      }
      getUsers();
      setReload(false);
    }
  }, [reload]);

  const eventoPasado = (fecha) => {
    const fechaEvento = dayjs(fecha, "DD/MM/YYYY HH:mm", true);
    return fechaEvento.isBefore(dayjs(), "minute");
  }

  const publicarEventoSolidario = async (idSolidarityEvent) => {
      setIsLoading(false);
      setSnackbarVisibility(false);
      await SolidarityEventService.publicarEventoSolidario(authToken, idSolidarityEvent);
      setLoadingScreen({
        message: "Publicando el evento solidario",
        duration: 2200,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Publicación realizada con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setReload(true);
        closePublishEventAlert();
        setSnackbarVisibility(true);
      }, 2000)
    }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Eventos Solidarios</h1>
        <div className={styles.buttonsContainer}>
          <Button
            variant="contained"
            color="success"
            sx={{ fontWeight: "bold" }}
            onClick={() => navigate("/solidarityEvents/newSolidarityEvent")}
            startIcon={<AddCircleOutlineIcon/>}
          >
            Registrar nuevo evento solidario
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", marginLeft:"24%" }}
            onClick={() => navigate("/externalSolidarityEvents")}
            startIcon={<LanguageIcon/>}
          >
            Mis eventos
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontWeight: "bold", marginLeft:"8px"}}
            onClick={() => navigate("/externalSolidarityEvents")}
            startIcon={<LanguageIcon/>}
          >
            Eventos externos
          </Button>
        </div>
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
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Nombre</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Descripción</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Fecha y Hora</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Miembros</TableCell>
              {userRol != Roles [3] && (
                <>
                  <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Donaciones</TableCell>
                  <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px", borderRight: "solid black 2px" }}>Acciones</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {solidarityEvents.length === 0 ? (
              <TableRow>
               <TableCell align="center" colSpan={8} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay eventos solidarios registrados
                </TableCell>
              </TableRow>
            ) : (
              solidarityEvents.map((solidarityEvent)=> {
                return (
                  <TableRow key={solidarityEvent.idEventoSolidario}>
                    <TableCell
                      align="center"
                      sx={{
                        color: "black",
                        fontWeight: "Bold",
                        border: "solid black 2px",
                      }}
                    >
                      {solidarityEvent.nombre}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "black",
                        fontWeight: "Bold",
                        border: "solid black 2px",
                      }}
                    >
                      {solidarityEvent.descripcion}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: eventoPasado(formatProtoTimestamp(solidarityEvent.fechaHora)) ? "red" : "green",
                        fontWeight: "Bold",
                        border: "solid black 2px",
                      }}
                    >
                      {formatProtoTimestamp(solidarityEvent.fechaHora)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                        border: "solid black 2px",
                        width: "50px",
                      }}
                    >
                      <div className={styles.actionsContainer}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "purple", fontWeight: "bold" }}
                          onClick={()=> {openMembersList (solidarityEvent.miembros, solidarityEvent.voluntariosExternos)}}
                        >
                          Listado
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ 
                            backgroundColor: authUserIsPresent(solidarityEvent.miembros, userAuthenticated) ? "Red" : "ligthblue", 
                            fontWeight: "bold" 
                          }}
                          onClick={() => {openEventAlert(solidarityEvent, (authUserIsPresent(solidarityEvent.miembros, userAuthenticated) ? "Baja" : "Alta"))}}
                          disabled={eventoPasado(formatProtoTimestamp(solidarityEvent.fechaHora))}
                        >
                          {authUserIsPresent(solidarityEvent.miembros, userAuthenticated) ? "Darse de baja" : "Participar"}
                        </Button>
                      </div>
                    </TableCell>
                    {userRol != Roles [3] && (
                      <>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontWeight: "Bold",
                            border: "solid black 2px",
                            width: "50px",
                          }}
                        >
                          <div className={styles.actionsContainer}>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "purple", fontWeight: "bold" }}
                              onClick={()=> {openDonationsList (solidarityEvent.idEventoSolidario)}}
                              disabled={!eventoPasado(formatProtoTimestamp(solidarityEvent.fechaHora))}
                            >
                              Listado
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "green", fontWeight: "bold" }}
                              onClick={()=> {navigate(`/solidarityEvents/newDonation/${solidarityEvent.idEventoSolidario}`)}}
                              disabled={!eventoPasado(formatProtoTimestamp(solidarityEvent.fechaHora))}
                            >
                              Crear
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                            fontWeight: "Bold",
                            border: "solid black 2px",
                            width: "50px",
                          }}
                        >
                          <div className={styles.actionsContainer}>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "orange", fontWeight: "bold" }}
                              onClick={()=> {navigate(`/solidarityEvents/modifySolidarityEvent/${solidarityEvent.idEventoSolidario}`)}}
                            >
                              Modificar
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "red", fontWeight: "bold" }}
                              onClick={()=> {openDisableEventAlert (solidarityEvent)}}
                              disabled={eventoPasado(formatProtoTimestamp(solidarityEvent.fechaHora))}
                            >
                              Eliminar
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "primary", fontWeight: "bold" }}
                              onClick={()=> {openPublishEventAlert (solidarityEvent)}}
                              disabled={eventoPasado(formatProtoTimestamp(solidarityEvent.fechaHora)) || solidarityEvent.publicado == 1}
                            >
                              Publicar
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </Card>
      <AlertDialog
        mostrarAlerta={showDisableEventAlert}
        accion={() => {eliminarEventoSolidario(selectedSolidarityEvent.idEventoSolidario)}}
        closeAlerta={closeDisableEventAlert}
        mensajeAlerta={"Vas a desactivar al evento solidario: " + selectedSolidarityEvent.nombre}
      />
      <AlertDialog
        mostrarAlerta={showEventAlert}
        accion={() => { action == "Baja" ? unsuscribeFromSolidarityEvent(selectedSolidarityEvent.idEventoSolidario) : participateInSolidarityEvent(selectedSolidarityEvent.idEventoSolidario)}}
        closeAlerta={closeEventAlert}
        mensajeAlerta={action == "Baja" ? "Estás a punto de darte de baja del evento solidario: " + selectedSolidarityEvent.nombre  : "Estás a punto de confirmar tu asistencia al evento solidario: " + selectedSolidarityEvent.nombre}
      />
      <AlertDialog
        mostrarAlerta={showPublishEventAlert}
        accion={() => {publicarEventoSolidario (selectedSolidarityEvent.idEventoSolidario)}}
        closeAlerta={closePublishEventAlert}
        mensajeAlerta={"Estás a punto de publicar el evento solidario: " + selectedSolidarityEvent.nombre}
      />
      <MembersListDialog
        mostrarAlerta={showMembersList}
        miembros={membersList}
        voluntariosExternos={externalVolunteersList}
        closeAlerta={closeMembersList}
      />
      <ListDialog
        mostrarAlerta={showDonationsList}
        elementos={donaciones}
        closeAlerta={closeDonationsList}
        tipoListado={"donaciones"}
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