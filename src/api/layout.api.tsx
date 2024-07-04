import { AxiosRequestConfig } from "axios";

import { Method, request } from "./request";
import {
  DataResult,
  DataResultOne,
  PageData,
} from "../interfaces/layout/component.interface";

export const getDataListGeneric = async (servicio) => {
  const config: AxiosRequestConfig = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "content-Type": "application/json",
    },
  };

  // const respuesta = await request<PageData<DataResult>>(
  const respuesta = await request<PageData<any>>(
    "get",
    `/${servicio}`,
    {},
    config
  );
  return respuesta;
};

export const getInfoPersona = async (servicio) => {
  const config: AxiosRequestConfig = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "content-Type": "application/json",
    },
  };

  // const respuesta = await request<PageData<DataResult>>(
  const respuesta = await request<DataResultOne>(
    "get",
    `/${servicio}`,
    {},
    config
  );
  return respuesta;
};

export const updateDataGeneric = async (obj: any, peticion: Method) => {
  // const ligaSelect = localStorage.getItem('ligaSelect');
  const servicio = obj.servicio;
  console.log("serviciollega", servicio);

  const data = obj.data;

  // const token = await localStorage.getItem('token');

  const config: AxiosRequestConfig = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "content-Type": "application/json",
      // ligaSelect: `${ligaSelect}`,
    },
  };

  const respuesta = await request<DataResult>(
    peticion,
    `/${servicio}`,
    data,
    config
  );

  console.log("respuesta servicioPost:::: ", respuesta);

  return respuesta;
};

export const createDataGeneric = async (obj: any) => {
  console.log("PARAMETERS CREATE SERVICE:: ", obj);

  const servicio = obj.servicio;
  const data = obj.data;

  // const ligaSelect = localStorage.getItem('ligaSelect');
  // const token = await localStorage.getItem('token');

  const config: AxiosRequestConfig = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "content-Type": "application/json",
      // ligaSelect: `${ligaSelect}`,
    },
  };

  const respuesta = await request<PageData<DataResult>>(
    "post",
    `/${servicio}`,
    data,
    config
  );

  console.log("respuesta servicioPost:::: ", respuesta);

  return respuesta;
};

export const deleteDataGeneric = async (servicio) => {
  const config: AxiosRequestConfig = {
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "content-Type": "application/json",
    },
  };

  // const respuesta = await request<PageData<DataResult>>(
  const respuesta = await request<PageData<any>>(
    "delete",
    `/${servicio}`,
    {},
    config
  );
  console.log("Respuesta:::", respuesta);

  return respuesta;
};
