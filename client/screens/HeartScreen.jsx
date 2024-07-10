import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomNavBar from "../components/BottomNavBar"; // Adjust the path if necessary
import UpperNavBar from "../components/UpperNavBar";
import PourVous from "../BienComponent/PourVous";
import Articles from "../BienComponent/Article";
import Astuces from "../BienComponent/Astuces";
import Exercices from "../BienComponent/Exercices";

const HeartScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  const [activeComponent, setActiveComponent] = useState('Component1');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Component1':
        return <PourVous />;
      case 'Component2':
        return <Articles />;
      case 'Component3':
        return <Astuces />;
      case 'Component4':
        return <Exercices />;
      default:
        return <PourVous />;
    }
  };

  return (
    <View style={styles.container}>
      <UpperNavBar navigation={navigation} currentScreen={currentScreen} />
      <View style={[styles.navigationButtons, { marginTop: 55 }]}>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component1' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component1')}
        >
          <Text style={styles.navButtonText}>Pour Vous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component2' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component2')}
        >
          <Text style={styles.navButtonText}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component3' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component3')}
        >
          <Text style={styles.navButtonText}>Astuces</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navButtonContainer, activeComponent === 'Component4' && styles.activeButton]} 
          onPress={() => setActiveComponent('Component4')}
        >
          <Text style={styles.navButtonText}>Exercices</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {renderActiveComponent()}
      </View>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  navButtonContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#20AD96',
  },
  navButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  componentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});

export default HeartScreen;
