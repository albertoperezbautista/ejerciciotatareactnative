import moment from "moment";
import "moment/locale/es";
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { timelineEvents } from "../../mocks/timelineEvents";
import { rMS, rS } from "../../styles/responsive";

export const ListaCalendar = (props) => {
  const { modalVisible, setModalVisible } = props;

  const handleClose = () => {
    setModalVisible(false);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const groupedEvents = timelineEvents.reduce((acc, event) => {
    const date = moment(event.start).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {});

  const renderEventItem = ({ item }) => (
    <View
      style={[
        styles.eventItem,
        { flexDirection: "row", borderColor: "#C0C0C0", borderTopWidth: 1 },
      ]}
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
      <View style={styles.eventItem}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventSummary}>{item.summary}</Text>
        <Text style={styles.eventTime}>
          Start: {moment(item.start).format("LT")}
        </Text>
        <Text style={styles.eventTime}>
          End: {moment(item.end).format("LT")}
        </Text>
      </View>
    </View>
  );

  const renderDateGroup = ({ item }) => (
    <View style={styles.dateContainer}>
      <Text style={styles.dateHeader}>
        {capitalizeFirstLetter(moment(item.date).format("dddd, LL"))}
      </Text>
      <FlatList
        data={item.events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.eventsList}
      />
    </View>
  );

  const groupedEventsArray = Object.keys(groupedEvents).map((date) => ({
    date,
    events: groupedEvents[date],
  }));

  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.login}>
          <View
            style={{
              width: '100%',
              height: rMS(50, 2),
              backgroundColor: "#fff",
              position: "absolute",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingHorizontal: 10,
                position: "absolute",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{
                    marginRight: 10,
                    backgroundColor: "red",
                    borderRadius: 100,
                    padding: 10,
                  }}
                >
                  <IconMC
                    name="format-list-bulleted"
                    size={rMS(20, 2)}
                    color="#fff"
                    onPress={handleClose}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: 10, borderRadius: 20, padding: 10 }}
                >
                  <Icon name="search1" size={rMS(20, 2)} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={{ borderRadius: 20, padding: 10 }}>
                  <Icon name="plus" size={rMS(20, 2)} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              top: rMS(60, 2),
              width: '95%',
              height: windowHeight - rMS(40, 2) - 50,
              position: "absolute",
            }}
          >
            <FlatList
              data={groupedEventsArray}
              renderItem={renderDateGroup}
              keyExtractor={(item) => item.date}
              contentContainerStyle={styles.eventsList}
            />
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
    fontSize: rMS(16 , 2),
    fontWeight: "bold",
    marginBottom: 5,
  },
  eventSummary: {
    fontSize: rMS(15 , 2),

    marginBottom: 5,
  },
  eventTime: {
    fontSize: rMS(13 , 2),

    color: "#888",
  },
  eventsList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});
