import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Typography, TextField, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import { Dialog, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { Snackbar, LoadingScreen } from "../index";
import { Categorias } from "../../../constants/Categorias";
import { useSelector } from "../../../store/userStore";
import TransfersService from "../../../services/TransfersService";

function EditTransfersFilterDialog({ mostrarAlerta, closeAlerta, filtro, onEdited }) {
  const [filtroAEditar, setFiltroAEditar] = useState({
    idFiltroDonacion: filtro.idFiltroDonacion,
    nombreFiltro: filtro.nombreFiltro,
    categoria: filtro.categoria,
    fechaHoraAltaDesde: filtro.fechaHoraAltaDesde,
    fechaHoraAltaHasta: filtro.fechaHoraAltaHasta,
    eliminado: filtro.eliminado
  });

  useEffect(() => {
    if (filtro && mostrarAlerta) {
      setFiltroAEditar({
        idFiltroDonacion: filtro.idFiltroDonacion ?? "",
        nombreFiltro: filtro.nombreFiltro ?? "",
        categoria: filtro.categoria ?? "TODAS",
        fechaHoraAltaDesde: filtro.fechaHoraAltaDesde,
        fechaHoraAltaHasta: filtro.fechaHoraAltaHasta,
        eliminado: filtro.eliminado ?? "AMBOS"
      });
    }
  }, [filtro, mostrarAlerta]);

  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [snackbar, setSnackbar] = useState({
    status: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState({
    message: "",
    duration: null,
  });

  const authToken = useSelector((state) => state.authToken);
  const editarFiltro = async () => {
    try {
      setIsLoading(false);
      setSnackbarVisibility(false);
      const input = {
        idFiltroDonacion: filtroAEditar.idFiltroDonacion,
        categoria: filtroAEditar.categoria,
        fechaHoraAltaDesde: filtroAEditar.fechaHoraAltaDesde,
        fechaHoraAltaHasta: filtroAEditar.fechaHoraAltaHasta,
        eliminado: filtroAEditar.eliminado,
        nombreFiltro: filtroAEditar.nombreFiltro,
      };
      await TransfersService.modificarFiltro(authToken, input);
      setLoadingScreen({
        message: "Editando filtro",
        duration: 2200,
      }),
        setIsLoading(true),
        setSnackbar({
          message: "Filtro editado con éxito!",
          status: "success",
        }),
        setTimeout(() => {
           closeAlerta();
           setSnackbarVisibility(true);
           onEdited?.();
        }, 2000);
    } catch (error) {
      console.error(
        "Error al editar el filtro:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <Dialog
        onClose={closeAlerta}
        aria-labelledby="customized-dialog-title"
        open={mostrarAlerta}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            padding: "16px",
            backgroundColor: "#f0f0f0",
            width: "600px",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <img src="/IconoPagina.png" alt="" style={{ height: "50px" }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "black" }}>
            Editar filtro
          </Typography>
        </DialogTitle>

        <Divider sx={{ border: "solid 2px rgb(25, 118, 210)" }} />

        <IconButton
          aria-label="close"
          onClick={closeAlerta}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "25px",
          }}
        >
          <TextField
            type="text"
            label="Nombre del filtro"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.nombreFiltro}
            onChange={(e) =>
              setFiltroAEditar({ ...filtroAEditar, nombreFiltro: e.target.value })
            }
          ></TextField>
          <TextField
            select
            label="Categoría"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.categoria}
            onChange={(e) =>
              setFiltroAEditar({ ...filtroAEditar, categoria: e.target.value })
            }
          >
            <MenuItem value="TODAS">TODAS</MenuItem>
            {Categorias.map((categoria, i) => (
              <MenuItem key={i} value={categoria}>
                {categoria}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Eliminado"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.eliminado}
            onChange={(e) =>
              setFiltroAEditar({ ...filtroAEditar, eliminado: e.target.value })
            }
          >
            <MenuItem value="SI">SI</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
            <MenuItem value="AMBOS">AMBOS</MenuItem>
          </TextField>
          <TextField
            id=""
            label="Fecha y Hora Alta Desde"
            type="datetime-local"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.fechaHoraAltaDesde}
            onChange={(e) =>
              setFiltroAEditar({
                ...filtroAEditar,
                fechaHoraAltaDesde: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id=""
            label="Fecha y Hora Alta Hasta"
            type="datetime-local"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.fechaHoraAltaHasta}
            onChange={(e) =>
              setFiltroAEditar({
                ...filtroAEditar,
                fechaHoraAltaHasta: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", marginTop: "20px" }}
            onClick={() => {editarFiltro()}}
            startIcon={<SendIcon />}
            disabled={filtroAEditar.nombreFiltro == ""}
          >
            Editar filtro
          </Button>
        </DialogContent>
      </Dialog>
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
    </>
  );
}

EditTransfersFilterDialog.propTypes = {
  mostrarAlerta: PropTypes.bool.isRequired,
  closeAlerta: PropTypes.func.isRequired,
  filtro: PropTypes.object.isRequired,
  onEdited: PropTypes.func.isRequired
};

export default EditTransfersFilterDialog;
