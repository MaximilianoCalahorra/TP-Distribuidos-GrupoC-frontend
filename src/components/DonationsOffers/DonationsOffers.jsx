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
import styles from "./styles.module.css";
import { ListDialog, AlertaDialog, Snackbar, LoadingScreen } from "../UI/index"
import { useSelector } from '../../store/userStore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LanguageIcon from '@mui/icons-material/Language';
import DonationsOfferService from "../../services/DonationsOfferService";

export default function DonationsOffers() {
  const navigate = useNavigate();
  const [ofrecimientosDeDonacionesInternos, setOfrecimientosDeDonacionesInternos] = useState([]);
  const [reload, setReload] = useState (true);
  
  //const [selectedDonationOffer, setSelectedDonationOffer] = useState([]);
  
  const [items, setItems] = useState ([]);
  const [showItemsList, setShowItemsList] = useState(false);
  const closeItemsList = () => {
    setShowItemsList(false);
  }
  const openItemsList = (donationOffer) => {
    setItems(donationOffer.items);
    setShowItemsList(true);
  }
  
  const authToken = useSelector((state) => state.authToken)
  //Obtener ofrecimientos de donaciones internos:
  const fetchSolicitudesDeDonacionesInternas = async () => {
    try {
      const response = await DonationsOfferService.listarOfrecimientosDeDonacionesInternos(authToken);
      setOfrecimientosDeDonacionesInternos(response.data.ofertas); //Seteamos los ofrecimientos de donaciones internos de la página con la respuesta del cliente gRPC.
    } catch (error) {
      console.error("Error al obtener los ofrecimientos de donaciones internos:", error.response?.data || error.message);
    }
  }

  //Cargar los ofrecimientos de donaciones internos en el primer renderizado de la página:
  useEffect(() => {
    if (reload) {
      fetchSolicitudesDeDonacionesInternas();
      setReload(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  
  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1>Ofrecimientos de donaciones</h1>
        <div className={styles.buttonsContainer}>
          <Button 
            variant="contained" 
            color="success" 
            sx={{ fontWeight: "bold" }} 
            onClick={()=> {navigate("/offersDonations/requestDonationOffer")}}
            startIcon={<AddCircleOutlineIcon/>}
          >
            Nuevo ofrecimiento
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontWeight: "bold", marginLeft:"38%" }}
            onClick={() => navigate("/offersDonationsExt")}
            startIcon={<LanguageIcon/>}
          >
            Ofrecimientos externos
          </Button>
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
                  borderBottom: "solid black 2px",
                  width:"50%"
                }}
              >
                ID solicitud
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
            {ofrecimientosDeDonacionesInternos.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={3} sx={{ color: "red", fontWeight: "bold", fontSize:"20px" }}>
                  No hay ofrecimientos de donaciones registrados
                </TableCell>
              </TableRow>
            ) :
            (ofrecimientosDeDonacionesInternos.map((ofrecimientoDeDonacion) => {
              return (
                <TableRow key={ofrecimientoDeDonacion.idInventario}>
                  <TableCell align="center" 
                  sx={{
                    color: "black",
                    fontWeight: "Bold",
                    border: "solid black 2px",
                  }}>
                    {ofrecimientoDeDonacion.idOfertaDonacion}
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
                        Items ofrecidos
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