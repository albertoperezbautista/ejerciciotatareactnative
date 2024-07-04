import { Alert, FlatList, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { rMS, rS, rV } from "../../styles/responsive";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import IconIo from "react-native-vector-icons/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import { clientsItem, clientsVentasItem } from "../../mocks/clientItems";
import { useState } from "react";
import { NewTask } from "../Home/NewTask";
import { showAlertConfirmate } from "../../components/Alerts";
import { NewPayment } from "./NewPayment";
import { Buscar } from "../../components/Buscar";
import { CatalogoProducts } from "../Catalogo/CatalogoProducts";


export const NewOrder = (props: any) => {
  const detailCliente = props.route.params;

  const [openNewTask, setOpenNewTask] = useState(false);
  const [openNewPayment, setOpenNewPayment] = useState(false);
  const [openNewOrder, setOpenNewOrder] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: rMS(50, 0.1),

          marginBottom: 5,
          flexDirection: "row",
        }}
      >
        <View style={{ width: "15%" }}></View>
        <View
          style={{
            width: "70%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <Text style={{ fontSize: rMS(16, 1) }}>NUEVO PEDIDO</Text>
        </View>

        <View
          style={{
            width: "15%",
            justifyContent : 'center',
            alignItems : 'center'
         
          }}
        >
          <TouchableOpacity>
          <IconMC name="cart-variant" size={rMS(22, 1)} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      <Buscar />
      <View style={{ flex: 0.98, }}>
        <CatalogoProducts />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventItem: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: rMS(16, 2),
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventSummary: {
    fontSize: rMS(16, 2),

    marginBottom: 5,
  },
  eventTime: {
    fontSize: rMS(13, 2),

    color: "#888",
  },
  eventsList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});
