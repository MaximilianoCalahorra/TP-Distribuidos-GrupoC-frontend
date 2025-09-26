import axios from "axios";
import { Constants } from "../constants/index";

class InventarioService {
  //Listar inventarios:
  listarInventarios(authToken) {
    return axios.get(`${Constants.BASE_URL}/inventarios`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }

  //Listar inventarios activos:
  listarInventariosActivos(authToken) {
    return axios.get(`${Constants.BASE_URL}/inventarios/activos`), {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    };
  }

  //Crear un inventario:
  crearInventario(payload, authToken) {
    return axios.post(`${Constants.BASE_URL}/inventarios`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }

  //Modificar un inventario:
  modificarInventario(id, payload, authToken) {
    return axios.patch(`${Constants.BASE_URL}/inventarios/${id}`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }

  //Desactivar un inventario:
  eliminarLogicoInventario(id, authToken) {
    return axios.patch(`${Constants.BASE_URL}/inventarios/${id}/deshabilitar`, null, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }

  //Activar un inventario:
  habilitarInventario(id, authToken) {
    return axios.patch(`${Constants.BASE_URL}/inventarios/${id}/habilitar`, null, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }

  //Traer un inventario:
  traerInventario(idInventario, authToken) {
    return axios.get(`${Constants.BASE_URL}/inventarios/${idInventario}/traer`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      }
    });
  }
}

export default new InventarioService();