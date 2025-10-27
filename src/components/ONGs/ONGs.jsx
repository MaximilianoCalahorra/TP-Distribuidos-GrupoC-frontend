import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import NumbersIcon from "@mui/icons-material/Numbers";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ONGsService from "../../services/ONGsService";

export default function ONGs() {
  const [ONGs, setONGs] = useState([]);
  const [reload, setReload] = useState(true);
  const [inputId, setInputId] = useState("");
  const [orgIds, setOrgIds] = useState([]); // IDs de los botones
  const [error, setError] = useState("");

  // Agregar un ID a la lista con validación
  const agregarId = () => {
    const idNum = Number(inputId);

    if (!inputId) {
      setError("Debe ingresar un ID.");
      return;
    }
    if (isNaN(idNum) || idNum < 1 || idNum > 60) {
      setError("El ID debe estar entre 1 y 60.");
      return;
    }
    if (orgIds.includes(inputId)) {
      setError("Ese ID ya fue agregado.");
      return;
    }

    setOrgIds((prev) => [...prev, inputId]);
    setInputId("");
    setError("");
  };

  // Eliminar un ID de la lista
  const eliminarId = (id) => {
    setOrgIds((prev) => prev.filter((item) => item !== id));
  };

  // Consultar ONGs al backend
  const obtenerONGs = async (ids) => {
    const queryIds = ids || (orgIds.length > 0 ? orgIds : Array.from({ length: 60 }, (_, i) => (i + 1).toString()));
    try {
      const response = await ONGsService.obtenerONGs(queryIds);
      setONGs(response.data);
    } catch (error) {
      console.error("Error al obtener las ONGs:", error);
      setError("Error al obtener las ONGs. Verifique los IDs.");
    }
  };

  // Restablecer
  const restablecer = async () => {
    setOrgIds([]);
    setError("");
    await obtenerONGs(Array.from({ length: 60 }, (_, i) => (i + 1).toString()));
  };

  useEffect(() => {
    if (reload) {
      obtenerONGs();
      setReload(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Información sobre ONGs</h1>
      </div>

      <Card elevation={5} sx={{ padding: "20px", marginBottom: "30px", width: "98%" }}>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <TextField
            type="number"
            label="ID de ONG (1 a 60)"
            size="small"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            sx={{ width: "200px" }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersIcon />
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
            onClick={agregarId}
            disabled={!inputId}
          >
            Agregar ID
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<FileUploadIcon />}
            sx={{ fontWeight: "bold" }}
            disabled={orgIds.length === 0 && !reload}
            onClick={() => setReload(true)}
          >
            Consultar ONGs
          </Button>
          <Button
            variant="contained"
            color="warning"
            startIcon={<RestartAltIcon />}
            sx={{ fontWeight: "bold" }}
            onClick={restablecer}
            disabled={orgIds.length === 0 && !error}
          >
            Reestablecer
          </Button>
        </div>

        {/* IDs cargados */}
        <div style={{ marginTop: "20px" }}>
          <h4>IDs cargados:</h4>
          {orgIds.length === 0 ? (
            <p style={{ color: "red", fontWeight: "bold" }}>No hay IDs cargados</p>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {orgIds.map((id) => (
                <Button key={id} variant="outlined" color="secondary" onClick={() => eliminarId(id)}>
                  {id} ✖
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card elevation={15} sx={{ width: "98%", marginBottom: "30px" }}>
        <Table aria-label="simple table">
          <TableHead
            sx={{
              backgroundColor: "rgb(5, 53, 101)",
              borderRadius: "10px 10px 0 0",
            }}
          >
            <TableRow>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px" }}>
                ONG
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px" }}>
                Nombre
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px" }}>
                Dirección
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "Bold", border: "solid black 2px" }}>
                Teléfono
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ONGs.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={4} sx={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
                  No hay ONGs registradas
                </TableCell>
              </TableRow>
            ) : (
              ONGs.map((ONG) => (
                <TableRow key={ONG.id}>
                  <TableCell align="center" sx={{ border: "solid black 2px", fontWeight: "bold" }}>
                    {ONG.id}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "solid black 2px", fontWeight: "bold" }}>
                    {ONG.name}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "solid black 2px", fontWeight: "bold" }}>
                    {ONG.address}
                  </TableCell>
                  <TableCell align="center" sx={{ border: "solid black 2px", fontWeight: "bold" }}>
                    {ONG.phone}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }} onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
