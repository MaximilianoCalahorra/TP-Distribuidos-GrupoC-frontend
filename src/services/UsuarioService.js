import axios from "axios";
import { Constants } from "../constants/index";

class UsuarioService {
  //Login:
  login(payload) {
    return axios.post(`${Constants.BASE_URL}/usuarios/login`, payload);
  }
  listarUsuarios(authToken) {
    return axios.get(`${Constants.BASE_URL}/usuarios/list`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
  crearUsuario(payload, authToken) {
    return axios.post(`${Constants.BASE_URL}/usuarios/crear`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }
  modificarUsuario(payload, authToken) {
    return axios.post(`${Constants.BASE_URL}/usuarios/modificar/${payload.idUsuario}`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }
  traerUsuario(idUsuario, authToken) {
    return axios.get(`${Constants.BASE_URL}/usuarios/traer/${idUsuario}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }
  desactivarUsuario(idUsuario, authToken) {
    return axios.post(`${Constants.BASE_URL}/usuarios/desactivar/${idUsuario}`, null, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }
  reactivarUsuario(idUsuario, authToken) {
    return axios.post(`${Constants.BASE_URL}/usuarios/reactivar/${idUsuario}`, null, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }
  listarUsuariosActivos() {
    return axios.get(`${Constants.BASE_URL}/usuarios/list/activos`, null);
  }
}

export default new UsuarioService();