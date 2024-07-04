

// CustomTextArea.tsx
import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import { rMS } from '../styles/responsive';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CustomTextAreaProps extends InputProps {
  iconName?: string;
  iconSize?: number;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  maxLength?: number;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  value,
  placeholder = "Ingresar Comentario...",
  placeholderTextColor = "#ccc",
  rightIcon,
  autoCorrect = false,
  onChangeText,
  keyboardType = "default",
  errorMessage,
  iconName = "comment-text",
  iconSize = rMS(20, 2),
  maxLength = 100,
  style,
  containerStyle,
}) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      rightIcon={
        rightIcon || <Icon size={iconSize} name={iconName} />
      }
      onChangeText={onChangeText}
      errorMessage={errorMessage}
      multiline={true}
      maxLength={maxLength}
      inputStyle={[styles.input, style]}
      containerStyle={containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: rMS(18, 1),
    minHeight: rMS(100, 2), // Define a minimum height for the text area
    textAlignVertical: 'top', // Align text to the top
  },
});

export default CustomTextArea;
