import axios from "axios";
import { Constants } from "../constants/index";

class TransfersService {
  /**
   * Llama al resolver informeDonacionesPorCategoria(filtro)
   * @param {string} authToken 
   * @param {object} filtro     
   */
  obtenerInformePorCategoria(authToken, filtro) {
    const query = `
      query InformeDonacionesPorCategoria($filtro: FiltroDonacionBusquedaInput!) {
        informeDonacionesPorCategoria(filtro: $filtro) {
         categoria,
         eliminado,
         cantidadTotal
        }
      }
    `;

    return axios.post(
      `${Constants.BASE_URL_GRAPHQL}/graphql`,
      {
        query,
        variables: { filtro },
      },
      {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Basic ${authToken}`,
        },
      }
    );
  }
  
  generarInformeEnExcel() {
    return axios.get(`${Constants.BASE_URL_REST}/api/reportes/donaciones.xlsx`, {
      responseType: "blob",
    })
  };

   /**
   * Llama al resolver crearFiltroDonacion(input)
   * @param {string} authToken 
   * @param {object} payload     
   */
  crearFiltro(authToken, input) {
    const mutation = `
      mutation CrearFiltroDonacion($input: FiltroDonacionInput!) {
        crearFiltroDonacion(input: $input) {
          idFiltroDonacion
          nombreFiltro
          categoria
          fechaHoraAltaDesde
          fechaHoraAltaHasta
          eliminado
        }
      }
    `;
    return axios.post(
      `${Constants.BASE_URL_GRAPHQL}/graphql`,
      {
        query: mutation,
        variables: { input },
      },
      {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Basic ${authToken}`,
        },
      }
    );
  }

  /**
   * Llama al resolver filtrosDonacionUsuario()
   * @param {string} authToken 
   * @param {object} payload     
   */
  obtenerFiltros(authToken) {
    const query = `
      query FiltrosDonacionUsuario {
        filtrosDonacionUsuario {
          idFiltroDonacion
          nombreFiltro
          categoria
          fechaHoraAltaDesde
          fechaHoraAltaHasta
          eliminado
        }
      }
    `
    return axios.post(
      `${Constants.BASE_URL_GRAPHQL}/graphql`,
      {
        query: query
      },
      {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Basic ${authToken}`,
        },
      }
    );
  }

  /**
   * Llama al resolver modificarFiltroDonacion(input)
   * @param {string} authToken 
   * @param {object} payload     
   */
  modificarFiltro(authToken, input) {
    const mutation = `
      mutation ModificarFiltroDonacion($input: FiltroDonacionInput!) {
        modificarFiltroDonacion(input: $input) {
          idFiltroDonacion
          nombreFiltro
          categoria
          fechaHoraAltaDesde
          fechaHoraAltaHasta
          eliminado
        }
      }
    `;
    return axios.post(
      `${Constants.BASE_URL_GRAPHQL}/graphql`,
      {
        query: mutation,
        variables: { input },
      },
      {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Basic ${authToken}`,
        },
      }
    );
  }
  /**
   * Llama al resolver eliminarFiltroDonacion(input)
   * @param {string} authToken 
   * @param {object} payload     
   */
  eliminarFiltro(authToken, idFiltroDonacion) {
    const query = `
      mutation {
        eliminarFiltroDonacion(idFiltroDonacion: ${idFiltroDonacion})
      }
    `;
    return axios.post(
      `${Constants.BASE_URL_GRAPHQL}/graphql`,
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
           Authorization: `Basic ${authToken}`,
        },
      }
    );
  }
}

export default new TransfersService();