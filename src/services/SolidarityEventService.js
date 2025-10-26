import axios from "axios";
import { Constants } from "../constants/index";

class SolidarityEventService {
  listarEventosSolidarios(authToken) {
    return axios.get(`${Constants.BASE_URL}/eventos-solidarios`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  crearEventoSolidario(payload, authToken) {
    return axios.post(`${Constants.BASE_URL}/eventos-solidarios`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  modificarEventoSolidario(payload, authToken, idEvento) {
    return axios.patch(`${Constants.BASE_URL}/eventos-solidarios/${idEvento}`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  participarDeEventoSolidario(authToken, idEvento) {
    return axios.post(`${Constants.BASE_URL}/eventos-solidarios/alta/${idEvento}`, null, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  darseDeBajaDeEventoSolidario(authToken, idEvento) {
    return axios.post(`${Constants.BASE_URL}/eventos-solidarios/baja/${idEvento}`, null, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  obtenerEventoSolidarioPorId(authToken, idEvento) {
     return axios.get(`${Constants.BASE_URL}/eventos-solidarios/${idEvento}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  eliminarEventoSolidario(authToken, idEvento) {
     return axios.delete(`${Constants.BASE_URL}/eventos-solidarios/${idEvento}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  publicarEventoSolidario(authToken, idEvento) {
    return axios.post(`${Constants.BASE_URL}/eventos-solidarios/publicar/${idEvento}`, null, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
}

export default new SolidarityEventService();