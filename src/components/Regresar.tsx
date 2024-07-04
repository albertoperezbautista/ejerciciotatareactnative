import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { rMS } from "../styles/responsive";

const Regresar = (props: any) => {
  const { title, setModalVisible , colorReturn , colorText } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{ width: "15%", height: "100%"  }}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Icon name="chevron-back" size={rMS(45 , 2)} color={colorReturn} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "70%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colorText, fontSize: rMS(18 , 2) }}>{title}</Text>
      </View>
    
    </View>
  );
};

export default Regresar;
