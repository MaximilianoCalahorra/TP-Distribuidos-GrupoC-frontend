import axios from "axios";
import { Constants } from "../constants/index";

class InventarioService {
  //Listar inventarios:
  listarInventarios() {
    return axios.get(`${Constants.BASE_URL}/inventarios`);
  }

  //Listar inventarios activos:
  listarInventariosActivos() {
    return axios.get(`${Constants.BASE_URL}/inventarios/activos`);
  }

  //Crear un inventario:
  crearInventario(payload) {
    return axios.post(`${Constants.BASE_URL}/inventarios`, payload);
  }

  //Modificar un inventario:
  modificarInventario(id, payload) {
    return axios.patch(`${Constants.BASE_URL}/inventarios/${id}`, payload);
  }

  //Desactivar un inventario:
  eliminarLogicoInventario(id) {
    return axios.patch(`${Constants.BASE_URL}/inventarios/${id}/deshabilitar`);
  }

  //Activar un inventario:
  habilitarInventario(id) {
    return axios.patch(`${Constants.BASE_URL}/inventarios/${id}/habilitar`);
  }
}

export default new InventarioService();