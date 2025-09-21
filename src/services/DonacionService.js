import axios from "axios";
import { Constants } from "../constants/index";

class DonacionService {
  //Listar donaciones de un evento:
  listarDonacionesPorEvento(idEventoSolidario) {
    return axios.get(`${Constants.BASE_URL}/donaciones/evento/${idEventoSolidario}`);
  }

  //Crear una donacion:
  crearDonacion(idEventoSolidario, payload) {
    return axios.post(`${Constants.BASE_URL}/donaciones/evento/${idEventoSolidario}`, payload);
  }
}

export default new DonacionService();