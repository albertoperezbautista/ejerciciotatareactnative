import {
  Alert,
  Image,
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
import { SafeAreaView } from "react-native";
import { RegisterFree } from "./RegisterFree";
import { RestartPassword } from "./RestartPassword";
import { StartWithCredentials } from "./StartWithCredentials";
import { useNetInfoInstance } from "@react-native-community/netinfo";
import { showAlert, showAlertConfirmate } from "../../components/Alerts";
import { ConnectContext } from "../../context/ConectivityContext";
import { DatabaseContext } from "../../context/DatabaseContext";

export const LoginScreen = ({ route }) => {
  const { statusConnect } = route.params;
  const navigation = useNavigation<any>();
  const [openModalStartWithCredentials, setopenModalStartWithCredentials] =
    useState(false);
  const [openRegisterFree, setopenRegisterFree] = useState(false);
  const [openRestartPassword, setopenRestartPassword] = useState(false);

  const { connectStateDataBase } = useContext(DatabaseContext);

  useEffect(() => {
    console.log("PRUEBACONECTIVIDAD::::", connectStateDataBase);
  }, [connectStateDataBase]);

  const handleLoginGoogle = () => {
    if (statusConnect === true) {
    } else if (statusConnect === false) {
      showAlert("Función no disponible, no estas conectado a internet");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.login}>
        <View style={{ width: rS(350), height: rMS(250, 1) }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/fondo4.jpg")}
          />
        </View>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            width: rS(350),
            height: rS(100),
            marginTop: rMS(220, 1),
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                fontSize: rMS(24, 1),
                fontWeight: "bold",
                color: "#000",
              }}
            >
              ! Bienvenido de vuelta ¡
            </Text>
            <Text style={{ fontSize: rMS(12, 1), fontWeight: "bold" }}>
              Inicia Sesión con Google o Registra tu cuenta Gratis
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonRegistrateGratis}
          onPress={() => setopenRegisterFree(true)}
        >
          <Text style={styles.iniciarSesin}>Registrate Gratis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRegistroGoogle}
          onPress={handleLoginGoogle}
        >
          <Text style={styles.iniciarSesin}>Continuar con Google</Text>
        </TouchableOpacity>
        <View
          style={{
            top: rMS(450, 1),
            width: "70%",
            height: rMS(47, 1),
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setopenModalStartWithCredentials(true)}
          >
            <Text style={styles.iniciarSesion}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderColor: "red",
              width: rMS(150, 1),
              marginTop: rMS(3, 1),
            }}
          ></View>
        </View>
        <View
          style={{
            top: "90%",
            width: rS(350),
            height: rMS(47, 1),
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.iniciarSesion}>Olvidaste tus contraseña, </Text>

            <TouchableOpacity onPress={() => setopenRestartPassword(true)}>
              <Text
                style={{
                  fontSize: rMS(16, 1),
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Recuperar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {openRegisterFree && (
        <RegisterFree
          modalVisible={openRegisterFree}
          setModalVisible={setopenRegisterFree}
        />
      )}
      {openModalStartWithCredentials && (
        <StartWithCredentials
          modalVisible={openModalStartWithCredentials}
          setModalVisible={setopenModalStartWithCredentials}
          statusConnect={statusConnect}
        />
      )}
      {
        <RestartPassword
          modalVisible={openRestartPassword}
          setModalVisible={setopenRestartPassword}
        />
      }
    </SafeAreaView>
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
    top: rV(180),
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: rV(4),
    },
    shadowRadius: rS(10), // Aumenta el radio de la sombra
    elevation: rS(10), // Aumenta la elevación para una sombra más pronunciada
    shadowOpacity: 1,
    borderRadius: rS(40),
    width: rS(280),
    height: rV(450),
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
  buttonRegistrateGratis: {
    top: rMS(330, 1),
    borderRadius: rS(20),
    backgroundColor: "red",
    width: "70%",
    height: rMS(47, 1),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRegistroGoogle: {
    top: rMS(390, 1),
    borderRadius: rS(20),
    backgroundColor: "red",
    width: "70%",

    height: rMS(47, 1),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIniciarSesión: {
    top: rMS(450, 1),
    left: rS(115),
    width: rS(120),
    height: rMS(47, 1),
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "red",
  },
  iniciarSesin: {
    fontSize: rMS(16, 1),
    color: Color.colorWhite,
  },
  iniciarSesion: {
    fontSize: rMS(16, 1),
    color: Color.colorBlack,
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
});

export default LoginScreen;
