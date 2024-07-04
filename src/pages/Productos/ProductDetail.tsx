import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { clientsVentasItem } from "../../mocks/clientItems";
import { rMS, rS } from "../../styles/responsive";
import { DetailProducto } from "../Catalogo/DetailProducto";
import { eliminarProductoFinanciero } from "../../mocks/ProductList";
import { showAlert } from "../../components/Alerts";
import BottomAlert from "../../components/BottomAlert";

export const ProductDetail = (props: any) => {
  const productDetail = props.route.params;
  const navigation = useNavigation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteProduct = () => {
    setShowConfirmation(true); // Mostrar el modal de confirmación al presionar el botón "Eliminar"
  };

  const confirmDeleteProduct = () => {
    eliminarProductoFinanciero(productDetail?.id, 100);
    setShowConfirmation(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: rMS(60, 2),
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <Text style={{ fontSize: rMS(16, 1) }}>BANCO</Text>
      </View>

      <View
        style={{ width: "100%", height: rMS(80, 2), paddingHorizontal: 10 }}
      >
        <Text style={{ fontSize: rMS(25, 2) }}>ID: {productDetail?.id}</Text>
        <Text style={{ fontSize: rMS(12, 2) }}>Información Extra</Text>
      </View>
      <View style={{ width: "100%", height: rMS(300, 2) }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingVertical: 2,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontSize: rMS(18, 2) }}>Nombre:</Text>
            <Text style={{ fontSize: rMS(18, 2) }}>Deesc:</Text>
          </View>
          <View style={{ width: "80%" }}>
            <Text style={{ fontSize: rMS(18, 2) }}>{productDetail?.name}</Text>
            <Text style={{ fontSize: rMS(18, 2) }}>
              {productDetail?.description}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={{ fontSize: rMS(18, 2) }}>Logo</Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: rMS(120, 2),
            }}
          >
            <Image
              style={[styles.imagen, { borderRadius: 10 }]}
              source={require("../../assets/card.jpg")}
              resizeMode="contain"
            />
          </View>
          <View style={{ flexDirection: "row", width: "100%", padding: 20 }}>
            <View style={{ width: "60%" }}>
              <Text style={{ fontSize: rMS(18, 2) }}>Fecha liberación:</Text>
              <Text style={{ fontSize: rMS(18, 2) }}>Fecha revisión:</Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text style={{ fontSize: rMS(18, 2) }}>
                {productDetail?.date_release
                  ? new Date(productDetail.date_release).toLocaleDateString()
                  : ""}
              </Text>
              <Text style={{ fontSize: rMS(18, 2) }}>
                {productDetail?.date_revision
                  ? new Date(productDetail.date_release).toLocaleDateString()
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnAgregar}
        // onPress={() => setopenRegisterFree(true)}
      >
        <Text style={styles.txtAgregar}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnAgregar, { backgroundColor: "red", top: 10 }]}
        onPress={() => handleDeleteProduct()}
      >
        <Text style={[styles.txtAgregar, { color: "#fff" }]}>Eliminar</Text>
      </TouchableOpacity>
      {
        <BottomAlert
          isVisible={showConfirmation}
          message="¿Estás seguro de que quieres eliminar este producto?"
          onConfirm={confirmDeleteProduct} // Función para confirmar la eliminación del producto
        />
      }
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
  imagen: {
    width: "80%",
    height: "80%",
  },
  btnAgregar: {
    top: rMS(5, 1),
    borderRadius: rS(20),
    backgroundColor: "#ccc",
    width: "96%",
    height: rMS(47, 1),
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  txtAgregar: {
    fontSize: rMS(16, 1),
    color: "#000",
  },
});
