import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
} from "@mui/material";
import { useState, useEffect } from "react";
import AlertDialog from "../UI/Dialogs/AlertaDialog";
import ListDialog from "../UI/Dialogs/ListDialog";
import styles from "./styles.module.css";
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';
import SolidarityEventService from "../../services/SolidarityEventService";
import {authUserIsPresent, formatProtoTimestamp } from "../../Utils/Utils";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ExternalEventsService from "../../services/ExternalEventsService";
dayjs.extend(customParseFormat);

export default function ExternalSolidarityEvents() {
  const [membersList, setMembersList] = useState([]);
  const authToken = useSelector((state) => state.authToken)
  const userAuthenticated = useSelector((state) => state.username)
  const userEmail = useSelector((state) => state.userEmail)
  const [reload, setReload] = useState (true);
  const [solidarityEvents, setSolidarityEvents] = useState([]);
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
  const openMembersList = (miembros) => {
    console.log("Puto: " + miembros)
    setMembersList(miembros);
    setShowMemberList(true);
  }

  const participateInSolidarityEvent = async (idEventoOrigen, idOrganization) => {
      setIsLoading(false);
      setSnackbarVisibility(false);
      const payload = {
        idEvento: idEventoOrigen,
        idOrganizador: idOrganization,
        emailParticipante: userEmail
      }
      await ExternalEventsService.participarDeEventoSolidarioExterno(authToken, payload);
      setLoadingScreen({
        message: "Inscribiendote en el evento externo",
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

    useEffect (() => {
      if (reload) {
          const getUsers = async () => {
              const response = await ExternalEventsService.listarEventosExternos(authToken);
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Eventos Solidarios externos</h1>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {solidarityEvents.length === 0 ? (
              <TableRow>
               <TableCell align="center" colSpan={8} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay eventos solidarios externos registrados
                </TableCell>
              </TableRow>
            ) : (
              solidarityEvents.map((solidarityEvent)=> {
                return (
                  <TableRow key={solidarityEvent.idEventoExterno}>
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
                          onClick={()=> {openMembersList (solidarityEvent.participantesInternos)}}
                        >
                          Listado
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ 
                            backgroundColor: "ligthblue", 
                            fontWeight: "bold" 
                          }}
                          onClick={() => {openEventAlert(solidarityEvent, "Alta")}}
                          disabled={eventoPasado(formatProtoTimestamp(solidarityEvent.fechaHora)) || authUserIsPresent(solidarityEvent.participantesInternos, userAuthenticated)}
                        >
                          Participar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </Card>
      <AlertDialog
        mostrarAlerta={showEventAlert}
        accion={() => { action == "Baja" ? unsuscribeFromSolidarityEvent(selectedSolidarityEvent.idEventoSolidario) : participateInSolidarityEvent(selectedSolidarityEvent.idEventoOrigen, selectedSolidarityEvent.idOrganizacion)}}
        closeAlerta={closeEventAlert}
        mensajeAlerta={action == "Baja" ? "Estás a punto de darte de baja del evento solidario externo: " + selectedSolidarityEvent.nombre  : "Estás a punto de confirmar tu asistencia al evento solidario externo: " + selectedSolidarityEvent.nombre}
      />
      <ListDialog
        mostrarAlerta={showMembersList}
        elementos={membersList}
        closeAlerta={closeMembersList}
        tipoListado={"miembros"}
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