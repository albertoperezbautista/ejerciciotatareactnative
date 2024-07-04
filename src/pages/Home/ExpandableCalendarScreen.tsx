import React, { useRef, useCallback, useState, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from "react-native-calendars";
import { agendaItems } from "../../mocks/agendaItems";
import AgendaItem from "../../mocks/AgendaItem";
import { getTheme, lightThemeColor } from "../../mocks/theme";
import { getDate } from "../../mocks/timelineEvents";
import { rMS, rS } from "../../styles/responsive";

const leftArrowIcon = require("../../img/previous.png");
const rightArrowIcon = require("../../img/next.png");

interface AgendaItemData {
  client?: string;
  duration?: string;
  fecha?: string;
  hour?: string;
  vendedor?: string;
  direccion? : string
}

interface AgendaSection {
  fecha?: string;
  data?: AgendaItemData[];
}

const ITEMS: AgendaSection[] = agendaItems;

const ExpandableCalendarScreen = (props: any) => {
  const theme = useRef(getTheme());
  const [selectedDate, setSelectedDate] = useState(getDate());
  const [numeroTareas, setNumeroTareas] = useState(0);

  const renderItem = useCallback(
    ({ item }: { item: AgendaItemData }) => {
      return <AgendaItem item={item} day={selectedDate} />;
    },
    [selectedDate]
  );

  const onDayPress = useCallback((day: { dateString: string }) => {
    console.log("Selected day:", day.dateString);
    setSelectedDate(day.dateString);
  }, []);

  const filteredItems = useMemo(() => {
    const itemsForDate = ITEMS.filter(
      (section) => section.fecha === selectedDate
    ).flatMap((section) => section.data);
    setNumeroTareas(itemsForDate.length);
    return itemsForDate.length > 0
      ? [{ title: selectedDate, data: itemsForDate }]
      : [];
  }, [selectedDate]);

  console.log("Filtered Items", filteredItems);

  return (
    <CalendarProvider date={selectedDate}>
      <ExpandableCalendar
        theme={theme.current}
        firstDay={1}
        leftArrowImageSource={leftArrowIcon}
        rightArrowImageSource={rightArrowIcon}
        onDayPress={onDayPress}
      />

      {numeroTareas === 0 ? (
        <View
          style={{
            backgroundColor: lightThemeColor,
            width: '100%',
            height: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: rMS(18, 1) }}>
            No hay registros en este dia.
          </Text>
        </View>
      ) : (
        <AgendaList
          sections={filteredItems}
          renderItem={renderItem}
          sectionStyle={styles.section}
        />
      )}
    </CalendarProvider>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: "lightgrey",
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize",
  },
});
