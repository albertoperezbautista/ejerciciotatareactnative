import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { rMS } from "../styles/responsive";

export const Buscar = (props) => {
  const { onSearch } = props
  const [upData, setupData] = useState({
    buscar: "",
  });

  const handleSearch = (value) => {
    const filteredValue = value.trim(); // Eliminar espacios en blanco al inicio y al final
    setupData({ buscar: filteredValue }); // Actualizar estado local de búsqueda
    onSearch(filteredValue); // Llamar a la función de búsqueda del padre
  };

  return (
    <View
      style={{
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <TextInput
        value={upData.buscar}
        maxLength={30}
        placeholder="Search..."
        placeholderTextColor="#000"
        style={{
          color: "#000",
          fontSize: rMS(15, 2),
          width: "90%",
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={handleSearch}
        keyboardType="default"
      />
      {upData.buscar ? (
        <TouchableOpacity
          style={{ paddingRight: 15 }}
          onPress={() => {
            setupData({ buscar: "" }); // Limpiar el campo de búsqueda
            handleSearch(""); // Realizar búsqueda sin término para restaurar la lista completa
          }}
        >
          <Icon name="closecircleo" size={20} color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{ paddingRight: 15 }}>
          <Icon name="search1" size={20} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};
