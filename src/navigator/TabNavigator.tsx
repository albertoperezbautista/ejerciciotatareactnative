import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View } from "react-native";
import { moderateScale as rMS } from "react-native-size-matters";
import {
  default as Icon,
  default as MaterialCommunityIcons,
} from "react-native-vector-icons/MaterialCommunityIcons";
import ClientesPage from "../pages/Clientes/ClientesPage";
import Home from "../pages/Home/Home";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/account/ProfileScreen";
import { colores } from "../theme/appTheme";
import { StackNavigatorClientes } from "./StackNavigatorClientes";
import { StackNavigatorProducto } from "./StackNavigatorProductos";

const TabNavigator = () => {
  return Platform.OS === "ios" ? <TabsIOS /> : <TabsAndroid />;
};
const Tab = createBottomTabNavigator();

const TabsAndroid = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#F16060",
          tabBarLabelStyle: { fontSize: rMS(14, 2), marginBottom: rMS(16, 1) },
          tabBarStyle: {
            height: rMS(75, 1),
            paddingTop: rMS(10, 1),
            flexDirection: "row",
            justifyContent: "center",
          },
        }}
      >
        <Tab.Screen
          name="productos"
          component={StackNavigatorProducto}
          options={{
            tabBarLabel: "Productos", // Nombre en el menú de pestañas
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="star"
                color={color}
                size={rMS(25, 1)}
              />
            ),
            headerShown: false,
          }}
        />

        {/* <Tab.Screen
          name="clientes"
          component={StackNavigatorClientes}
          options={{
            tabBarLabel: "Clientes", // Nombre en el menú de pestañas
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-multiple"
                color={color}
                size={rMS(25, 1)}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Feed"
          component={Home}
          options={{
            tabBarLabel: "Agenda",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="calendar-month-outline"
                color={color}
                size={rMS(25, 2)}
              />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="cuenta"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Cuenta",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-cog-outline"
                color={color}
                size={25}
              />
            ),
            headerShown: false,
          }}
        /> */}
      </Tab.Navigator>
    </View>
  );
};

const BottomTabIOS = createBottomTabNavigator();

const TabsIOS = (props: any) => {
  const { user } = props;

  return (
    <BottomTabIOS.Navigator
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colores.primary,
        tabBarStyle: {
          borderTopColor: colores.primary,
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 15,
        },
        tabBarIcon: ({ color }) => {
          let iconName: string = "";
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;

            case "Buscar":
              iconName = "magnify";
              break;

            case "Reservas":
              iconName = "home";
              break;
          }

          return <Icon name={iconName} size={25} color={color} />;
        },
      })}
    >
      <BottomTabIOS.Screen
        name="Home"
        options={{
          headerShown: false,
          title: "Homes",
        }}
        component={(props) => {
          return <HomeScreen {...props} />;
        }}
      />
    </BottomTabIOS.Navigator>
  );
};

export default TabNavigator;
