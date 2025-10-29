import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ListDialog, TransferItemsDialog } from "../UI/index"
import styles from "./styles.module.css";
import InventarioService from "../../services/InventarioService";
import { useSelector } from '../../store/userStore';
import DonationsRequestService from "../../services/DonationsRequestService";
import { disableTransfer, getInventoriesSelected } from "../../Utils/Utils";

export default function ExternalDonations() {

  const [solicitudesDeDonacionesExternas, setSolicitudesExternas] = useState([]);
  const [reload, setReload] = useState (true);
  const [inventarios, setInventarios] = useState([]);
  const [inventoriesSelected, setInventoriesSelected] = useState([]);

  const [idSolicitud, setIdSolicitud] = useState("");
  const [idOrganizacion, setIdOrganizacion] = useState("");
  const [items, setItems] = useState ([]);
  const [showItemsList, setShowItemsList] = useState(false);
  const closeItemsList = () => {
    setShowItemsList(false);
  }
  const openItemsList = (donationRequest) => {
    setItems(donationRequest.items);
    setShowItemsList(true);
  }

  const [showTransferItemsList, setShowTransferItemsList] = useState(false);
  const closeTransferItemsList = () => {
    setShowTransferItemsList(false);
  }
  const openTransferItemsList = (donationRequest, inventories) => {
    setIdSolicitud(donationRequest.idSolicitudDonacionOrigen)
    setIdOrganizacion(donationRequest.idOrganizacion)
    setItems(donationRequest.items);
    setInventoriesSelected(inventories);
    setShowTransferItemsList(true);
  }

  const authToken = useSelector((state) => state.authToken)
  //Obtener solicitudes de donaciones externas:
  const fetchSolicitudesDeDonacionesExternas = async () => {
    try {
      const response = await DonationsRequestService.listarSolicitudesDeDonacionesExternas(authToken);
      setSolicitudesExternas(response.data.solicitudes); //Seteamos las solicitudes de donaciones externas de la página con la respuesta del cliente gRPC.
    } catch (error) {
      console.error("Error al obtener las solicitudes de donaciones internas:", error.response?.data || error.message);
    }
  }

  //Cargar las solicitudes de donaciones internas en el primer renderizado de la página:
  useEffect(() => {
    if (reload) {
      fetchSolicitudesDeDonacionesExternas();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  //Obtener inventarios:
    const fetchInventarios = async () => {
      try {
        const response = await InventarioService.listarInventarios(authToken);
        setInventarios(response.data.inventarios); //Seteamos los inventarios de la página con la respuesta del cliente gRPC.
      } catch (error) {
        console.error("Error al obtener inventarios:", error.response?.data || error.message);
      }
    }
  
    //Cargar los inventarios en el primer renderizado de la página:
    useEffect(() => {
      if (reload) {
        fetchInventarios();
        setReload(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Solicitudes de donaciones externas</h1>
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
                  width:"50%"
                }}
              >
                Organización
              </TableCell>
               <TableCell
                align="center"
                sx={{
                  color: "white",
                  fontWeight: "Bold",
                  borderLeft: "solid black 2px",
                  borderTop: "solid black 2px",
                  borderBottom: "solid black 2px",
                  width:"50%"
                }}
              >
                Solicitud
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
            {solicitudesDeDonacionesExternas.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={3} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay solicitudes de donaciones externas registradas
                </TableCell>
              </TableRow>
            ) :
            (solicitudesDeDonacionesExternas.map((solicitudDeDonacion) => {
              return (
                <TableRow key={solicitudDeDonacion.idInventario}>
                  <TableCell align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {solicitudDeDonacion.idOrganizacion}
                  </TableCell>
                  <TableCell align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {solicitudDeDonacion.idSolicitudDonacionOrigen}
                  </TableCell>
                  <TableCell align="center"
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                    width: "50px",
                  }}>
                    <div className={styles.actionsContainer}>
                       <Button
                        variant="contained"
                        sx={{ backgroundColor: "purple", fontWeight: "bold" }}
                        onClick={() => {openItemsList(solicitudDeDonacion)}}
                      >
                        Items solicitados
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                        onClick={() => {openTransferItemsList(solicitudDeDonacion, getInventoriesSelected(inventarios, solicitudDeDonacion.items))}}
                        disabled={!disableTransfer(inventarios, solicitudDeDonacion.items)}
                      >
                        Crear Transferencia
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            }))}
          </TableBody>
        </Table>
      </Card>
       <ListDialog
        mostrarAlerta={showItemsList}
        elementos={items}
        closeAlerta={closeItemsList}
        tipoListado={"items"}
      />
      <TransferItemsDialog
        mostrarAlerta={showTransferItemsList}
        idSolicitud={idSolicitud}
        idOrganizacion={idOrganizacion}
        elementos={items ?? []}
        inventarios={inventoriesSelected ?? []}
        closeAlerta={closeTransferItemsList}
        onTransferred={() => setReload(true)}
      />
    </div>
  );
}