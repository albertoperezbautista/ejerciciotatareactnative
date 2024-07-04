import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import {
  moderateScale as rMS,
  scale as rS,
  verticalScale as rV,
} from "react-native-size-matters";
import { FontFamily, Color } from "./GlobalStyles";

import { SafeAreaView } from "react-native";
import { useForm } from "../../hooks/useForm";
import { useEffect, useRef, useState } from "react";
import { Input } from "react-native-elements";
import Config from "../../utils/Config";
import { useNavigation } from "@react-navigation/native";
import Regresar from "../../components/Regresar";
import Icon from "react-native-vector-icons/Ionicons";
import IconMc from "react-native-vector-icons/MaterialCommunityIcons";
import { showAlert, showAlertConfirmate } from "../../components/Alerts";
import { validateEmail, validateLengthPassword } from "../../utils/Validations";
import { getDataListGeneric, updateDataGeneric } from "../../api/layout.api";
import { Method } from "../../api/request";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebase/firebaseConfig";

export interface CreateInscripcionJugadorValidatorInterface {
  correoElectronicoError: string | undefined;
  passwordError: string | undefined;
  passwordRepeatError: string | undefined;
  errorIngreso: string | undefined;
}

export const RegisterFree = (props: any) => {
  const { modalVisible, setModalVisible } = props;
  const [openModalCode, setopenModalCode] = useState(false);
  

  //
  const objetoErrorInicial: CreateInscripcionJugadorValidatorInterface = {
    correoElectronicoError: "",
    passwordError: "",
    passwordRepeatError: "",
    errorIngreso: "",
  };
  const [error, setError] =
    useState<CreateInscripcionJugadorValidatorInterface>(objetoErrorInicial);

  const { form, onChange } = useForm({
    correoElectronico: "",
    password: "",
    passwordRepeat: "",
  });

  const [hidePassword, setHidePassword] = useState(true);

  const handleRegister = () => {
      let objError: CreateInscripcionJugadorValidatorInterface = {
        ...objetoErrorInicial,
      };
      setError(objError);
      let guardar = true;
  
      if (!form.correoElectronico || !form.password || !form.passwordRepeat) {
        !form.correoElectronico &&
          (objError.correoElectronicoError = "Correo electrónico es requerido");
        !form.password && (objError.passwordError = "Contraseña es requerido");
        !form.passwordRepeat &&
          (objError.passwordRepeatError = "Repita contraseña es requerido");
  
        setError(objError);
  
        return;
      } else if (form.password !== form.passwordRepeat) {
        objError.passwordRepeatError = "Contraseñas no coiciden";
        setError(objError);
        return;
      } else if (!validateEmail(form.correoElectronico.toLowerCase())) {
        objError.correoElectronicoError = "Correo electrónico no es correcto";
      } else if (!validateLengthPassword(form.password)) {
        objError.passwordError = "Contraseña no válida";
        return;
      }
  
      const errores = Object.values(objError).some((error) => error !== "");
      if (errores) {
        return;
      }
  
      const datosPersona = {
        correo: form.correoElectronico,
        password: form.password,
        passwordRepeat: form.passwordRepeat,
      };
  
      if (datosPersona) {
        showAlertConfirmate("Avanzar")
        // setopenModalCode(true);
        saveFirebase();

      }
  }


  const saveFirebase = async () => {
    const auth = getAuth(firebaseApp);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${form.correoElectronico}`,
        `${form.password}`
      );
      const user = userCredential.user;
      validateLoginEmail(userCredential);
    } catch (error: any) {
      // setloalModal(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      // changeIsGlobalLoading(false);

      switch (errorCode) {
        case "auth/invalid-email":
          console.error("Firebase : El correo electrónico no es válido.");

          break;
        case "auth/email-already-in-use":
          console.error("El correo electrónico ya está en uso.");
          break;
        case "auth/weak-password":
          console.error(
            "La contraseña es débil, debe tener al menos 6 caracteres."
          );
          break;
        default:
          console.error("Error desconocido:", errorMessage);
          break;
      }
    }
  };

  const validateLoginEmail = async (usuario: any) => {
    const { _tokenResponse, user } = usuario;
    const datosValidar = {
      email: form.correoElectronico,
      uid: user?.uid,
      proveedor: "CORREO",
      pass: form.password,
    };
    const servicio = `usuario/searchEmail/${_tokenResponse?.email}`;
    const resp = await getDataListGeneric(servicio);
    const { message, data } = resp;
    if (message === "OK" && data !== null) {
      const servicio = `usuario/searchEmail/${_tokenResponse?.email}/${user?.uid}`;
      const resp = await getDataListGeneric(servicio);
      const { message, data } = resp;
      if (message === "OK") {
        if (data?.length > 0) {

          // setModalPadre();
          
          await loginSuccesfull(form.correoElectronico, form.password);
        } else {

          saveProveedor(datosValidar);
        }
      }
    } else {
      saveUser(datosValidar);
    }
  };

  const loginSuccesfull = async (email, pass) => {
    const auth = getAuth(firebaseApp);

    try {
      signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
        if (userCredential) {
          // isLogin(true);
          showAlertConfirmate("Login Exitosoo")
        }
      });
    } catch (error) {
      showAlert("Error al iniciar sesión, intente mas tarde");
    }
  };

  const saveProveedor = async (datosGuardar: any) => {
    let servicioEjecutar = `usuario/createProveedor`;

    const obj = {
      servicio: servicioEjecutar,
      data: datosGuardar,
    };
    let peticion: Method = "post";
    const resp = await updateDataGeneric(obj, peticion);
    const { message, data } = resp;
    if (message === "OK") {
      // setModalPadre();

      await loginSuccesfull(form.correoElectronico, form.password);
    } else {
      // changeIsGlobalLoading(false);
    }
  };

  const saveUser = async (datosGuardar: any) => {
    //PRIMERO VALIDAR SI YA EXISTE EL USUARIO, EN CASO DE QUE YA EXISTA
    // SOLO CREAR EL PROVEDOR, Y SI NO EXISTE CREAR
    const servicio = `usuario/searchEmail/${datosGuardar?.email}`;
    const resp = await getDataListGeneric(servicio);
    const { message, data } = resp;
    if (message === "OK" && data !== null) {
      const servicio = `usuario/searchEmail/${datosGuardar?.email}/${datosGuardar?.uid}`;
      const resp = await getDataListGeneric(servicio);
      const { message, data } = resp;
      if (message === "OK") {
        if (data?.length > 0) {
          // setModalPadre();

          
          await loginSuccesfull(form.correoElectronico, form.password);
        } else {
          saveProveedor(datosGuardar);
        }
      }
    } else {
      let servicioEjecutar = `usuario/app`;
      const obj = {
        servicio: servicioEjecutar,
        data: datosGuardar,
      };
      let peticion: Method = "post";
      const resp = await updateDataGeneric(obj, peticion);
      const { message, data } = resp;
      if (message === "OK") {
        if (data) {
          // setModalPadre();
          await loginSuccesfull(form.correoElectronico, form.password);

        }
      } else {
        // changeIsGlobalLoading(false);

        showAlert("Algo sucedio, intente mas tarde");
      }
    }
  };
 

  return (
    <View>
      <Modal visible={modalVisible} onRequestClose={() => {}}>
        <View style={styles.login}>
          <Image
            style={{
              height: rV(100),
              width: rS(350),
            }}
            source={require("../../assets/fondo2.jpg")}
          />
          <View style={{ position: "absolute" }}>
            <Regresar
              // title={"Registrate"}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              colorReturn={'#fff'}
            />
          </View>
          <View style={styles.loginItem} />
          <Image
            style={{
              height: rMS(120, 2),
              width: rMS(120, 2),
              top: rV(90),
              position: "absolute",
            }}
            source={require("../../assets/userFrenec.png")}
          />

          <View
            style={{
              position: "absolute",
              top: rV(230),
              width: rMS(260, 1),
              height: rMS(40, 2),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: rMS(20, 2),
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {" "}
              Ingresa tus datos
            </Text>
          </View>

          <View
            style={{
              position: "absolute",
              width: rMS(280, 1),
              marginTop: rV(300),
            }}
          >
            <Input
              value={form.correoElectronico}
              placeholder="Correo electrónico"
              placeholderTextColor={"#000"}
              containerStyle={styles.inputForm}
              style={{ fontSize: rMS(18, 1) }}
              rightIcon={
                <Icon size={rMS(20, 1)} name="at" style={styles.iconRight} />
              }
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(value) =>
                onChange(value.toLowerCase(), "correoElectronico")
              }
              keyboardType="email-address"
              errorMessage={error.correoElectronicoError}
            />
          </View>

          <View
            style={{
              position: "absolute",
              width: rMS(280, 1),
              marginTop: rV(370),
            }}
          >
            <Input
              value={form.password}
              placeholder="Contraseña"
              placeholderTextColor={"#000"}
              secureTextEntry={hidePassword}
              style={{ fontSize: rMS(18, 1) }}
              containerStyle={styles.inputForm}
              rightIcon={
                <IconMc
                  name={hidePassword ? "eye-outline" : "eye-off-outline"}
                  size={rMS(20, 1)}
                  style={hidePassword ? styles.iconRight : { color: "#000" }}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(value) => onChange(value, "password")}
              keyboardType="default"
              errorMessage={error.passwordError}
            />
          </View>

          <View
            style={{
              position: "absolute",
              width: rMS(280, 1),
              marginTop: rV(440),
            }}
          >
            <Input
              value={form.passwordRepeat}
              placeholder="Repetir Contraseña"
              placeholderTextColor={"#000"}
              style={{ fontSize: rMS(18, 1) }}
              secureTextEntry={hidePassword}
              containerStyle={styles.inputForm}
              rightIcon={
                <IconMc
                  name={hidePassword ? "eye-outline" : "eye-off-outline"}
                  size={rMS(20, 1)}
                  style={hidePassword ? styles.iconRight : { color: "#000" }}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(value) => onChange(value, "passwordRepeat")}
              keyboardType="default"
              errorMessage={error.passwordRepeatError}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.iniciarSesin}>Crear Cuenta</Text>
        </TouchableOpacity>
      </Modal>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  iniciarSesinTypo: {
    fontFamily: FontFamily.myanmarSansPro,
    position: "absolute",
  },
  loginChild: {
    position: "absolute",
  },

  loginItem: {
    top: rV(70),
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: rV(4),
    },
    shadowRadius: rS(10), // Aumenta el radio de la sombra
    elevation: rS(10), // Aumenta la elevación para una sombra más pronunciada
    shadowOpacity: 1,
    borderRadius: rS(40),
    width: rS(330),
    height: rV(570),
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 2, // Añade un borde
    borderColor: "rgba(0, 0, 0, 0.1)", // Color del borde
  },
  noEstasRegistrado: {
    fontSize: rS(15),
    color: "#000",
  },
  text: {
    fontSize: rS(15),

    color: Color.colorWhite,
  },
  registrate: {
    fontSize: rS(15),

    color: "red",
  },
  noEstasRegistradoContainer: {
    alignItems: "center",
    top: rV(200),
    fontSize: rMS(15),
  },
  button: {
    top: rV(550),
    left: rS(65),
    borderRadius: rS(20),
    backgroundColor: "red",
    width: rS(223),
    height: rMS(47, 1),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  iniciarSesin: {
    fontSize: rMS(18, 1),
    color: Color.colorWhite,
  },
  frenecIcon: {
    top: rV(180),
    width: rS(146),
    height: rV(140),
    position: "absolute",
  },
  login: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    overflow: "hidden",
  },
  searchInput: {
    width: 210,
    height: 50,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    fontFamily: "WorkSans-SemiBold",
    letterSpacing: 0.3,

    color: "#000",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  inputContainer: {
    width: rS(240),
    justifyContent: "center",
  },
  textInput: {
    fontSize: rMS(18),
    color: "#B5B2B2",
  },
  line: {
    height: rV(1), // Altura de la línea
    backgroundColor: "#B5B2B2", // Color de la línea
    marginTop: rV(-5),
    width: "95%", // La línea ocupará todo el ancho del inputContainer
  },
  inputForm: {
    width: "100%",

    marginTop: 3,
  },
  iconRight: {
    color: "#000",
  },
});
