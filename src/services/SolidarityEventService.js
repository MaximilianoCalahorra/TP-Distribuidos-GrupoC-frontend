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
    /**
   * Llama al resolver informeParticipacionEventos(filtro)
   * @param {string} authToken 
   * @param {object} filtro     
   */
  obtenerInformeEventosSolidarios(authToken, filtro) {
    const query = `
      query InformeParticipacionEventos($filtroJson: String!) {
        informeParticipacionEventos(filtroJson: $filtroJson) {
          mes
          eventos {
            dia
            nombreEvento
            descripcion
            repartoDonaciones
          }
        }
      }
    `;

    const variables = {
      filtroJson: JSON.stringify(filtro),
    };

    return axios.post(
      `${Constants.BASE_URL_GRAPHQL}/graphql`,
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Basic ${authToken}`,
        },
      }
    );
  }

  obtenerFiltros(authToken) {
    return axios.get(`${Constants.BASE_URL_REST}/api/v1/filtros-eventos`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  crearFiltro(authToken, payload) {
    return axios.post(`${Constants.BASE_URL_REST}/api/v1/filtros-eventos`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  modificarFiltro(authToken, payload) {
    return axios.put(`${Constants.BASE_URL_REST}/api/v1/filtros-eventos`, payload, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  eliminarFiltro(authToken, idFiltro) {
    return axios.delete(`${Constants.BASE_URL_REST}/api/v1/filtros-eventos/${idFiltro}`, {
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }
}

export default new SolidarityEventService();