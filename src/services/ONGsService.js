import axios from "axios";
import { Constants } from "../constants/index";

class ONGsService {
  //Obtener ONGs por ids:
  obtenerONGs(payload) {
    return axios.post(`${Constants.BASE_URL_SOAP}/soap/ongs`, payload);
  }
}

export default new ONGsService();