import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Geolocation from "react-native-get-location";
import IconAnt from "react-native-vector-icons/AntDesign";
import CustomInput from "../../components/CustomInput";
import { useForm } from "../../hooks/useForm";
import { rMS, rS } from "../../styles/responsive";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  validateLengthDirección,
  validateLengthText,
} from "../../utils/Validations";
import ModalFotos from "../../components/ModalFotos";

export interface CreateClientValidator {
  cedulaError: string | undefined;
  nombreError: string | undefined;
  apellidoError: string | undefined;
  direccionError: string | undefined;
}

export const FormClientes = (props) => {
  const { save, cancel } = props;
  const [modalVisibleSelfie, setModalVisibleSelfie] = useState(false);
  const [imageSelfie, setImageSelfie] = useState<any>();
  const [title, settitle] = useState("");

  const objetoErrorInicial: CreateClientValidator = {
    cedulaError: "",
    nombreError: "",
    apellidoError: "",
    direccionError: "",
  };
  const [error, setError] = useState<CreateClientValidator>(objetoErrorInicial);
  const { form, onChange } = useForm({
    identificacionCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    direccion: "",
  });

  useEffect(() => {
    if (save === true) {
      saveInfoClient();
    }
  }, [save]);

  const saveInfoClient = async () => {
    // changeIsGlobalLoading(true);
    let objError: CreateClientValidator = {
      ...objetoErrorInicial,
    };
    setError(objError);
    let guardar = true;

    if (!form.nombreCliente || !form.apellidoCliente || !form.direccion) {
      !form.nombreCliente && (objError.nombreError = "Nombre es requerido");
      !form.apellidoCliente &&
        (objError.apellidoError = "Apellido es requerido");
      !form.direccion && (objError.direccionError = "Celular es requerido");
    }
    if (!validateLengthText(form.nombreCliente)) {
      objError.nombreError =
        "Longitud no válida, ingrese al menos 2 caracteres";
    }
    if (!validateLengthText(form.apellidoCliente)) {
      objError.apellidoError =
        "Longitud no válida, ingrese al menos 2 caracteres";
    }
    if (!validateLengthDirección(form.direccion)) {
      objError.direccionError =
        "Longitud no válida , ingrese al menos 5 digitos";
    }

    const errores = Object.values(objError).some((error) => error !== "");

    if (errores) {
      console.log("Errores");

      return;
    } else {
      try {
        console.log("Aquiiii");

        // Tomar Ubicacion Actual
        const location = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true, // Habilita alta precisión (GPS), si está disponible
          timeout: 15000, // Tiempo máximo para obtener la ubicación (en milisegundos)
        });

        const { latitude, longitude } = location;
        console.log("Latitud:", latitude);
        console.log("Longitud:", longitude);

        const datosGuardar = {
          identificacion: form.nombreCliente,
          nombres: form.apellidoCliente,
          apellidos: form.direccion,
          // latitud : latitude,
          // longitud : longitude
        };

        console.log("Datos Guardar::", datosGuardar);
      } catch (error) {}
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ paddingHorizontal: 10, top: rMS(5, 2) }}>
        <CustomInput
          value={form.identificacionCliente}
          placeholder="Identificación"
          onChangeText={(value) =>
            onChange(value.toUpperCase(), "identificacionCliente")
          }
          errorMessage={error.cedulaError}
          iconName="card-bulleted"
        />
        <CustomInput
          value={form.nombreCliente}
          placeholder="Nombre"
          onChangeText={(value) =>
            onChange(value.toUpperCase(), "nombreCliente")
          }
          errorMessage={error.nombreError}
          iconName="account"
        />
        <CustomInput
          value={form.apellidoCliente}
          placeholder="Apellido"
          onChangeText={(value) =>
            onChange(value.toUpperCase(), "apellidoCliente")
          }
          errorMessage={error.apellidoError}
          iconName="account"
        />
        <CustomInput
          value={form.direccion}
          placeholder="Dirección"
          onChangeText={(value) => onChange(value.toUpperCase(), "direccion")}
          errorMessage={error.direccionError}
          iconName="directions"
        />

        {/* <View
          style={{
            width: "100%",
            height: rMS(100),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: rS(20),
              backgroundColor: "red",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              height: rMS(47, 1),
            }}
          >
            <Text style={{ fontSize: rMS(16, 1), color: "#fff" }}>Crear</Text>
          </TouchableOpacity>
        </View> */}

        {/* Agregar Fotos */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            paddingVertical: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: "flex-start", paddingHorizontal: 2 }}>
              <Text style={styles.textFotos}>Fotos *</Text>
            </View>
            <View
              style={{
                width: "100%",
                height: rMS(100, 2),
                flexDirection: "row",
                backgroundColor: "red",
              }}
            >
              <View
                style={{
                  width: "94%",
                  height: "100%",
                  backgroundColor: "yellow",
                }}
              >
                {imageSelfie && imageSelfie.assets ? (
                  <TouchableOpacity
                    onPress={() => {
                      settitle("selfie");
                      setModalVisibleSelfie(true);
                    }}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Image
                      style={{
                        width: 70,
                        height: 70,
                        marginBottom: 5,
                        borderRadius: 10,
                      }}
                      source={
                        imageSelfie.assets
                          ? { uri: imageSelfie.assets[0].uri }
                          : require("../../assets/fondo.png")
                      }
                    />
                  </TouchableOpacity>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        settitle("Tienda/Local Comercial");
                        setModalVisibleSelfie(true);
                      }}
                      style={styles.border}
                    ></TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {modalVisibleSelfie && (
          <ModalFotos
            modalVisible={modalVisibleSelfie}
            closeModal={() => setModalVisibleSelfie(false)}
            title={title}
            setImage={setImageSelfie}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonRegistrateGratis: {
    borderRadius: rS(20),
    backgroundColor: "red",
    width: "70%",
    height: rMS(47, 1),
    justifyContent: "center",
    alignItems: "center",
  },
  iniciarSesin: {
    fontSize: rMS(16, 1),
    color: "#fff",
  },
  textFotos: {
    color: "#000",
    fontSize: 15,
    paddingVertical: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row", // Para alinear el texto e icono horizontalmente
    alignItems: "center", // Alinea el texto e icono verticalmente
  },
  border: {
    margin : 5,
    width: "90%",
    height: "90%",
    borderWidth: 1,
    borderColor: "black", 
    borderStyle: "dashed", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius : 10
  },
});
