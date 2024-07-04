import isEmpty from "lodash/isEmpty";
import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { rMS, rS } from "../styles/responsive";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { RescheduleTask } from "../pages/Home/RescheduleTask";


interface AgendaItemData {
  client?: string;
  duration?: string;
  fecha?: string;
  hour?: string;
  vendedor?: string;
  direccion?: string;
}

interface AgendaSection {
  fecha?: string;
  data?: AgendaItemData[];
}

const AgendaItem = (props: any) => {
  const { item } = props;
  const [openReagendarTarea, setOpenReagendarTarea] = useState(false)

  const buttonPressed = useCallback(() => {
    Alert.alert("Show me more");
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.client);
  }, [item]);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  console.log("Items", item);

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item}>
      <View
        style={{
          width: '100%',
          height: rS(60),
          borderBottomWidth: 1,
          borderBottomColor: "lightgrey",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <View
          style={{
            width: "68%",
            justifyContent: "center",
          }}
        >
          <Text style={styles.itemTitleText}>{item.client}</Text>
          <Text style={styles.itemTitleText}>{item.direccion}</Text>
        </View>
          <TouchableOpacity
          onPress={() => setOpenReagendarTarea(true)}
            style={{ width: "12%", height: "100%" , justifyContent : 'center' , alignItems : 'center'}}
          >
            <IconMC
              name="calendar-cursor"
              size={rMS(25, 2)}
              color="red"
              // onPress={handleSearchPress}
            />
          </TouchableOpacity>
      </View>
      {
        <RescheduleTask
          modalVisible={openReagendarTarea} 
          setModalVisible={setOpenReagendarTarea}
          item={item}
        />
      }
    </TouchableOpacity>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: rS(10),
    backgroundColor: "white",
    borderBottomColor: "lightgrey",
    flexDirection: "row",
  },
  itemHourText: {
    color: "black",
    fontSize: rMS(15, 1),
  },
  itemDurationText: {
    color: "#000",
    fontSize: rMS(15, 1),
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: rMS(15, 1),
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: '"lightgrey"',
    fontSize: 14,
  },
});
