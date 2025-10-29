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
import { useSelector } from "../../../store/userStore";
import SolidarityEventService from "../../../services/SolidarityEventService";

function EditSolidarityEventFilterDialog({
  mostrarAlerta,
  closeAlerta,
  filtro,
  onEdited,
  usuariosActivos,
}) {
  const [filtroAEditar, setFiltroAEditar] = useState({
    id: filtro.id,
    nombreFiltro: filtro.nombreFiltro,
    emailUsuario: filtro.emailUsuario,
    fechaHoraDesde: filtro.fechaHoraDesde,
    fechaHoraHasta: filtro.fechaHoraHasta,
    repartoDonaciones: filtro.repartoDonaciones,
  });

  useEffect(() => {
    if (filtro && mostrarAlerta) {
      setFiltroAEditar({
        id: filtro.id ?? "",
        nombreFiltro: filtro.nombreFiltro ?? "",
        emailUsuario: filtro.emailUsuario ?? "",
        fechaHoraDesde: filtro.fechaHoraDesde,
        fechaHoraHasta: filtro.fechaHoraHasta,
        repartoDonaciones: filtro.repartoDonaciones ?? "AMBOS",
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
      const payload = {
        id: filtroAEditar.id,
        nombreFiltro: filtroAEditar.nombreFiltro,
        emailUsuario: filtroAEditar.emailUsuario,
        fechaHoraDesde: filtroAEditar.fechaHoraDesde,
        fechaHoraHasta: filtroAEditar.fechaHoraHasta,
        repartoDonaciones: filtroAEditar.repartoDonaciones,
      };
      await SolidarityEventService.modificarFiltro(authToken, payload);
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
              setFiltroAEditar({
                ...filtroAEditar,
                nombreFiltro: e.target.value,
              })
            }
          ></TextField>
          <TextField
            select
            label="Usuario"
            sx={{ width: "50%" }}
            size="small"
            value={filtroAEditar.emailUsuario}
            disabled={usuariosActivos.length === 0}
            onChange={(e) =>
              setFiltroAEditar({
                ...filtroAEditar,
                emailUsuario: e.target.value,
              })
            }
          >
            {usuariosActivos.length === 0 ? (
              <MenuItem value={filtroAEditar.emailUsuario}>
                {filtroAEditar.emailUsuario}
              </MenuItem>
            ) : (
              usuariosActivos.map((usuario) => {
                return (
                  <MenuItem value={usuario.email}>{usuario.email}</MenuItem>
                );
              })
            )}
          </TextField>
          <TextField
            select
            label="Reparto donaciones"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.repartoDonaciones}
            onChange={(e) =>
              setFiltroAEditar({ ...filtroAEditar, repartoDonaciones: e.target.value })
            }
          >
            <MenuItem value="AMBOS">AMBOS</MenuItem>
            <MenuItem value="SI">SI</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
          </TextField>
          <TextField
            id=""
            label="Fecha y Hora Desde"
            type="datetime-local"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.fechaHoraDesde}
            onChange={(e) =>
              setFiltroAEditar({
                ...filtroAEditar,
                fechaHoraDesde: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id=""
            label="Fecha y Hora Hasta"
            type="datetime-local"
            size="small"
            sx={{ width: "50%" }}
            value={filtroAEditar.fechaHoraHasta}
            onChange={(e) =>
              setFiltroAEditar({
                ...filtroAEditar,
                fechaHoraHasta: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", marginTop: "20px" }}
            onClick={() => {
              editarFiltro();
            }}
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

EditSolidarityEventFilterDialog.propTypes = {
  mostrarAlerta: PropTypes.bool.isRequired,
  closeAlerta: PropTypes.func.isRequired,
  filtro: PropTypes.object.isRequired,
  usuariosActivos: PropTypes.object.isRequired,
  onEdited: PropTypes.func.isRequired,
};

export default EditSolidarityEventFilterDialog;
