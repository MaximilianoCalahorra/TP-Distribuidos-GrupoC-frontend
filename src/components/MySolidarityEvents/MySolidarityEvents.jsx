import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
  MenuItem,
  TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useSelector } from '../../store/userStore';
import TransfersService from "../../services/TransfersService";
import FeedIcon from '@mui/icons-material/Feed';
import DownloadIcon from '@mui/icons-material/Download';
import { Categorias } from '../../constants/Categorias'

export default function IncomingTransfers() {
  const [eventosSolidarios, setEventosSolidarios] = useState([]);
  const [reload, setReload] = useState (true);
  const [filtros, setFiltros] = useState ({
   usuarioEmail: "",
   fechaHoraDesde: "",
   fechaHoraHasta: "",
   repartoDonaciones: ""
  })
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [filename, setFilename] = useState("donaciones.xlsx");

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);
  
  const authToken = useSelector((state) => state.authToken)
  //Obtener transferencias entrantes:
  const fetchTransferenciasEntrantes = async () => {
    try {
      const response = await TransfersService.obtenerInformePorCategoria(authToken, filtros);
      setTransferenciasEntrantes(response.data.data.informeDonacionesPorCategoria); //Seteamos las transferencias entrantes de la página con la respuesta del cliente gRPC.
    } catch (error) {
      console.error("Error al obtener las transferencias entrantes:", error.response?.data || error.message);
    }
  }

  const parseFilename = (disposition) => {
    const match = /filename\*?=(?:UTF-8'')?"?([^"]+)"?/i.exec(disposition || "");
    return match?.[1] || "donaciones.xlsx";
  };
  
  const generarInformeEnExcel = async () => {
    try {
      const response = await TransfersService.generarInformeEnExcel();
      console.log(response);
      const header = response.headers["Content-Disposition"];
      const name = parseFilename(header);
      setFilename(name);
      const url = URL.createObjectURL(new Blob([response.data]));
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(url);

      setDownloadUrl(url);
    } catch (error) {
      console.error("Error al generar el informe en excel:", error.response?.data || error.message);
    }
  }

  //Cargar las transferencias salientes en el primer renderizado de la página:
  useEffect(() => {
    if (reload) {
      fetchTransferenciasEntrantes();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Transferencias entrantes</h1>
        <div className={styles.excelContainer}>
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", width:"20%", alignSelf:"center" }}
            onClick={() => generarInformeEnExcel()}
            startIcon={<FeedIcon />}
          >
            Generar informe en Excel
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ fontWeight: "bold", width:"10%", alignSelf:"center" }}
            component="a"
            href={downloadUrl || undefined}
            download={filename}
            disabled={!downloadUrl}
            startIcon={<DownloadIcon />}
          >
            Descargar
          </Button>
        </div>
        <div className={styles.buttonsContainer}>
          <div className={styles.filtersContainer}>
            <TextField
              select
              label="Tipo transferencia"
              sx={{width:"10%"}}
              size='small'
              value={filtros.tipoTransferencia}
              disabled
            >
              <MenuItem value="ENTRANTE">ENTRANTE</MenuItem>
            </TextField>
            <TextField
              select
              label="Categoría"
              size='small'
              sx={{width:"17%"}}
              value={filtros.categoria}
              onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
            >
              <MenuItem value="TODAS">TODAS</MenuItem>
              {Categorias.map((categoria, i)=> (
                <MenuItem key={i} value={categoria}>
                  {categoria}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Eliminado"
              size='small'
              sx={{width:"8%"}}
              value={filtros.eliminado}
              onChange={(e) => setFiltros({...filtros, eliminado: e.target.value})}
            >
              <MenuItem value="SI">SI</MenuItem>
              <MenuItem value="NO">NO</MenuItem>
            </TextField>
            <TextField
              id=""
              label="Fecha y Hora Alta Desde"
              type='datetime-local'
              size='small'
              sx={{width:"16%"}}
              value={filtros.fechaHoraAltaDesde || ""}
              onChange={(e) => setFiltros({...filtros, fechaHoraAltaDesde: e.target.value})}
              InputLabelProps={{ shrink: true }}
            />
             <TextField
              id=""
              label="Fecha y Hora Alta Hasta"
              type='datetime-local'
              size='small'
              sx={{width:"16%"}}
              value={filtros.fechaHoraAltaHasta || ""}
              onChange={(e) => setFiltros({...filtros, fechaHoraAltaHasta: e.target.value})}
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
                categoria: "TODAS",
                fechaHoraAltaDesde: "",
                fechaHoraAltaHasta: "",
                eliminado: "NO",
                tipoTransferencia: "ENTRANTE"
              })}
              startIcon={<RestartAltIcon/>}
            >
              Reestablecer
            </Button>
          </div>
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
                Categoría
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
                Eliminado
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
                Cantidad
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transferenciasEntrantes.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={3} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay transferencias entrantes registradas
                </TableCell>
              </TableRow>
            ) :
            (transferenciasEntrantes.map((transferencia) => {
              return (
                <TableRow>
                  <TableCell align="center" 
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}>
                    {transferencia.categoria}
                  </TableCell>
                  <TableCell align="center" 
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}>
                    {transferencia.eliminado == false ? "No" : "Si"}
                  </TableCell>
                  <TableCell align="center" 
                    sx={{
                      color: "black",
                      fontWeight: "Bold",
                      border: "solid black 2px",
                    }}>
                    {transferencia.cantidadTotal}
                  </TableCell>
                </TableRow>
              )
            }))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}