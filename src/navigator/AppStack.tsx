/* eslint-disable react-hooks/exhaustive-deps */
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext, useEffect } from "react";
import CustomDrawer from "../components/CustomDrawer";
import ProfileScreen from "../pages/account/ProfileScreen";
import TabNavigator from "./TabNavigator";

// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

const AppStack = () => {

 

  useEffect(() => {}, []);

  return (
    
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#00a680",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerLabelStyle: {
          marginLeft: -25,
          // fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
        swipeEdgeWidth: 0, // Deshabilita deslizar para abrir
      }}
    >
      {/* Me abre el Menu Principal */}
      <Drawer.Screen
        name="Inicio"
        component={TabNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),

          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
