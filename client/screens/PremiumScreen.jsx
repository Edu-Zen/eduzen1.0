import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image , Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavBar from '../components/BottomNavBar';
import UpperNavBar from "../components/UpperNavBar";
const { width, height } = Dimensions.get("window");

const toolsData = [
  {
    id: '1',
    title: 'Tool 1',
    image: 'https://www.sendinblue.com/wp-content/uploads/2022/06/what_is_chatbot_fb.png',
  },
  {
    id: '2',
    title: 'Tool 2',
    image: 'https://www.versaclinic.app/assets/imgs/benefit_patient_record.png',
  },
  {
    id: '3',
    title: 'Tool 3',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Tool 4',
    image: 'https://via.placeholder.com/150',
  },
];

const PremiumScreen = ({navigation, route}) => {
  const currentScreen = route.name;
  const email = route.params.email;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <UpperNavBar navigation={navigation} currentScreen={currentScreen} email={email} />

        <View style={styles.content}>
          
          <LinearGradient
            colors={['#3A98F5', '#00E9B8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.premiumContainer}
          >
            <Text style={styles.premiumTitle}>Passer au premium</Text>
            <Text style={styles.premiumSubtitle}>Pour un bien-être quotidien</Text>
            {Array(5).fill(null).map((_, index) => (
              <View key={index} style={styles.feature}>
                <Text style={styles.featureText}>Passer au premium</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.premiumButtonText}>Passer au premium</Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={styles.toolsContainer}>
            <Text style={styles.toolsTitle}>Outils premium</Text>
            <Text style={styles.toolsDescription}>
              Augmentez votre productivité, améliorez votre quotidien et soulagez votre stress grâce à nos outils premium.
            </Text>
            <FlatList
              horizontal
              data={toolsData}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={['#3A98F5', '#00E9B8']}
                  style={styles.toolBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Image source={{ uri: item.image }} style={styles.toolImage} />
                  <Text style={styles.toolTitle}>{item.title}</Text>
                </LinearGradient>
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} email={email}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingTop: 60, // Adjust this value based on the height of your UpperNavBar
  },
  content: {
    padding: 20,
  },
  premiumContainer: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  premiumSubtitle: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
  premiumButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  premiumButtonText: {
    color: '#3A98F5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toolsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 100
  },
  toolsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  toolsDescription: {
    fontSize: 14,
    marginBottom: 10,
    color: 'grey'
  },
  toolBox: {
    borderRadius: 10,
    width: 150,
    height: 150,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PremiumScreen;
