import axios from "axios";
import { Constants } from "../constants/index";

class SolidarityEventService {
  listarEventosSolidarios(authToken) {
    return axios.get(${Constants.BASE_URL}/eventos-solidarios, {
      headers: {
        Authorization: Basic ${authToken},
      },
    });
  }
  crearEventoSolidario(payload, authToken) {
    console.log(payload);
    return axios.post(${Constants.BASE_URL}/eventos-solidarios, payload, {
      headers: {
        Authorization: Basic ${authToken},
      },
    });
  }
  modificarEventoSolidario(payload, authToken, idEvento) {
    console.log(payload);
    return axios.patch(${Constants.BASE_URL}/eventos-solidarios/${idEvento}, payload, {
      headers: {
        Authorization: Basic ${authToken},
      },
    });
  }
}

export default new SolidarityEventService();