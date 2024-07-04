import React, { useEffect } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";

const KeyboardAwareWrapper = ({ children }) => {
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // Aquí puedes manejar la lógica cuando el teclado se muestre
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Aquí puedes manejar la lógica cuando el teclado se oculte
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAwareWrapper;
