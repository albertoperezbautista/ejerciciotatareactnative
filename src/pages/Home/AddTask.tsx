import "moment/locale/es";
import {
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { rMS, rS } from "../../styles/responsive";

export const AddTask = (props) => {
  const { modalVisible, setModalVisible } = props;

  const handleClose = () => {
    setModalVisible(false);
  };

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
              width: rS(350),
              height: rMS(50, 2),
              position: "absolute",
              backgroundColor: "#000",
            }}
          >
            <View
              style={{
                top: rS(10),
                left: rS(15),
                width: rS(320),
                height: rMS(25, 2),
                borderRadius: 15,
                backgroundColor: "#C0C0C0",
                position: "absolute",
              }}
            ></View>
            <View
              style={{
                top: rS(18),
                width: rS(350),
                height: rMS(50, 2),
                position: "absolute",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "33%",
                  backgroundColor: "#DFDFDF",
                  borderTopLeftRadius: 10,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity style={{ marginRight: 10, padding: 10 }} onPress={()=> setModalVisible(false)}>
                  <Text style={{ fontSize: rMS(16, 1), color: "red", fontWeight : '300'}}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "34%",
                  backgroundColor: "#DFDFDF",
                  justifyContent: "center",
                  alignItems : 'center'
                }}
              >
                <Text style={{ fontSize: rMS(16, 1), color: "#000" }}>
                  Nueva Tarea
                </Text>
              </View>
              <View
                style={{
                  width: "33%",
                  backgroundColor: "#DFDFDF",
                  borderTopRightRadius: 10,
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity style={{ marginRight: 10, padding: 10 }}>
                  <Text
                    style={{
                      fontSize: rMS(16, 1),
                      color: "red",
                      fontWeight: "400",
                    }}
                  >
                    Agregar
                  </Text>
                </TouchableOpacity>
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
