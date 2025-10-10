import TextField from '@mui/material/TextField'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import FormControl from '@mui/material/FormControl';
import { Card, Button, InputAdornment, MenuItem, Box, Chip } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PropTypes from "prop-types";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import styles from './styles.module.css'
import SolidarityEventService from "../../services/SolidarityEventService";
import { LoadingScreen, Snackbar } from "../UI/index"
import { useState, useEffect } from 'react';
import UsuarioService from "../../services/UsuarioService";
import { useSelector } from '../../store/userStore';
import { useParams } from "react-router-dom";
import { formatProtoTimestampForInput } from '../../Utils/Utils';

export default function ManageSolidarityEvents({action}) {

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
      PaperProps: {
          style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
          },
      },
  };

  const { id } = useParams();
  const userEmail = useSelector((state) => state.userEmail)
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

  const [solidarityEventData, setSolidarityEventData] = useState({
    nombre: "",
    descripcion: "",
    fechaHora: {
      nanos: 0,
      seconds: 0
    },
    miembros: [
      {
        nombre: "",
        apellido: "",
        email: "",
        rol: {
          nombre: ""
        }
      }
    ]
  })
  const [fechaInput, setFechaInput] = useState("");
  const [miembrosActivos, setMiembrosActivos] = useState([]);
  const [miembrosSeleccionados, setMiembrosSeleccionados] = useState([]);
  
  const getEtiqueta = (emailMiembro) => {
    const m = miembrosActivos.find((x) => x.email === emailMiembro);
    if (!m) return emailMiembro;
    return `${m.nombre} ${m.apellido} - ${m.rol?.nombre ?? ""}`.trim();
  };

  const handleFechaChange = (eOrValue) => {
    const value = typeof eOrValue === "string" ? eOrValue : eOrValue?.target?.value;
    setFechaInput(value);
    const date = new Date(value);

    const seconds = Math.floor(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1e6;

    const fechaHora = {
      seconds: seconds,
      nanos: nanos,
    };
    setSolidarityEventData(prev => ({
      ...prev,
      fechaHora: {
        seconds: fechaHora.seconds,
        nanos: fechaHora.nanos,
      },
    }));
  };

  const extraerMiembrosSeleccionados = () => {
    const miembros = miembrosSeleccionados
      .map(email => miembrosActivos.find(m => m.email === email))
      .filter(Boolean)
      .map(m => ({
        nombre: m.nombre,
        apellido: m.apellido,
        email: m.email,
        rol: { nombre: m.rol?.nombre ?? "" },
      }));
    return miembros;
  }

  useEffect(()=> {
      const traerUsuariosActivos = async () => {
        const response = await UsuarioService.listarUsuariosActivos();
        setMiembrosActivos(
           (response.data.usuariosActivos ?? []).filter(m =>
            (m.email ?? "").toLowerCase() !== (userEmail ?? "").toLowerCase()
          )
        )
      }
      traerUsuariosActivos ();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authToken = useSelector((state) => state.authToken)

  const createSolidarityEvent = async () => {
    setIsLoading(false);
    setSnackbarVisibility(false);
    try {
      const miembros = extraerMiembrosSeleccionados(miembrosSeleccionados);
      const payload = {
        ...solidarityEventData,
        fechaHora: {
          seconds: String(solidarityEventData.fechaHora.seconds),
          nanos: String(solidarityEventData.fechaHora.nanos),
        },
        miembros,
      };
      await SolidarityEventService.crearEventoSolidario (payload, authToken);
      setLoadingScreen({
        message: "Creando evento solidario",
        duration: 2100,
      }),
      setIsLoading(true),
      setSnackbar({
        message: "Evento solidario creado con éxito!",
        status: "success"
      }),
      setTimeout(() => {
        setSolidarityEventData({
          nombre: "",
          descripcion: "",
          fechaHora: {
            nanos: 0,
            seconds: 0
          },
          miembros: [
            {
              nombre: "",
              apellido: "",
              email: "",
              rol: {
                nombre: ""
              }
            }
          ]
        })
        setMiembrosSeleccionados([]);
        setFechaInput("");
        setSnackbarVisibility(true);
      }, 2000)
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log(error);
      setSnackbar({
        message: "Error en la creacion del evento solidario!",
        status: "error"
      })
      setSnackbarVisibility(true);
    }
  }

    const modifyEvent = async (idEvento) => {
      setIsLoading(false);
      setSnackbarVisibility(false);
      try {
       const miembros = extraerMiembrosSeleccionados(miembrosSeleccionados);
        const payload = {
        ...solidarityEventData,
        fechaHora: {
          seconds: String(solidarityEventData.fechaHora.seconds),
          nanos: String(solidarityEventData.fechaHora.nanos),
        },
        miembros,
      };
        await SolidarityEventService.modificarEventoSolidario(payload, authToken, idEvento);
        setLoadingScreen({
          message: "Modificando evento solidario",
          duration: 2100,
        }),
        setIsLoading(true),
        setSnackbar({
          message: "Evento solidario modificado con éxito!",
          status: "success"
        }),
        setTimeout(() => {
          setSolidarityEventData({
            nombre: "",
            descripcion: "",
            fechaHora: {
              nanos: 0,
              seconds: 0
            },
            miembros: [
              {
                nombre: "",
                apellido: "",
                email: "",
                rol: {
                  nombre: ""
                }
              }
            ]
          })
          setMiembrosSeleccionados([]);
          setFechaInput("");
          setSnackbarVisibility(true);
        }, 2000)
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setSnackbar({
          message: "Error modificando el evento!",
          status: "error"
        })
        setSnackbarVisibility(true);
      }
    }

    useEffect (()=> {
      if (id) {
        const traerEventoSolidario = async () => {
          const response = await SolidarityEventService.obtenerEventoSolidarioPorId(authToken, id);
          const evento = response.data;
          setSolidarityEventData(evento);
          const emails = Array.from(new Set((evento.miembros ?? [])
          .map(m => String(m.email))
          .filter(e => (e ?? '').toLowerCase() !== (userEmail ?? '').toLowerCase())))
          setMiembrosSeleccionados(emails);
          setFechaInput(formatProtoTimestampForInput(evento.fechaHora));
        }
        traerEventoSolidario ();
      }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return (
    <div className={styles.container}>
      <Card elevation={5} sx={{display:"flex", flexDirection:"column", padding:"20px", gap:"30px"}}>
        {action == "addSolidarityEvent" ? (
          <h1>Crear nuevo evento solidario</h1>
        ) : (
          <h1>Modificar evento solidario</h1>
        )}
        <TextField
        label="Nombre"
        size='small'
        value={solidarityEventData.nombre}
        onChange={(e)=>{setSolidarityEventData({...solidarityEventData, nombre: e.target.value})}}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                  <DescriptionIcon />
              </InputAdornment>
            ),
          },
        }}
        />
        <TextField
          id=""
          label="Descripción"
          size='small'
          value={solidarityEventData.descripcion}
          onChange={(e)=>{setSolidarityEventData({...solidarityEventData, descripcion: e.target.value})}}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          id=""
          label="Fecha y Hora"
          type='datetime-local'
          size='small'
          value={fechaInput || ""}
          onChange={handleFechaChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            },
          }}
          InputLabelProps={{ shrink: true }}
        />
        <div>
          <FormControl sx={{width: 500 }}>
            <InputLabel id="demo-multiple-chip-label">Miembros</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={miembrosSeleccionados}
              onChange={(e)=> setMiembrosSeleccionados(e.target.value)}
              input={<OutlinedInput id="select-multiple-chip" label="Miembros" />}
              renderValue={(selected) => {
                  if (!selected || selected.length === 0) {
                      return <em>Añadir miembros</em>
                  }
                  return <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                      <Chip key={value} label={getEtiqueta(value)} />
                  ))}
                  </Box>
              }}
              MenuProps={MenuProps}
            >
              {miembrosActivos.map((miembro) => (
                  <MenuItem key={miembro.email} value={miembro.email}>
                    {miembro.nombre} {miembro.apellido} — {miembro.rol?.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {action == "addSolidarityEvent" ? (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}} onClick={()=> {createSolidarityEvent()}}>Cargar evento solidario</Button>
        ) : (
          <Button variant="contained" color="primary" startIcon={<FileUploadIcon />} sx={{fontWeight:"bold"}} onClick={()=> {modifyEvent (id)}}>Modificar evento solidario</Button>
        )}
      </Card>
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
  )
}

ManageSolidarityEvents.propTypes = {
  action: PropTypes.string.isRequired,
};
