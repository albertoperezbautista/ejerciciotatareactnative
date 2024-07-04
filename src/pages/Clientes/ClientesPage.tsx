import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { rMS } from "../../styles/responsive";

import { useState } from "react";
import { Dimensions } from "react-native";

import { Buscar } from "../../components/Buscar";
import { lightThemeColor } from "../../mocks/theme";
import { ListClients } from "./ListClients";
import { ListClientsPotenciales } from "./ListClientsPotenciales";
import { NewCalendarList } from "react-native-calendars";
import { NewClient } from "./NewClient";

const ClientesPage = () => {
  const [selectClientes, setSelectClientes] = useState(true);
  const [selectPotenciales, setSelectPotenciales] = useState(false);
  const [openCreateNewClient, setOpenCreateNewClient] = useState(false);

  const { height, width } = Dimensions.get("window");

  const handleSelectClientes = () => {
    setSelectClientes(true);
    setSelectPotenciales(false);
  };

  const handleSelectPotenciales = () => {
    setSelectClientes(false);
    setSelectPotenciales(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.login}>
        <View
          style={{
            // width: rS(350),
            width: "100%",
            height: rMS(60, 2),
            position: "absolute",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "80%",
              justifyContent: "center",
            }}
          >
            <Buscar />
          </View>
          <View
            style={{
              width: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => setOpenCreateNewClient(true)}
            >
              <IconMC name="account-plus" size={rMS(25, 2)} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Pestañas Seleccion Clientes/Potenciales */}
        <View
          style={{
            top: rMS(60, 2),
            // width: rS(350),
            width: "100%",

            height: rMS(50, 2),
            position: "absolute",
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
                  borderColor: "#ccc",
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
                  borderColor: "#ccc",
                  width: "90%",
                  top: rMS(3, 2),
                }}
              ></View>
            )}
          </TouchableOpacity>
        </View>
        {/* Visualizar Clientes */}
        <View
          style={{
            top: rMS(110, 2),
            // width: rS(350),
            width: "100%",
            // height: rMS(400 , 2),
            height: height - rMS(230, 1),
            position: "absolute",
            flexDirection: "row",
            backgroundColor: "green",
          }}
        >
          {selectClientes ? <ListClients /> : <ListClientsPotenciales />}
        </View>
      </View>
      {openCreateNewClient && (
        <NewClient
          modalVisible={openCreateNewClient}
          setModalVisible={setOpenCreateNewClient}
        />
      )}
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
    width: "100%",
    height: "70%",
    alignItems: "center",
    overflow: "hidden",
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
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  arrow: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  weekDay: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  list: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default ClientesPage;
