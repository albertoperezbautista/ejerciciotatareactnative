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
  
  interface CreateInscripcionJugadorValidatorInterface {
    correoElectronicoError: string | undefined;
    passwordError: string | undefined;
    passwordRepeatError: string | undefined;
    errorIngreso: string | undefined;
  }
  
  export const RestartPassword = (props: any) => {
    const { modalVisible, setModalVisible } = props;
    const [text, setText] = useState("");
  
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
                title={"Registrate"}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
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
              source={require("../../assets/restarrpass2.png")}
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
                  fontSize: rMS(16, 2),
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                {" "}
                Ingresa los siguientes datos
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
  
            
            
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.iniciarSesin}>Restablecer Contraseña</Text>
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
      top: rV(400),
      left: rS(65),
      borderRadius: rS(20),
      backgroundColor: "red",
      width: rS(223),
      height: rMS(47 , 1),
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
    iniciarSesin: {
      fontSize: rMS(16 , 1),
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
  