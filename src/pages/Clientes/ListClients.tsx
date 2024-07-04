import moment from "moment";
import "moment/locale/es";
import {
  Alert,
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
import { clientsItem } from "../../mocks/clientItems";
import { useNavigation } from "@react-navigation/native";
import { showAlertConfirmate } from "../../components/Alerts";

export const ListClients = (props) => {
  const { modalVisible, setModalVisible } = props;
  const navigation = useNavigation<any>();


  const { height, width } = Dimensions.get('window');


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

  const handleSelectInfoCliente = (item) => {
    
      navigation.navigate("InfoCliente" , item );
  };

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.eventItem,
        { flexDirection: "row", borderColor: "#C0C0C0", borderBottomWidth: 1 , },
      ]}
      onPress={() => handleSelectInfoCliente(item)}
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
        <Text style={styles.eventTitle}>{item.nameClient}</Text>
        <Text style={styles.eventSummary}>{item.ciudad}</Text>
        <Text style={styles.eventSummary}>{item.direccion}</Text>
        <Text style={styles.eventSummary}>{item.contacto}</Text>

        
      </View>
    </TouchableOpacity>
  );

 

 

 

  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.login}>
         
          <View
            style={{
              top: rMS(10, 2),
              width: '95%',
              height : height - rMS(230, 1),
              position: "absolute",
            }}
          >
            <FlatList
              data={clientsItem}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.key}
              contentContainerStyle={styles.eventsList}
            />
          </View>
        </View>
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
    fontSize: rMS(16 , 2),

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
