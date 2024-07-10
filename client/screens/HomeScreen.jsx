import React from "react";
import { View, Text, StyleSheet, StatusBar, Platform } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import UpperNavBar from "../components/UpperNavBar";

const HomeScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <View style={styles.upnav}>
        <UpperNavBar navigation={navigation} currentScreen={currentScreen} />
      </View>
      <View style={styles.mainContent}>
        <Text>Main Screen Content</Text>
      </View>
      <View style={styles.bottomNav}>
        <BottomNavBar navigation={navigation} currentScreen={currentScreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  upnav: {
    position: "absolute",
    top: Platform.OS === 'android' ? StatusBar.currentHeight -30: 0, // Ensure correct position for Android
    width: "100%",
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 50 : 50, // Adjust based on UpperNavBar height
    marginBottom: 60, // Adjust based on BottomNavBar height
    padding: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default HomeScreen;
