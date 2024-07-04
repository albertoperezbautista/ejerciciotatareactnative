import "moment/locale/es";
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { rMS, rS, rV } from "../../styles/responsive";

import { useMemo, useState } from "react";
import { RadioButtonOptions } from "../../components/RadioButtonOptions";
import CustomInput from "../../components/CustomInput";
import { useForm } from "../../hooks/useForm";
import { ScrollView } from "react-native";
import { FormClientes } from "./FormClientes";
import { FormPotencialClient } from "./FormPotencialClient";
import { showAlert } from "../../components/Alerts";
import { lightThemeColor } from "../../mocks/theme";


export const NewClient = (props) => {
  const { modalVisible, setModalVisible } = props;
  const [selectClientes, setSelectClientes] = useState(true);
  const [selectPotenciales, setSelectPotenciales] = useState(false);
  const [saveClient, setSaveClient] = useState(false)
  const [savePotencial, setSavePotencial] = useState(false)


  const handleSelectClientes = () => {
    setSelectClientes(true);
    setSelectPotenciales(false);
  };

  const handleSelectPotenciales = () => {
    setSelectClientes(false);
    setSelectPotenciales(true);
  };

 const handleSaveClient = () => {
  setSaveClient(true);
  setTimeout(() => setSaveClient(false), 0);
 }

 const handleSavePotencial = () => {
  setSavePotencial(true)
  setTimeout(() => setSavePotencial(false), 0);

 }
  



  return (
    <SafeAreaView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <TouchableWithoutFeedback >
          <View
            style={{ flex: 1, backgroundColor: "#000", alignItems: "center" }}
          >
            <View style={{ height: "3%" }}></View>
            <View
              style={{
                width: "92%",
                height: rMS(10, 2),
                backgroundColor: "#8A8A8A",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}
            ></View>
            {/* Cabecera */}
            <View
              style={{
                width: "100%",
                height: rMS(45, 2),
                backgroundColor: "#DFDFDF",
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "28%",
                  borderTopLeftRadius: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{ marginRight: 10, padding: 10 }}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      fontSize: rMS(16, 1),
                      color: "red",
                      fontWeight: "300",
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "44%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: rMS(16, 1), color: "#000" }}>
                  Nuevo Cliente
                </Text>
              </View>

              <View
                style={{
                  width: "28%",
                  backgroundColor: "#DFDFDF",
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity style={{ marginRight: 5, padding: 10 }}>
                  <Text
                    style={{
                      fontSize: rMS(16, 1),
                      color: "red",
                      fontWeight: "400",
                    }}
                    onPress={() => {
                      selectClientes ? handleSaveClient() : selectPotenciales && handleSavePotencial()
                    }}
                  >
                    Aceptar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Contenido Blanco */}
             <View
          style={{
            // width: rS(350),
            width: "100%",
            height: rMS(50, 2),
            flexDirection: "row",
            backgroundColor: lightThemeColor,

          }}
        >
          <TouchableOpacity
            onPress={handleSelectClientes}
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: rMS(15, 2), fontWeight: "600" }}>
              CLIENTES
            </Text>
            {selectClientes && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  width: "90%",
                  top: rMS(3, 2),
                }}
              ></View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSelectPotenciales}
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: rMS(15, 2), fontWeight: "600" }}>
              POTENCIALES
            </Text>
            {selectPotenciales && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "red",
                  width: "90%",
                  top: rMS(3, 2),
                }}
              ></View>
            )}
          </TouchableOpacity>
        </View>
            <View
              style={{
                width: "100%",
                height: rMS(550, 2),
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: rMS(5, 2),
                }}
              >
                {/* <RadioButtonOptions
                  options={options}
                  optionSelect={setOptionSelect}
                /> */}
              </View>
              <View style={{ flex: 0.95, padding: rMS(5, 2) }}>
                {selectClientes ? <FormClientes save={saveClient} cancel={() => setSaveClient(false)} /> : selectPotenciales && <FormPotencialClient save={savePotencial} />}
              </View>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    backgroundColor: "red",

    width: "100%",
    height: "70%",

    paddingHorizontal: 50,
  },
  inputContainer: {
    marginTop: 20,
  },
  login: {
    flex: 1,
    width: "100%",
    height: "70%",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  item: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  name: {
    fontSize: rMS(15, 1),
    color: "#000",
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateHeader: {
    fontSize: rMS(16, 1),
    fontWeight: "bold",
    marginBottom: 10,
  },
  eventItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventSummary: {
    fontSize: 14,
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 12,
    color: "#888",
  },
  eventsList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  text: {},
});
