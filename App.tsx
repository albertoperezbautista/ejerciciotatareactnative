import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Platform, View } from "react-native";
import "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import {
  ConnectContext,
  ConnectProvider
} from "./src/context/ConectivityContext";
import { AuthProvider } from "./src/context/auth/AuthContext";
import { UserProvider } from "./src/context/auth/UserContext";
import AuthStack from "./src/navigator/AuthStack";
import { DatabaseProvider } from "./src/context/DatabaseContext";
const App = () => {
  
  
  useEffect(() => {
    Orientation.lockToPortrait();
    const orientationDidChange = () => {
      console.log("La orientación ha cambiado");
    };
    Orientation.addOrientationListener(orientationDidChange);
    return () => {
      Orientation.removeOrientationListener(orientationDidChange);
    };
  }, []);

  useEffect(() => {
    ocultarScreenAndroid();
  }, []);

  const ocultarScreenAndroid = async () => {
    if (Platform.OS === "android") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hide();
    }
  };

  return (
    <>
      {/* <ConnectProvider> */}
        <DatabaseProvider>
        <View style={{ flex: 1 }}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppState>
                <AuthStack />
              </AppState>
            </NavigationContainer>
          </SafeAreaProvider>
        </View>
        </DatabaseProvider>
      {/* </ConnectProvider> */}
    </>
  );
};

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  );
};

export default App;
