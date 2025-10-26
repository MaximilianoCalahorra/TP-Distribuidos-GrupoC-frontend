import axios from "axios";
import { Constants } from "../constants/index";

class ExternalEventsService {
  listarEventosExternos(authToken) {
    return axios.get(`${Constants.BASE_URL}/eventos-externos`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  participarDeEventoSolidarioExterno(authToken, payload) {
    return axios.post(`${Constants.BASE_URL}/eventos-externos/participante-interno`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
}

export default new ExternalEventsService();