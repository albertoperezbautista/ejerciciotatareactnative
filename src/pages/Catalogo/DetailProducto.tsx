import "moment/locale/es";
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconIo from "react-native-vector-icons/Ionicons";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { rMS, rS, rV } from "../../styles/responsive";

import { useState } from "react";
import { Input } from "react-native-elements";
import { useForm } from "../../hooks/useForm";
import Regresar from "../../components/Regresar";

export const DetailProducto = (props) => {
  const { modalVisible, setModalVisible, item } = props;

  console.log("Producto Llegaaaaa:::", item);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.login}>
          <View
            style={{
              width: "100%",
              height: rMS(250, 0.5),
              backgroundColor: "red",
            }}
          >
            <ImageBackground
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
              }}
              source={require("../../assets/fondo.png")}
            >
              <View style={{ width: "100%", height: rMS(70, 0.5) }}>
                <Regresar
                  title={"Detalle Producto"}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                  colorReturn={"#fff"}
                  colorText={"#fff"}
                />
              </View>
            </ImageBackground>
          </View>
          <View style={{width : '100%' , height : rMS(90 , 2) , backgroundColor : 'red' , padding : 10}}>
              <Text style={{fontSize : rMS(16 , 2)}}>{item.codigoProducto}</Text>
              <Text style={{fontSize : rMS(16 , 2)}}>{item.descripcion}</Text>
              <Text style={{fontSize : rMS(16 , 2)}}>{item.precioUnitario}</Text>
          </View>   
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  login: {
    flex: 1,
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
});
