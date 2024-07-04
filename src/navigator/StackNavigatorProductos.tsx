import { createStackNavigator } from "@react-navigation/stack";
import { ProductosPage } from "../pages/Productos/ProductosPage";
import { ProductDetail } from "../pages/Productos/ProductDetail";
import Icon from "react-native-vector-icons/Ionicons";


export type RootStackParams = {
  ProductosPage: undefined;
  ProductDetail: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigatorProducto = () => {
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
        name="ProductosPage"
        options={{
          title: "ProductosPage",
          headerShown: false,
        }}
        component={ProductosPage}
      />

      <Stack.Screen
        name="ProductDetail"
        options={{
          title: "",
          headerTransparent: true, // Hace que el encabezado sea transparente
          headerBackImage: () => (
            <Icon name="chevron-back" size={50} color="#000" />
          ),
        }}
        component={ProductDetail}
      />
    </Stack.Navigator>
  );
};
