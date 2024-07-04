import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { rMS } from "../styles/responsive";



export const CustomDropDown = (props) => {
    const { datos } = props
    
  const [value, setValue ] = useState('');

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <IconMC style={styles.icon} color="black" name="check" size={20} />
        )}
      </View>
    );
  };

  return (
    <>
      <View style={{flex : 1 , justifyContent : 'center'}}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={datos}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Escoja una opción..."
          
          searchPlaceholder="Buscar..."
          value={value}
          onChange={(item) => {
            setValue(item.value);
            console.log("Valooooor::::" , item.value);
            
          }}
          
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "white",
    borderBottomWidth : 0.5,
    borderBottomColor : '#000'
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: rMS(14 , 2),
    color : '#000'
  },
  placeholderStyle: {
    fontSize: rMS(14 , 2),
    color : '#000'

  },
  selectedTextStyle: {
    fontSize: rMS(14 , 2),
    color : '#000'

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: rMS(14 , 2),
    color : '#000'

  },
});
