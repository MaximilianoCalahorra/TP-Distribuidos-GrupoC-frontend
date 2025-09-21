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
import { useState } from "react";
import AlertDialog from "../UI/Dialogs/AlertaDialog";
import ListDialog from "../UI/Dialogs/ListDialog";
import styles from "./styles.module.css";
import DonacionService from "../../services/DonacionService";

export default function SolidarityEvents() {
  const navigate = useNavigate();

  const [showDisableEventAlert, setShowDisableEventAlert] = useState(false);
  const closeDisableEventAlert = () => setShowDisableEventAlert(false);
  const openDisableEventAlert = () => setShowDisableEventAlert(true);

  const [showParticipateInEventAlert, setShowParticipateInEventAlert] = useState(false);
  const closeParticipateInEventAlert = () => setShowParticipateInEventAlert(false);
  const openParticipateInEventAlert = () => setShowParticipateInEventAlert(true);

  const [showMembersList, setShowMemberList] = useState(false);
  const closeMembersList = () => setShowMemberList(false);
  const openMembersList = () => setShowMemberList(true);

  const [donaciones, setDonaciones] = useState([]);
  const [showDonationsList, setShowDonationsList] = useState(false);

  // Abrir diálogo y cargar donaciones
  const openDonationsList = async (idEventoSolidario) => {
    try {
      const response = await DonacionService.listarDonacionesPorEvento(idEventoSolidario);
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Eventos Solidarios</h1>
        <Button
          variant="contained"
          color="success"
          sx={{ fontWeight: "bold" }}
          onClick={() => navigate("/solidarityEvents/newSolidarityEvent")}
        >
          Registrar nuevo evento solidario
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
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Nombre</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Descripción</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Fecha y Hora</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Miembros</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px" }}>Donaciones</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", borderLeft: "solid black 2px", borderTop: "solid black 2px", borderBottom: "solid black 2px", borderRight: "solid black 2px" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px" }}></TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px" }}></TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px" }}></TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px", width: "50px" }}>
                <div className={styles.actionsContainer}>
                  <Button variant="contained" sx={{ backgroundColor: "purple", fontWeight: "bold" }} onClick={openMembersList}>
                    Listado
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: "ligthblue", fontWeight: "bold" }} onClick={openParticipateInEventAlert}>
                    Participar
                  </Button>
                </div>
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px", width: "50px" }}>
                <div className={styles.actionsContainer}>
                  <Button variant="contained" sx={{ backgroundColor: "purple", fontWeight: "bold" }} onClick={() => openDonationsList(5)}>
                    Listado
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: "green", fontWeight: "bold" }} onClick={() => navigate(`/donations/newDonation/5`)}>
                    Crear
                  </Button>
                </div>
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px", width: "50px" }}>
                <div className={styles.actionsContainer}>
                  <Button variant="contained" sx={{ backgroundColor: "orange", fontWeight: "bold" }} onClick={() => navigate("/solidarityEvents/modifySolidarityEvent")}>
                    Modificar
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: "red", fontWeight: "bold" }} onClick={openDisableEventAlert}>
                    Desactivar
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <AlertDialog mostrarAlerta={showDisableEventAlert} accion={() => {}} closeAlerta={closeDisableEventAlert} mensajeAlerta={"Vas a desactivar al evento solidario: "} />
      <AlertDialog mostrarAlerta={showParticipateInEventAlert} accion={() => {}} closeAlerta={closeParticipateInEventAlert} mensajeAlerta={"Estás a punto de confirmar tu asistencia al evento solidario: "} />
      <ListDialog mostrarAlerta={showMembersList} elementos={[]} closeAlerta={closeMembersList} tipoListado={"miembros"} />
      <ListDialog mostrarAlerta={showDonationsList} elementos={donaciones} closeAlerta={closeDonationsList} tipoListado={"donaciones"} />
    </div>
  );
}