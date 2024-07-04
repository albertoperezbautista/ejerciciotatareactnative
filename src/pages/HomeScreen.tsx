import { useContext } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{
          flex: 1,
          width: "100%",
          minHeight: Dimensions.get("window").height,
        }}
        source={require("../assets/fondo.png")}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            minHeight: Dimensions.get("window").height,
          }}
        ></ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 120,
  },
  container: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
});
