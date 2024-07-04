import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { rMS } from "../../styles/responsive";
import { useNavigation } from "@react-navigation/native";

export const ProductList = (props) => {
  const { productos  } = props

  const navigation = useNavigation<any>();

  const handleDetail = (item) => {
    navigation.navigate("ProductDetail" , item );
    
  }


  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.eventItem,
        { flexDirection: "row", borderColor: "#C0C0C0", borderWidth: 1 },
      ]}
      key={item.id}
       onPress={() => handleDetail(item)}
    >
      <View style={styles.eventItem}>
        <View style={{ width: "80%", height: "100%" }}>
          <Text style={styles.eventTitle}>{item.nombre}</Text>
          <Text style={styles.eventSummary}>ID : {item.id}</Text>
        </View>
        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="arrowright" size={20} color="#000" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{ alignItems: "flex-end", paddingHorizontal: 20 }}>
        <Text>Cantidad Productos : {productos && productos?.length}</Text>
      </View>
      <FlatList
        data={productos}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.eventsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  eventItem: {
    backgroundColor: "#fff",
    padding: 10,
    flexDirection: "row",
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
  eventsList: {
    flexGrow: 1,
    paddingVertical: 10,
  },
});

export default ProductList;
