import axios from 'axios';
import { showAlert, showAlertConfirmate } from '../components/Alerts';

const baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

export const obtenerProductosFinancieros = async (authorId?) => {
  try {
    const response = await axios.get(`${baseUrl}/bp/products`, {
      headers: {
        authorId: 100,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error al obtener los productos financieros:', error);
    throw error;
  }
};


export const guardarProductoFinanciero = async (formData) => {
  try {
    console.log('Datos a enviar:', formData); // Agrega este registro para verificar formData
    const response = await axios.post(`${baseUrl}/bp/products`, formData, {
      headers: {
        authorId: 100,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Resto del código...
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
    throw error;
  }
};


export const eliminarProductoFinanciero = async (idProducto, authorId) => {
  try {
    const response = await axios.delete(`${baseUrl}/bp/products?id=${idProducto}`, {
      headers: {
        authorId: authorId,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      showAlertConfirmate( 'El producto fue eliminado correctamente.');
      // Aquí podrías realizar alguna acción adicional, como navegar a otra pantalla o actualizar la lista de productos
    } else if (response.status === 404) {
      throw new Error('Producto no encontrado');
    } else {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    showAlert( 'No se pudo eliminar el producto.');
  }
};