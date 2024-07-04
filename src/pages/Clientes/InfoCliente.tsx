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
import { useNavigation } from "@react-navigation/native";

export const InfoCliente = (props: any) => {
  const detailCliente = props.route.params;
  const navigation = useNavigation<any>();

  const [openNewTask, setOpenNewTask] = useState(false);
  const [openNewPayment, setOpenNewPayment] = useState(false);
  

  const handleOrder = () => {
    navigation.navigate("NewOrder" , detailCliente );
    
  }

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.eventItem,
        { flexDirection: "row", borderColor: "#C0C0C0", borderBottomWidth: 1 },
      ]}
      //   onPress={() => handleSelectInfoCliente(item)}
    >
      <View
        style={{
          width: 1,
          height: "90%",
          top: 5,
          borderColor: "red",
          borderWidth: 1,
        }}
      ></View>
      <View style={[styles.eventItem, { flexDirection: "row" }]}>
        <View style={{ width: "80%" }}>
          <Text style={styles.eventTitle}>{item.fecha}</Text>
          <Text style={styles.eventSummary}>{item.tipoTarea}</Text>
        </View>
        {item.idTipoTarea == 1 && (
          <View
            style={{
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.eventTitle}>${item.saldo}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          height: rMS(50, 0.1),
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: rMS(16, 1) }}>DETALLE CLIENTE</Text>
      </View>
      <View
        style={{
          height: rS(140),
          flexDirection: "row",
        }}
      >
        <View style={{ width: "80%", height: "100%" }}>
          {/* Nombre */}
          <View
            style={{
              flexDirection: "row",
              height: rS(30),
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconMC name="account" size={rMS(20, 1)} color="#000" />
            </View>
            <View style={{ width: "90%", justifyContent: "center" }}>
              <Text style={{ fontSize: rMS(16, 2) }}>
                {detailCliente.nameClient}
              </Text>
            </View>
          </View>
          {/* Contacto */}

          <View
            style={{
              flexDirection: "row",
              height: rS(30),
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconMC name="phone" size={rMS(20, 1)} color="#000" />
            </View>
            <View style={{ width: "90%", justifyContent: "center" }}>
              <Text style={{ fontSize: rMS(16, 2) }}>
                {detailCliente.contacto}
              </Text>
            </View>
          </View>
          {/* Ciudad */}

          <View
            style={{
              flexDirection: "row",
              height: rS(30),
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconMC name="map-marker-radius" size={rMS(20, 1)} color="#000" />
            </View>
            <View style={{ width: "90%", justifyContent: "center" }}>
              <Text style={{ fontSize: rMS(16, 2) }}>
                {detailCliente.ciudad}
              </Text>
            </View>
          </View>
          {/* Dirección */}

          <View
            style={{
              flexDirection: "row",
              height: rS(50),
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconMC name="directions" size={rMS(20, 1)} color="#000" />
            </View>
            <View style={{ width: "90%", justifyContent: "center" }}>
              <Text style={{ fontSize: rMS(16, 2) }}>
                {detailCliente.direccion.length > 50
                  ? `${detailCliente.direccion.substring(0, 50)}...`
                  : detailCliente.direccion}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: "20%",
            height: "100%",
          }}
        >
          <View
            style={{
              height: "70%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconMC name="account-cash" size={rMS(26, 1)} color="red" />
            <Text style={{ fontSize: rMS(16, 1) }}>
              $ {detailCliente.saldo}
            </Text>
          </View>
          {/* View Ubication  */}
          <View
            style={{
              height: "40%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <View style={{ borderBottomWidth: 1, borderBottomColor: "red" }}>
                <Text style={{ fontSize: rMS(13, 1) }}>Ubicación</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "#FFE8E8",
          width: "100%",
          height: rS(70),
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setOpenNewTask(true)}>
            <IconMC name="calendar-month" size={rMS(40, 1)} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setOpenNewPayment(true)}>
            <IconMC name="cash-fast" size={rMS(40, 1)} color="#000" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleOrder}>
            <IconMC name="cart-variant" size={rMS(40, 1)} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.95 }}>
        <FlatList
          data={clientsVentasItem}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.eventsList}
        />
      </View>
      {openNewTask && (
        <NewTask
          modalVisible={openNewTask}
          setModalVisible={setOpenNewTask}
          item={detailCliente}
        />
      )}
      {openNewPayment && (
        <NewPayment
          modalVisible={openNewPayment}
          setModalVisible={setOpenNewPayment}
          item={detailCliente}
        />
      )}
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
