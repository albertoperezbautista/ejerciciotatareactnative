import { useEffect, useMemo, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { StyleSheet, Text } from "react-native";
import { rMS, rS } from "../styles/responsive";

export const RadioButtonOptions = (props) => {
  const { options, optionSelect } = props;
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const radioButtons = useMemo(() => options, [options]);

  useEffect(() => {
    optionSelect(selectedId);
  }, [selectedId]);

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={setSelectedId}
      selectedId={selectedId}
      layout="row"
      labelStyle={{ fontSize: rMS(16, 2) }}
      
      
      
    />
  );
};
