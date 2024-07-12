import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BottomNavBar from "../components/BottomNavBar"; // Adjust the path if necessary
import UpperNavBar from "../components/UpperNavBar";
import PourVous from "../BienComponent/PourVous";
import Articles from "../BienComponent/Article";
import Astuces from "../BienComponent/Astuces";
import Exercices from "../BienComponent/Exercices";

const data = [
  {
    title: 'Comment faire le bon choix pour son futur métier',
    image: { uri: 'https://www.sciforma.com/wp-content/uploads/2022/03/Screen-Shot-2022-06-01-at-4.28.51-PM-1024x578.png' },
    points: 50,
    category: 'Article',
  },
  {
    title: 'Comment faire le bon choix pour son futur métier',
    image: { uri: 'https://www.yarooms.com/hubfs/1-Sep-15-2023-02-45-09-1809-PM.png' },
    points: 50,
    category: 'Astuces',
  },
  {
    title: 'Comment faire le bon choix pour son futur métier',
    image: { uri: 'https://www.avocor.com/wp-content/uploads/2018/09/7-examples-of-teamwork-collaboration-in-the-workplace-featured-image.png' },
    points: 50,
    category: 'Exercices',
  },
  {
    title: 'Comment faire le bon choix pour son futur métier',
    image: { uri: 'https://www.sciforma.com/wp-content/uploads/2022/03/Screen-Shot-2022-06-01-at-4.28.51-PM-1024x578.png' },
    points: 50,
    category: 'Article',
  },
  {
    title: 'Comment faire le bon choix pour son futur métier',
    image: { uri: 'https://www.yarooms.com/hubfs/1-Sep-15-2023-02-45-09-1809-PM.png' },
    points: 50,
    category: 'Astuces',
  },
  {
    title: 'Comment faire le bon choix pour son futur métier',
    image: { uri: 'https://www.avocor.com/wp-content/uploads/2018/09/7-examples-of-teamwork-collaboration-in-the-workplace-featured-image.png' },
    points: 50,
    category: 'Exercices',
  },
  // Add more items as needed
];

const HeartScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  const [activeComponent, setActiveComponent] = useState('Component1');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Component1':
        return <PourVous data={data} />;
      case 'Component2':
        return <Articles data={data.filter(item => item.category === 'Article')} />;
      case 'Component3':
        return <Astuces data={data.filter(item => item.category === 'Astuces')} />;
      case 'Component4':
        return <Exercices data={data.filter(item => item.category === 'Exercices')} />;
      default:
        return <PourVous data={data} />;
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
