import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  moderateScale as rMS,
  scale as rS,
  verticalScale as rV,
} from "react-native-size-matters";
import { Color, FontFamily } from "./GlobalStyles";

import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import IconMc from "react-native-vector-icons/MaterialCommunityIcons";
import Regresar from "../../components/Regresar";
import { useForm } from "../../hooks/useForm";
import {
  CreateInscripcionJugadorValidatorInterface,
  RegisterFree,
} from "./RegisterFree";
import { showAlert, showAlertConfirmate } from "../../components/Alerts";
import { validateEmail, validateLengthPassword } from "../../utils/Validations";

import { UserContext } from "../../context/auth/UserContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../firebase/firebaseConfig";
import { User } from "../../interfaces/Usuario";
import { getUser } from "../../database";
import { validate } from "../../helpers/utils";
import { AuthContext } from "../../context/auth/AuthContext";

export const StartWithCredentials = (props: any) => {
  const { modalVisible, setModalVisible, statusConnect } = props;
  const navigation = useNavigation();
  const { isLogin , updateInfoUser } = useContext(UserContext);
  const { signIn, changeUser } = useContext(AuthContext);

  const [openRegister, setOpenRegister] = useState(false);

  const { form, onChange } = useForm({
    correoElectronico: "",
    password: "",
    passwordRepeat: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

  const objetoErrorInicial: CreateInscripcionJugadorValidatorInterface = {
    correoElectronicoError: "",
    passwordError: "",
    passwordRepeatError: "",
    errorIngreso: "",
  };
  const [error, setError] =
    useState<CreateInscripcionJugadorValidatorInterface>(objetoErrorInicial);

  const handleLoginOffline = async () => {
    const user = await getUser(form.correoElectronico);
    if (user && user.id_app === validate(form.password)) {
      console.log("Useeerrr", user);
      const datos = {
        idUsuario: user.id_usuario,
        emailUser: user.email,
        idApp: user.id_app,
        isLogin: true,
      };
      updateInfoUser(datos)
    } else {
      showAlert("Usuario y/o contraseña incorrectos");
    }
  };

  const handleLogin = async () => {
    showAlert("Login Conectado");
    // changeIsGlobalLoading(true);

    setError(objetoErrorInicial);
    let tieneErrores = true;
    let objetoError: CreateInscripcionJugadorValidatorInterface = {
      ...objetoErrorInicial,
    };
    if (!form.correoElectronico || !form.password) {
      !form.correoElectronico &&
        (objetoError.correoElectronicoError =
          "Correo electrónico es requerido");
      !form.password && (objetoError.passwordError = "Contraseña es requerido");
    } else if (!validateEmail(form.correoElectronico.toLowerCase())) {
      objetoError.correoElectronicoError = "Correo electrónico no es correcto";
    }
    //TODO: Agregar más validaciónes a la contrasena
    else if (!validateLengthPassword(form.password)) {
      objetoError.passwordError = "Contraseña no válida";
    } else {
      tieneErrores = false;
      // const usuario: User | null | undefined = await logInWithEmailAndPassword(
      //   form.correoElectronico.toLowerCase(),
      //   form.password
      // );
      const auth = await getAuth(firebaseApp);

      try {
        await signInWithEmailAndPassword(
          auth,
          form.correoElectronico,
          form.password
        )
          .then((userCredential) => {
            // Inicio de sesión exitoso, puedes acceder a userCredential.user
            const user: User = userCredential.user;
            if (user) {
              // isLogin(true);
            }
          })
          .catch((error) => {
            // changeIsGlobalLoading(false);

            // Error en el inicio de sesión, muestra el mensaje de error
            const errorCode = error.code;
            const errorMessage = error.message;

            // console.error('Error al iniciar sesión:', error);
            // showAlert('Error al iniciar sesión, intente mas tarde 1')
            switch (errorCode) {
              case "auth/invalid-email":
                console.error("El correo electrónico no es válido.");
                showAlert("El correo electrónico no es válido.");
                break;
              case "auth/user-not-found":
                console.error("No se encontró ningún usuario con este correo.");
                showAlert("No se encontró ningún usuario con este correo.");
                break;
              case "auth/wrong-password":
                // console.error("La contraseña es incorrecta.");
                showAlert("La contraseña es incorrecta.");
                break;
              case "auth/network-request-failed":
                showAlert("Error al iniciar sesión, intente mas tarde");
                break;
              default:
                console.error("Error desconocido:", errorMessage);
                showAlert("Error al iniciar sesión, intente mas tarde.");
                break;
            }
          });
      } catch (error: any) {
        // changeIsGlobalLoading(false);

        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case "auth/invalid-email":
            console.error("El correo electrónico no es válido.");
            showAlert("El correo electrónico no es válido.");
            break;
          case "auth/user-not-found":
            console.error("No se encontró ningún usuario con este correo.");
            showAlert("No se encontró ningún usuario con este correo.");
            break;
          case "auth/wrong-password":
            console.error("La contraseña es incorrecta.");
            showAlert("La contraseña es incorrecta.");
            break;
          case "auth/network-request-failed":
            showAlert("Error al iniciar sesión, intente mas tarde");
            break;
          default:
            console.error("Error desconocido:", errorMessage);
            showAlert("Error al iniciar sesión, intente mas tarde 3");
            break;
        }
      }
    }
    if (tieneErrores) {
      setError(objetoError);
      // changeIsGlobalLoading(false);

      return;
    }
  };

  return (
    <View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.login}>
          <Image
            style={{
              height: rV(100),
              width: rS(350),
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            source={require("../../assets/fondo2.jpg")}
          />
          <View style={{ position: "absolute" }}>
            <Regresar
              // title={"Registrate"}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              colorReturn={"#fff"}
            />
          </View>
          <View style={styles.loginItem} />
          <Image
            style={{
              height: rMS(120, 2),
              width: rMS(200, 2),
              top: rV(90),
              position: "absolute",
            }}
            source={require("../../assets/frenec.png")}
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
          ></View>
          <View
            style={{
              position: "absolute",
              top: rV(310),
              width: rMS(240, 1),
              height: rMS(60, 2),
              justifyContent: "center",
            }}
          >
            <Input
              value={form.correoElectronico}
              placeholder="Correo electrónico"
              placeholderTextColor={"#000"}
              style={{ fontSize: rMS(18, 1) }}
              containerStyle={styles.inputForm}
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
              top: rV(380),
              width: rMS(240, 1),
              height: rMS(60, 2),
              justifyContent: "center",
            }}
          >
            <Input
              value={form.password}
              placeholder="Contraseña"
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
              onChangeText={(value) => onChange(value, "password")}
              keyboardType="default"
              errorMessage={error.passwordError}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => {
          //   statusConnect === true
          //     ? handleLogin()
          //     : statusConnect === false && handleLoginOffline();
          // }}
          onPress={handleLoginOffline}
          // onPress={handleLogin}
        >
          <Text style={styles.iniciarSesin}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View
          style={{
            top: rV(550),
            position: "absolute",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text>
            <Text style={{ fontSize: rMS(15, 1) }}>No estas registrado?</Text>
            <Text>{"  "}</Text>
            <Text
              onPress={() => setOpenRegister(true)}
              style={{ fontSize: rMS(16, 1), color: "red", fontWeight: "bold" }}
            >
              Registrate
            </Text>
          </Text>
        </View>
      </Modal>
      {openRegister && (
        <RegisterFree
          modalVisible={openRegister}
          setModalVisible={setOpenRegister}
        />
      )}
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
    width: rS(320),
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
    top: rV(480),
    left: rS(65),
    borderRadius: rS(20),
    backgroundColor: "red",
    width: rS(223),
    height: rV(47),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  iniciarSesin: {
    fontSize: rMS(16, 1),
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
    backgroundColor: "000", // Color de la línea
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
