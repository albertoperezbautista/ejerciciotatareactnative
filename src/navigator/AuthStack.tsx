import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import LoadingModal from "../components/LoadingModal";
import AppStack from "./AppStack";
import KeyboardAwareWrapper from "../components/KeyboardAwareWrapper ";
import { LoginScreen } from "../pages/Login/LoginScreen";
import { UserContext } from "../context/auth/UserContext";

const Stack = createNativeStackNavigator();

const AuthStack = (props: any) => {
  const {statusConnect} = props
  const [isLoading, setIsLoading] = useState(false);
  const { userState, updateInfoUser, updateEstadoJugador } =
  useContext(UserContext);

  console.log("UserStateee:::" , userState);
  

  return (
    <>
      <LoadingModal loalModal={isLoading} setloalModal={setIsLoading} />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Main" component={AppStack} />
      </Stack.Navigator>

      <LoadingModal loalModal={isLoading} setloalModal={setIsLoading} />

      {/* {userState && userState.isLogin ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={AppStack} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} initialParams={{ statusConnect }}  />
        </Stack.Navigator>
      )} */}
    </>
  );
};

export default AuthStack;
