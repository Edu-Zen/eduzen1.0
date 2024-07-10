import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import BottomNavBar from "../components/BottomNavBar"; // Ensure you have this component in your project
import Sidebar from "../components/Sidebar"; // Import the Sidebar component

// Replace this with your actual image URL or local asset path
const menuIcon = require("../assets/dd.png");

const Agenda = ({ navigation, route }) => {
  const currentScreen = route.name; // Assuming you use react-navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth = 250;
  const sidebarAnimation = useRef(new Animated.Value(0)).current;

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

  const translateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0],
  });

  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={styles.container}>
        {!isSidebarOpen && ( // Render menu icon only if sidebar is not open
          <TouchableOpacity
            style={styles.menuIconContainer}
            onPress={toggleSidebar}
          >
            <Image source={menuIcon} style={styles.menuIcon} />
          </TouchableOpacity>
        )}
        <Animated.View
          style={[styles.sidebarContainer, { transform: [{ translateX }] }]}
        >
          <Sidebar />
        </Animated.View>
        <View style={styles.mainContent}>
          <View style={styles.calendarContainer}>
            <Calendar
            // Calendar props as before
            // ...
            />
          </View>
          <BottomNavBar navigation={navigation} currentScreen={currentScreen} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
  menuIconContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    padding: 10,
    zIndex: 20,
  },
  menuIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain", // Ensure the icon fits well in the container
  },
  mainContent: {
    flex: 1,
    marginLeft: 0, // Adjust margin left to account for sidebar width
    justifyContent: "space-between",
    // marginTop:20
  },
  calendarContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
});

export default Agenda;
