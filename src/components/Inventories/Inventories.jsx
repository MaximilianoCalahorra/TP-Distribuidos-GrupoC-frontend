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
import { useState } from "react";
import AlertDialog from "../UI/Dialogs/AlertaDialog";
import styles from "./styles.module.css";

export default function Inventories() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const closeAlert = () => {
    setShowAlert(false);
  }
  const openAlert = () => {
    setShowAlert(true);
  }

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
            <TableCell
              align="center"
              sx={{
                color: "white",
                fontWeight: "Bold",
                border: "solid black 2px",
              }}
            ></TableCell>
            <TableCell
              align="center"
              sx={{
                color: "white",
                fontWeight: "Bold",
                border: "solid black 2px",
              }}
            ></TableCell>
            <TableCell
              align="center"
              sx={{
                color: "white",
                fontWeight: "Bold",
                border: "solid black 2px",
              }}
            ></TableCell>
            <TableCell
              align="center"
              sx={{
                color: "white",
                fontWeight: "Bold",
                border: "solid black 2px",
              }}
            ></TableCell>
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
                  onClick={()=> {navigate("/inventories/modifyInventory")}}
                >
                  Modificar
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red", fontWeight: "bold" }}
                  onClick={() => {openAlert ()}}
                >
                  Desactivar
                </Button>
              </div>
            </TableCell>
          </TableBody>
        </Table>
      </Card>
      <AlertDialog
        mostrarAlerta={showAlert}
        accion={() => {}}
        closeAlerta={closeAlert}
        mensajeAlerta={"Vas a eliminar a desactivar al inventario: "}
      /> 
    </div>
  );
}
