/* eslint-disable react-native/no-inline-styles */
import { useContext, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar } from "react-native-elements";
import { RefObjectAlert } from "../interfaces/appInterfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomDrawer = (props: any) => {
  const userOut = {
    Proovedor: undefined,
    emailUser: undefined,
    idApp: undefined,
    idPersona: null,
    idUsuario: undefined,
    isLogin: false,
  };

  const modalRef = useRef<RefObjectAlert>(null);
  const logOut = async () => {};

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainerStyle}
      ></DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity
          onPress={() => logOut()}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} color={"#000"} />
            <Text
              style={{
                fontSize: 15,
                // fontFamily: 'Roboto-Medium',
                color: "#000",
                marginLeft: 5,
              }}
            >
              Salir
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: { backgroundColor: "#00a680" },
  imageBackground: { padding: 20, alignItems: "center" },
  image: { height: 80, width: 80, borderRadius: 40, marginBottom: 10 },
  textName: {
    color: "#fff",
    fontSize: 18,
    // fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },
  textNumberTrips: {
    color: "#fff",
    marginRight: 5,
  },
  userInfoAvatar: {
    marginRight: 2,
    marginBottom: 10,
  },
});
