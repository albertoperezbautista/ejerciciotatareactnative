import "moment/locale/es";
import {
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

import { CustomDropDown } from "../../components/CustomDropDown";
import InputCalendar from "../../components/InputCalendar";
import InputHour from "../../components/InputHour";

export const NewTask = (props) => {
  const { modalVisible, setModalVisible, item } = props;

  console.log("Agendarrrrrrrrrrrr:::", item);

  const handleClose = () => {
    setModalVisible(false);
  };

  const data = [
    { label: "VENTA", value: "1" },
    { label: "COBRANZA", value: "2" },
    { label: "VISITA", value: "3" },
  ];
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
              height: rMS(50, 2),
              top: rS(25),
              position: "absolute",
              backgroundColor: "#000",
            }}
          >
            <View
              style={{
                top: rS(10),
                width: "90%",
                left: "5%",
                height: rMS(25, 2),
                borderRadius: 15,
                backgroundColor: "#C0C0C0",
                alignItems: "center",
                alignContent: "center",
              }}
            ></View>
            {/* Cabecera */}

            <View
              style={{
                top: rS(18),
                width: "100%",
                height: rMS(50, 2),
                position: "absolute",
                flexDirection: "row",
                backgroundColor: "#DFDFDF",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <View
                style={{
                  width: "28%",
                  backgroundColor: "#DFDFDF",
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
                  backgroundColor: "#DFDFDF",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: rMS(16, 1), color: "#000" }}>
                  Nueva Tarea
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
                  >
                    Aceptar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Información */}
            <View
              style={{
                top: rV(74),
                width: "100%",

                height: rMS(290, 2),
                backgroundColor: "#fff",
                position: "absolute",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: rMS(40, 2),
                  flexDirection: "row",
                  position: "absolute",
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
                <View style={{ width: "75%", justifyContent: "center" }}>
                  <Text style={{ fontSize: rMS(14, 2) }}>
                    {item.nameClient}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  top: rMS(40, 2),
                  width: "100%",
                  height: rMS(30, 2),
                  flexDirection: "row",
                  position: "absolute",
                }}
              >
                <View
                  style={{
                    width: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconIo
                    name="location-sharp"
                    size={rMS(20, 1)}
                    color="#000"
                  />
                </View>
                <View style={{ width: "75%", justifyContent: "center" }}>
                  <Text style={{ fontSize: rMS(14, 2) }}>{item.ciudad}</Text>
                </View>
              </View>

              <View
                style={{
                  top: rMS(80, 2),
                  width: "100%",
                  height: rMS(40, 2),
                  flexDirection: "row",
                  position: "absolute",
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
                <View style={{ width: "75%", justifyContent: "center" }}>
                  <Text style={{ fontSize: rMS(14, 2) }}>
                    {item.direccion.length > 50
                      ? `${item.direccion.substring(0, 50)}...`
                      : item.direccion}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  top: rMS(140, 2),
                  width: "100%",
                  height: rMS(30, 2),
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconMC
                    name="arrow-down-drop-circle-outline"
                    size={rMS(30, 2)}
                    color="red"
                    // onPress={handleSearchPress}
                  />
                </View>
              </View>

              <View
                style={{
                  top: rMS(180, 2),
                  width: "100%",
                  height: rMS(50, 2),
                  position: "absolute",
                  flexDirection: "row",

                  paddingHorizontal: 22,
                }}
              >
                <CustomDropDown datos={data} />
              </View>

              <View
                style={{
                  top: rMS(230, 2),
                  width: "100%",
                  height: rMS(50, 2),
                  position: "absolute",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <InputCalendar />
                </View>
                <View
                  style={{
                    width: "50%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <InputHour />
                </View>
              </View>
            </View>
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
});
