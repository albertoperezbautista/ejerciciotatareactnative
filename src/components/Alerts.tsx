import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const showAlert = (message) =>
  Alert.alert(`Uupps...`, message, [
    {
      text: "OK",

      style: "cancel",
    },
  ]);

export const showAlertConfirmate = (message) =>
  Alert.alert(`OK`, message, [
    {
      text: "OK",

      style: "cancel",
    },
  ]);


export  const handleConfirmAction = (message , ejecutarFuncion ) => {
    Alert.alert(
      'Confirmación',
      `${message}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sí',
          onPress: () => ejecutarFuncion()
        }
      ],
      { cancelable: false }
    );
  };

  const ejecutarAccion = async (ejecutarFuncion) => {
    await ejecutarFuncion
  };

