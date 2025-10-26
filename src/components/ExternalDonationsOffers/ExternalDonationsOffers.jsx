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
import { ListDialog } from "../UI/index"
import styles from "./styles.module.css";
import { useSelector } from '../../store/userStore';
import DonationsOfferService from "../../services/DonationsOfferService";

export default function ExternalDonations() {

  const [ofrecimientosDeDonacionesExternos, setOfrecimientosDeDonacionesExternos] = useState([]);
  const [items, setItems] = useState ([]);
  const [showItemsList, setShowItemsList] = useState(false);
  const closeItemsList = () => {
    setShowItemsList(false);
  }
  const openItemsList = (donationRequest) => {
    setItems(donationRequest.items);
    setShowItemsList(true);
  }

  const authToken = useSelector((state) => state.authToken)
  //Obtener ofrecimientos de donaciones externos:
  const fetchOfrecimientosDeDonacionesExternos = async () => {
    try {
      const response = await DonationsOfferService.listarOfrecimientosDeDonacionesExternos(authToken);
      setOfrecimientosDeDonacionesExternos(response.data.ofertas); //Seteamos los ofrecimientos de donaciones externos de la página con la respuesta del cliente gRPC.
    } catch (error) {
      console.error("Error al obtener los ofrecimientos de donaciones externos:", error.response?.data || error.message);
    }
  }

  //Cargar los ofrecimientos de donaciones externos en el primer renderizado de la página:
  useEffect(() => {
      fetchOfrecimientosDeDonacionesExternos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Ofrecimientos de donaciones externos</h1>
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
                  borderRight: "solid black 2px",
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ofrecimientosDeDonacionesExternos.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={3} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay ofrecimientos de donaciones externos registrados
                </TableCell>
              </TableRow>
            ) :
            (ofrecimientosDeDonacionesExternos.map((ofrecimientoDeDonacion) => {
              return (
                <TableRow key={ofrecimientoDeDonacion.idInventario}>
                  <TableCell align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {ofrecimientoDeDonacion.idOrganizacion}
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
                        onClick={() => {openItemsList(ofrecimientoDeDonacion)}}
                      >
                        Items solicitados
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
    </div>
  );
}