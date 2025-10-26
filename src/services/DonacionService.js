import axios from "axios";
import { Constants } from "../constants/index";

class DonacionService {
  //Listar donaciones de un evento:
  listarDonacionesPorEvento(idEventoSolidario, authToken) {
    return axios.get(`${Constants.BASE_URL}/donaciones/evento/${idEventoSolidario}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  //Crear una donacion:
  crearDonacion(idEventoSolidario, payload, authToken) {
    return axios.post(`${Constants.BASE_URL}/donaciones/evento/${idEventoSolidario}`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }

   //Listar donaciones de un evento:
  solicitudesDeDonacionesInternas(authToken) {
    return axios.get(`${Constants.BASE_URL}/solicitudes-donaciones/internas`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
}

export default new DonacionService();