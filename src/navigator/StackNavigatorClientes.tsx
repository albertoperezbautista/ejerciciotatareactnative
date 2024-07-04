import { createStackNavigator } from "@react-navigation/stack";
import ClientesPage from "../pages/Clientes/ClientesPage";
import { InfoCliente } from "../pages/Clientes/InfoCliente";
import Icon from "react-native-vector-icons/Ionicons";
import { NewOrder } from "../pages/Clientes/NewOrder";


export type RootStackParams = {
  ClientesPage: undefined;
  InfoCliente: undefined;
  NewOrder : undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigatorClientes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: "transparent",
        },
        cardStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="ClientesPage"
        options={{
          title: "ClientesPage",
          headerShown: false,
        }}
        component={ClientesPage}
      />

      <Stack.Screen
        name="InfoCliente"
        options={{
          title: "",
          headerTransparent: true, // Hace que el encabezado sea transparente
          headerBackImage: () => (
            <Icon name="chevron-back" size={50} color="red" />
          ),
        }}
        component={InfoCliente}
      />
      <Stack.Screen
        name="NewOrder"
        options={{
          title: "",
          headerTransparent: true, // Hace que el encabezado sea transparente
          headerBackImage: () => (
            <Icon name="chevron-back" size={50} color="red" />
          ),
        }}
        component={NewOrder}
      />
    </Stack.Navigator>
  );
};
