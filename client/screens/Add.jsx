import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomNavBar from "../components/BottomNavBar"; // Adjust the path if necessary
import UpperNavBar from "../components/UpperNavBar";

const Add = ({ navigation, route }) => {
  const currentScreen = route.name;

  return (
    <View style={styles.container}>
      <UpperNavBar navigation={navigation} currentScreen={currentScreen}/>
      <View style={styles.content}>
        <Text style={styles.text}>This is the Add screen</Text>
      </View>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});

export default Add;
