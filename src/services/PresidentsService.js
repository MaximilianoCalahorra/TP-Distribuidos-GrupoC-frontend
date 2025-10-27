import axios from "axios";
import { Constants } from "../constants/index";

class PresidentsService {
  //Obtener presidentes por ids:
  obtenerPresidentes(payload) {
    return axios.post(`${Constants.BASE_URL_SOAP}/soap/presidentes`, payload);
  }
}

export default new PresidentsService();