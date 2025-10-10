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
import { useEffect, useState } from "react";
import AlertDialog from "../UI/Dialogs/AlertaDialog";
import styles from "./styles.module.css";
import UsuarioService from "../../services/UsuarioService";
import { LoadingScreen, Snackbar } from "../UI/index"
import { useSelector } from '../../store/userStore';
import { getFilteredUsers } from "../../Utils/Utils";

export default function Users() {
  const [users, setUsers] = useState ([]);
  const [userId, setUserId] = useState ("");
  const [reload, setReload] = useState (true);
  const [accion, setAccion] = useState ("");
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const userAutenticated = useSelector((state)=> state.username);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    setShowAlert(false);
  }
  const openAlert = (nombreUsuario, idUsuario, accion) => {
    setAccion(accion);
    setShowAlert(true);
    setMensajeAlerta(`Vas a ${accion} al usuario: ${nombreUsuario}`)
    setUserId (idUsuario);
  }
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

  useEffect (() => {
    if (reload) {
      const getUsers = async () => {
        const response = await UsuarioService.listarUsuarios(authToken);
        setUsers(response.data.usuarios);
      }
      getUsers();
      setReload(false);
    }
  }, [reload])

  const authToken = useSelector((state) => state.authToken)

  const desactivateUser = async (idUser) => {
    setIsLoading(false);
    setSnackbarVisibility(false);
    await UsuarioService.desactivarUsuario(idUser, authToken);
    setLoadingScreen({
      message: "Desactivando usuario",
      duration: 2200,
    }),
    setIsLoading(true),
    setSnackbar({
      message: "Usuario desactivado con éxito!",
      status: "success"
    }),
    setTimeout(() => {
      setReload(true);
      closeAlert();
      setSnackbarVisibility(true);
    }, 2000)
  }

  const reactivateUser = async (idUser) => {
    setIsLoading(false);
    setSnackbarVisibility(false);
    await UsuarioService.reactivarUsuario(idUser, authToken);
    setLoadingScreen({
      message: "Reactivando usuario",
      duration: 2200,
    }),
    setIsLoading(true),
    setSnackbar({
      message: "Usuario reactivado con éxito!",
      status: "success"
    }),
    setTimeout(() => {
      setReload(true);
      closeAlert();
      setSnackbarVisibility(true);
    }, 2000)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Gestión de usuarios</h1>
        <Button variant="contained" color="success" sx={{ fontWeight: "bold" }} onClick={()=> {navigate("/users/newUser")}}>
          Registrar nuevo usuario
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
                Nombre de usuario
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
                Nombre
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
                Apellido
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
                Teléfono
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
                E-mail
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
                Rol
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
                Activo
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
            {getFilteredUsers(users, userAutenticated).length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={8} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            ) : (
              getFilteredUsers(users, userAutenticated)
              .map((user) => {
                return (
                <TableRow key={user.idUsuario}>
                  <TableCell
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}
                  >
                    {user.nombreUsuario}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}
                  >
                    {user.nombre}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}
                  >
                    {user.apellido}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}
                  >
                    {user.telefono}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}
                  >
                    {user.rol.nombre}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}
                  >
                    {user.activo == true ? "Si" : "No"}
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
                        onClick={()=> {navigate(`/users/modifyUser/${user.idUsuario}`)}}
                      >
                        Modificar
                      </Button>
                      <Button
                        variant="contained"
                        color={user.activo == true ? "error" : "success"}
                        sx={{ fontWeight: "bold" }}
                        onClick={() => {openAlert (user.nombreUsuario, user.idUsuario, user.activo == true ? "desactivar" : "reactivar")}}
                      >
                        {user.activo == true ? "Desactivar" : "Activar"}
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
          mostrarAlerta={showAlert}
          accion={() => {accion == "desactivar" ? desactivateUser (userId) : reactivateUser(userId)}}
          closeAlerta={closeAlert}
          mensajeAlerta={mensajeAlerta}
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
