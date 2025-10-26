import axios from "axios";
import { Constants } from "../constants/index";

class ExternalEventsService {
  listarSolicitudesDeDonacionesInternas(authToken) {
    return axios.get(`${Constants.BASE_URL}/solicitudes-donaciones/internas`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  crearSolicitudDeDonacion (authToken, payload) {
    return axios.post(`${Constants.BASE_URL}/solicitudes-donaciones`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  eliminarSolicitudDeDonacion(authToken, idSolicitudDeDonacion) {
     return axios.delete(`${Constants.BASE_URL}/solicitudes-donaciones/${idSolicitudDeDonacion}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  listarSolicitudesDeDonacionesExternas(authToken) {
    return axios.get(`${Constants.BASE_URL}/solicitudes-donaciones/externas`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  crearTransferencia (authToken, payload) {
    return axios.post(`${Constants.BASE_URL}/transferencias-donaciones`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
}

export default new ExternalEventsService();