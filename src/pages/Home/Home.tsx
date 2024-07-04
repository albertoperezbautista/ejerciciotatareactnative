import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { rMS, rS } from "../../styles/responsive";

import { useState } from "react";
import { AddTask } from "./AddTask";
import ExpandableCalendarScreen from "./ExpandableCalendarScreen";
import { ListaCalendar } from "./ListaCalendar";
import { Dimensions } from "react-native";

type Event = {
  name: string;
};

type Items = {
  [key: string]: Event[];
};

function Home({ navigation }: any) {
  const [openListTask, setOpenListTask] = useState(false);
  const [openNewTask, setOpenNewTask] = useState(false);
  const { height, width } = Dimensions.get('window');
  const handleSearchPress = () => {
    setOpenListTask(true);
  };



  return (
    <SafeAreaView style={styles.container}>
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
              <TouchableOpacity style={{ marginRight: 10, padding: 10 }}>
                <IconMC
                  name="format-list-bulleted"
                  size={rMS(20, 2)}
                  color="#000"
                  onPress={handleSearchPress}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 10, padding: 10 }}>
                <Icon name="search1" size={rMS(20, 2)} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => setOpenNewTask(true)}
              >
                <Icon name="plus" size={rMS(20, 2)} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            top: rMS(60, 2),
            // width: rS(340),
            width : '100%',
            height: rMS(450, 2),
            position: "absolute",
          }}
        >
          <ExpandableCalendarScreen />

        </View>
      </View>

      {openListTask && (
        <ListaCalendar
          modalVisible={openListTask}
          setModalVisible={setOpenListTask}
        />
      )}
      {openNewTask && (
        <AddTask modalVisible={openNewTask} setModalVisible={setOpenNewTask} />
      )}
    </SafeAreaView>
  );
}

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

export default Home;
