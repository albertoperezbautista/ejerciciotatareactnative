import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import { useForm } from "../../hooks/useForm";
import { rMS, rS } from "../../styles/responsive";
import CustomTextArea from "../../components/CustomTextArea";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  validateLengthDirección,
  validateLengthText,
} from "../../utils/Validations";
import { Method } from "../../api/request";
import { showAlert } from "../../components/Alerts";
import { updateDataGeneric } from "../../api/layout.api";

export const FormPotencialClient = (props) => {
  const { save, cancel } = props;

  const objetoErrorInicial: any = {
    identificacionCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    direccion: "",
  };
  const [error, setError] = useState<any>(objetoErrorInicial);
  const { form, onChange } = useForm({
    identificacionCliente: "",
    nombreCliente: "",
    apellidoCliente: "",
    direccion: "",
  });
  const [comment, setComment] = useState("");
  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  useEffect(() => {
    if (save === true) {
      saveInfoClient();
    }
  }, [save]);

  const saveInfoClient = async () => {
    // changeIsGlobalLoading(true);

    let objError: any = {
      ...objetoErrorInicial,
    };
    setError(objError);
    let guardar = true;

    if (!form.nombreCliente || !form.apellidoCliente || !form.direccion) {
      !form.nombreCliente && (objError.nombreError = "Nombre es requerido");
      !form.apellidoCliente &&
        (objError.apellidoError = "Apellido es requerido");

      !form.direccion && (objError.celularError = "Celular es requerido");
    }

    if (!validateLengthText(form.nombreCliente)) {
      objError.apellidoError =
        "Longitud no válida, ingrese al menos 2 caracteres";
    }

    if (!validateLengthText(form.apellidoCliente)) {
      objError.nombreError =
        "Longitud no válida, ingrese al menos 2 caracteres";
    }

    if (!validateLengthDirección(form.direccion)) {
      objError.direccionError =
        "Longitud no válida , ingrese al menos 5 digitos";
    }

    const errores = Object.values(objError).some((error) => error !== "");

    if (errores) {
      return;
    } else {
      const servicioEjecutar = `persona/createPersonApp`;

      const datosGuardar = {
        tipoId: form.nombreCliente,
        cedula: form.apellidoCliente,
        nombre: form.direccion,
      };
      const obj = {
        servicio: servicioEjecutar,
        data: datosGuardar,
      };

      try {
        let peticion: Method = "post";

        const resp = await updateDataGeneric(obj, peticion);
        const { message, data } = resp;
      } catch (error) {
        // changeIsGlobalLoading(false);

        showAlert("Algo sucedio, intente mas tarde");
      }
    }
  };

  return (
    // <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={200}
    >
      <View style={{ paddingHorizontal: 10, top: rMS(5, 2) }}>
        <CustomInput
          value={form.nombreCliente}
          placeholder="Nombre Empresa/Local"
          onChangeText={(value) =>
            onChange(value.toUpperCase(), "nombreCliente")
          }
          errorMessage={error.nombreCliente}
          iconName="store"
        />

        <CustomInput
          value={form.direccion}
          placeholder="Dirección"
          onChangeText={(value) => onChange(value.toUpperCase(), "direccion")}
          errorMessage={error.direccion}
          iconName="directions"
        />
        <CustomInput
          value={form.direccion}
          placeholder="Descripción"
          onChangeText={(value) => onChange(value.toUpperCase(), "direccion")}
          errorMessage={error.direccion}
          iconName="directions-fork"
        />
        <CustomTextArea
          value={comment}
          placeholder="Ingresar Comentario..."
          onChangeText={handleCommentChange}
          errorMessage={comment.length > 100 ? "Máximo 100 caracteres" : ""}
          containerStyle={styles.textAreaContainer}
          style={styles.textArea}
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
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
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
  textAreaContainer: {
    marginBottom: 20,
  },
  textArea: {
    height: 150, // Ajusta la altura según sea necesario
  },
});
