import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Button,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { rMS } from "../styles/responsive";

const InputHour: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [inputTime, setInputTime] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setModalVisible(false); // Hide picker on Android after selection
    }
    if (date) {
      setSelectedTime(date);
      setInputTime(
        date.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.inputContainer}>
        <Text style={styles.inputText}>{inputTime || "HH:MM"}</Text>
        <IconMC name="clock" size={rMS(20, 1)} color="#000" />
      </TouchableOpacity>

      {modalVisible && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="spinner"
          is24Hour={true}
          onChange={handleTimeChange}
          style={styles.picker}
        />
      )}

      {Platform.OS === "ios" && modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={selectedTime || new Date()}
                mode="time"
                display="spinner"
                is24Hour={true}
                onChange={handleTimeChange}
                style={styles.picker}
              />
              <Button title="Cerrar" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    width: "100%",
    height: rMS(40, 2),
    borderBottomWidth: 0.5,
    borderBottomColor: "#000",
  },
  inputText: {
    flex: 1,
    fontSize: rMS(16, 1),
    color: "#000",
  },
  picker: {
    width: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
});

export default InputHour;
