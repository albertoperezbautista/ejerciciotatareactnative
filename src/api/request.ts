import axios, { AxiosRequestConfig } from "axios";
// import Swal from 'sweetalert2';

const axiosInstance = axios.create({ 
  timeout: 60000,
  baseURL: 'http://192.168.3.227:3000/api/'
  
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config?.data;
  },
  (error) => {
    let errorMessage = "Algo salió mal";

    if (error?.message?.includes("Network Error")) {
      errorMessage = "ERROR EN LA RED";
    } else {
      errorMessage = error.response.data.message;
    }
    return {
      message: errorMessage,
      result: null,
    };
  }
);

export type Method = "get" | "post" | "put" | "delete";

export type MyResponse<T = any> = Promise<T>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */

export const request = async <T = any>(
  method: Method,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): MyResponse<T> => {
  console.log("SERVICIO url:::: ", url);
  console.log("SERVICIO data:::: ", data);
  console.log("SERVICIO config:::: ", config);

  if (method === "post") {
    const resp: MyResponse<T> | any = await axiosInstance.post(
      url,
      data,
      config
    );
    return resp;
  } else if (method === "put") {
    const resp: MyResponse<T> | any = await axiosInstance.put(
      url,
      data,
      config
    );
    return resp;
  } else if (method === "delete") {
    // Manejo de solicitud DELETE
    const resp: MyResponse<T> | any = await axiosInstance.delete(url, config);
    return resp;
  } else {
    const resp: MyResponse<T> | any = await axiosInstance.get(url, {
      params: data,
      ...config,
    });
    return resp;
  }
};

