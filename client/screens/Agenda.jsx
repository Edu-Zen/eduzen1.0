import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
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
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const menuIcon = require("../assets/dd.png");
const searchIcon = require("../assets/search.png");

const CalendarScreen = ({ navigation, route }) => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const sidebarWidth = 250;
  const sidebarAnimation = useRef(new Animated.Value(0)).current;
  const rightSidebarAnimation = useRef(new Animated.Value(0)).current;
  const email = route.params?.email;
  const currentScreen = route.name;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = await fetchItemsApi(route.params.email);
        const filteredItems = filterItemsByCurrentMonth(itemsData);
        const formattedItems = formatItems(filteredItems);
        console.log("Fetched items:", formattedItems); // Debugging line
        setItems(formattedItems);
      } catch (error) {
        console.error(error);
        Alert.alert("Alerte", "Vous n'avez pas encore d'évenements");
      }

      try {
        const holidaysData = await fetchHolidaysApi();
        const formattedHolidays = formatHolidays(holidaysData);
        console.log("Fetched holidays:", formattedHolidays); // Debugging line
        setHolidays(formattedHolidays);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to fetch holidays");
      }
    };

    fetchData();
  }, [route.params.email]);

  const onDayPress = (day) => {
    console.log("Selected date:", day.dateString); // Debugging line
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

  const renderEvent = ({ item, index }) => (
    <View style={styles.item}>
      {console.log("item here", item)}

      <View style={styles.itemContent}>
        <Text style={styles.itemText}>
          {index + 1}. Nom du rappel: {item.name}
        </Text>
        {item.description && (
          <Text style={styles.itemText}>
            Description du rappel: {item.description}
          </Text>
        )}
        {item.time && (
          <Text style={styles.itemText}>Heure du rappel: {item.time}</Text>
        )}
        <Text style={styles.itemText}>
          Type du rappel: {item.type || "Vacances"}
        </Text>
      </View>
    </View>
  );

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? 0 : 1;
    Animated.timing(sidebarAnimation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleRightSidebar = () => {
    const toValue = isRightSidebarOpen ? 0 : 1;
    Animated.timing(rightSidebarAnimation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setIsSidebarOpen(false);
    });
  };

  const closeRightSidebar = () => {
    Animated.timing(rightSidebarAnimation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setIsRightSidebarOpen(false);
    });
  };

  const translateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0],
  });

  const translateXRight = rightSidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [sidebarWidth, 0],
  });

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search logic here
  };

  return (
    <TouchableWithoutFeedback onPress={() => { closeSidebar(); closeRightSidebar(); }}>
      <View style={styles.container}>
        {!isSidebarOpen && ( // Render menu icon only if sidebar is not open
          <TouchableOpacity
            style={styles.menuIconContainer}
            onPress={toggleSidebar}
          >
            <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
        )}
        {!isRightSidebarOpen && ( // Render search icon only if right sidebar is not open
          <TouchableOpacity
            style={styles.searchIconContainer}
            onPress={toggleRightSidebar}
          >
            <Image source={searchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        )}
        <Animated.View
          style={[styles.sidebarContainer, { transform: [{ translateX }] }]}
        >
          <Sidebar />
        </Animated.View>
        <Animated.View
          style={[styles.rightSidebarContainer, { transform: [{ translateX: translateXRight }] }]}
        >
          <SearchBar onSearch={handleSearch} />
        </Animated.View>
        <View style={styles.mainContent}>
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
                  <Text style={styles.modalTitle}>
                    Evenements pour le : {selectedDate}
                  </Text>
                  <FlatList
                    data={[
                      ...(items[selectedDate] || []),
                      ...(holidays[selectedDate] || []),
                    ]}
                    renderItem={renderEvent}
                    keyExtractor={(item, index) =>
                      item.id?.toString() ?? `fallback-${index}`
                    }
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => (
                      <Text style={styles.noEventsText}>Pas D'evenement pour ce jour là</Text>
                    )}
                  />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <LinearGradient
                      colors={['#3A98F5', '#00E9B8']}
                      style={styles.linearGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.closeButtonText}>Close</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
          <BottomNavBar
            navigation={navigation}
            currentScreen={currentScreen}
            email={email}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  sidebarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#f2f2f2",
    paddingVertical: 20,
    zIndex: 10,
  },
  rightSidebarContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#f2f2f2",
    paddingVertical: 20,
    zIndex: 10,
  },
  menuIconContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    padding: 10,
    zIndex: 20,
  },
  searchIconContainer: {
    position: "absolute",
    top: 20,
    right: 0,
    padding: 10,
    zIndex: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  searchIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  mainContent: {
    flex: 1,
    marginLeft: 0,
    justifyContent: "space-between",
    paddingTop: 80,
  },
  calendar: {
    // marginBottom: 20,
  },
  item: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
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
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linearGradient: {
    padding: 12,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  noEventsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});

export default CalendarScreen;
