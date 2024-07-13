import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import {
  fetchItems as fetchItemsApi,
  fetchHolidays as fetchHolidaysApi,
} from "../helpers/helperfnAgenda";
import {
  filterItemsByCurrentMonth,
  formatItems,
  formatHolidays,
} from "../helpers/helperfnAgenda";
import BottomNavBar from "../components/BottomNavBar";

const CalendarScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const email = route.params?.email;
  const currentScreen = route.name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = await fetchItemsApi(route.params.email);
        const filteredItems = filterItemsByCurrentMonth(itemsData);
        const formattedItems = formatItems(filteredItems);
        setItems(formattedItems);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch items");
      }

      try {
        const holidaysData = await fetchHolidaysApi();
        const formattedHolidays = formatHolidays(holidaysData);
        setHolidays(formattedHolidays);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch holidays");
      }
    };

    fetchData();
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const customMarking = useCallback(
    (date) => {
      let marked = false;
      let customStyles = {};

      if (items[date]) {
        marked = true;
        customStyles = {
          customContainerStyle: {
            backgroundColor: "blue",
          },
        };
      }

      return { marked, ...customStyles };
    },
    [items]
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const todayDateString = `${year}-${month}-${day}`;

  const markedDates = {
    ...Object.keys(items).reduce((acc, date) => {
      acc[date] = { marked: true, ...customMarking(date) };
      return acc;
    }, {}),
    ...Object.keys(holidays).reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: "green" };
      return acc;
    }, {}),
    [todayDateString]: { selected: true, selectedColor: "blue" },
  };

  const renderEvent = ({ item }) => {
    console.log("Rendering item:", item); // Add this line
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>Nom du rappel: {item.name}</Text>
        {item.description && (
          <Text style={styles.itemText}>Description du rappel: {item.description}</Text>
        )}
        {item.time && (
          <Text style={styles.itemText}>Heure du rappel: {item.time}</Text>
        )}
        <Text style={styles.itemText}>Type du rappel: {item.type || "Vacances"}</Text>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <CalendarList
        markedDates={markedDates}
        onDayPress={onDayPress}
        calendarStyle={styles.calendar}
        markingType={"custom"}
      />
      {selectedDate && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Events for {selectedDate}:</Text>
              <FlatList
                data={[...(items[selectedDate] || []), ...(holidays[selectedDate] || [])]}
                renderItem={renderEvent}
                keyExtractor={(item, index) => item.id?.toString() ?? `fallback-${index}`}
                numColumns={1}
                contentContainerStyle={styles.grid}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} email={email} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  calendar: {
    marginBottom: 10,
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CalendarScreen;
