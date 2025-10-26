import axios from "axios";
import { Constants } from "../constants/index";

class DonationsOfferService {
  listarOfrecimientosDeDonacionesInternos(authToken) {
    return axios.get(`${Constants.BASE_URL}/ofertas-donaciones/internas`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  crearOfrecimientoDeDonacion (authToken, payload) {
    return axios.post(`${Constants.BASE_URL}/ofertas-donaciones`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  listarOfrecimientosDeDonacionesExternos(authToken) {
    return axios.get(`${Constants.BASE_URL}/ofertas-donaciones/externas`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
}

export default new DonationsOfferService();