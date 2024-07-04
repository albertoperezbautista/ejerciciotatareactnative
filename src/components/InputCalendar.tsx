import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Button,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInputMask } from "react-native-masked-text";
import { rMS } from "../styles/responsive";

const InputCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [inputDate, setInputDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateChange = (date: Date) => {
    const year = date.getFullYear();
    if (year < 2015 || year > 2050) {
      Alert.alert("Fecha inválida", "El año debe estar entre 2015 y 2050");
      return;
    }
    setSelectedDate(date);
    setInputDate(date.toLocaleDateString("es-ES"));
    setModalVisible(false); // Ocultar el modal después de seleccionar la fecha
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (text: string) => {
    setInputDate(text);
    const [day, month, year] = text.split("/").map(Number);
    if (day && month && year && year.toString().length === 4) {
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate.getTime())) {
        if (year >= 2015 && year <= 2050) {
          setSelectedDate(parsedDate);
        } else {
          Alert.alert("Fecha inválida", "El año debe estar entre 2015 y 2050");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.inputContainer}>
        <Text style={styles.inputText}>{inputDate || "DD/MM/YYYY"}</Text>
        <IconMC name="calendar" size={rMS(20, 1)} color="#000" />
      </TouchableOpacity>
      

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CalendarPicker onDateChange={handleDateChange} />
            <Button title="Cerrar" onPress={closeModal} />
          </View>
        </View>
      </Modal>
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
    borderBottomWidth : 0.5 , 
    borderBottomColor : '#000'
  },
  inputText: {
    flex: 1,
    fontSize: rMS(16, 1),
    color: "#000",
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

export default InputCalendar;
