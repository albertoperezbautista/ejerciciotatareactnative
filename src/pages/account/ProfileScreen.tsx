import { useContext } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { UserContext } from "../../context/auth/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../context/auth/AuthContext";

const ProfileScreen = () => {
  const {  signOut } = useContext(AuthContext);
  const { isLogin, clearUser ,userState } = useContext(UserContext);

  const handleLogOut = async() => {
    await signOut();
    await clearUser();
    await isLogin(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{userState.idUsuario}</Text>

        <TouchableOpacity
          style={{
            top: 20,
            borderWidth: 1,
            borderColor: "red",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={handleLogOut}
        >
          <Text> Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
