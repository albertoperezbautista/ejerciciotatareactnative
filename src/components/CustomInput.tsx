// CustomInput.tsx
import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import { rMS } from '../styles/responsive';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface CustomInputProps extends InputProps {
  iconName?: string;
  iconSize?: number;
  style?: TextStyle;
  containerStyle?: ViewStyle;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  placeholder,
  placeholderTextColor = "#ccc",
  rightIcon,
  autoCorrect = false,
  onChangeText,
  keyboardType = "default",
  errorMessage,
  iconName = "at",
  iconSize = rMS(20, 2)
}) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      
      rightIcon={
        rightIcon || <Icon size={iconSize} name={iconName}  />
      }
      onChangeText={onChangeText}
      errorMessage={errorMessage}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: rMS(18, 1),
  },
 
});

export default CustomInput;
