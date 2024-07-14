import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavBar from "../components/BottomNavBar";
import UpperNavBar from "../components/UpperNavBar";

const { width, height } = Dimensions.get("window");

import universite from "../assets/université.png";
import extra from "../assets/extra.png";
import en_ligne from "../assets/en_ligne.png";
import personnel from "../assets/personnel.png";
import sante from "../assets/santé.png";
import maison from "../assets/maison.png";
import hobbie from "../assets/hobbie.png";
import sport from "../assets/sport.png";
import shopping from "../assets/shopping.png";
import foire from "../assets/foire.png";
import fete from "../assets/fete.png";
import famille from "../assets/famille.png";
import reseau from "../assets/reseau.png";
import amis from "../assets/amis.png";
import education from "../assets/education.png";
import santebienetre from "../assets/santebienetre.png";
import finance from "../assets/finance.png";
import relation from "../assets/relation.png";

const images = {
  universite,
  extra,
  en_ligne,
  personnel,
  sante,
  maison,
  hobbie,
  sport,
  shopping,
  foire,
  fete,
  famille,
  reseau,
  amis,
  education,
  santebienetre,
  finance,
  relation,
};

const sections = [
  {
    title: "Cours",
    data: [
      { image: "universite", text: "Université" },
      { image: "extra", text: "Extra" },
      { image: "en_ligne", text: "En ligne" },
      { image: "personnel", text: "Personnel" },
    ],
  },
  {
    title: "Examens",
    data: [
      { image: "universite", text: "Université" },
      { image: "extra", text: "Extra" },
    ],
  },
  {
    title: "Tâches",
    data: [
      { image: "sante", text: "Santé" },
      { image: "maison", text: "Maison" },
      { image: "hobbie", text: "Hobbie" },
      { image: "sport", text: "Sport" },
      { image: "shopping", text: "Shopping" },
      { image: "personnel", text: "Personnel" },
    ],
  },
  {
    title: "Événements",
    data: [
      { image: "foire", text: "Foire" },
      { image: "fete", text: "Fête" },
      { image: "famille", text: "Famille" },
      { image: "reseau", text: "Réseau" },
      { image: "amis", text: "Amis" },
      { image: "personnel", text: "Personnel" },
    ],
  },
  {
    title: "Objectifs",
    data: [
      { image: "education", text: "Éducation" },
      { image: "santebienetre", text: "Santé et Bien-être" },
      { image: "finance", text: "Finance" },
      { image: "relation", text: "Relation" },
      { image: "shopping", text: "Shopping" },
      { image: "personnel", text: "Personnel" },
    ],
  },
];
const Add = ({ navigation, route }) => {
  const email=route.params?.email;
  const currentScreen = route.name;

  const handlePress = (sectionTitle, item) => {
    navigation.navigate("Detail", { section: sectionTitle, item ,email,images: item.images});
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <UpperNavBar navigation={navigation} currentScreen={currentScreen} />
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <FlatList
              data={section.data}
              renderItem={({ item }) => (
                <ImageTextCard
                  image={images[item.image]}
                  text={item.text}
                  onPress={() => handlePress(section.title, item)}
                />
              )}
              keyExtractor={(item, idx) => idx.toString()}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false} // Ensure FlatList doesn't try to scroll
            />
          </View>
        ))}
      </ScrollView>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} email={email} />
    </View>
  );
};

const ImageTextCard = ({ image, text, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <LinearGradient
      colors={["#3A98F5", "#00E9B8"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Image source={image} style={styles.image} />
    </LinearGradient>
    <Text style={styles.imageText}>{text}</Text>
    <Text style={styles.imageSubText}>Lorem Ipsum is simply</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    paddingHorizontal: width * 0.05,
    paddingBottom: height * 0.02 * 5,
    paddingTop: height * 0.05,
  },
  section: {
    marginVertical: height * 0.02,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    marginLeft: width * 0.02,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: width * 0.02,
    padding: height * 0.02,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  gradient: {
    borderRadius: 50,
    padding: height * 0.015,
    marginBottom: height * 0.01,
  },
  image: {
    width: width * 0.12,
    height: width * 0.12,
  },
  imageText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageSubText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});

export default Add;
