import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { API_URL } from "@env";

const HomeScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  const email = route.params?.email;
  const [user, setUser] = useState(null);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (!email) {
      console.error("Email is undefined");
      return;
    }

    const fetchUser = async () => {
      try {
        console.log(email);
        const response = await axios.get(
          `${API_URL}/api/students/email/${email}`
        );
        setUser(response.data);
        const firstName = response.data.firstName || "";
        const lastName = response.data.lastName || "";
        setInitials(`${firstName.charAt(0)}${lastName.charAt(0)}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [email]);

  const articles = [
    {
      title: "Comment faire le bon choix pour son futur métier",
      image: {
        uri: "https://www.sciforma.com/wp-content/uploads/2022/03/Screen-Shot-2022-06-01-at-4.28.51-PM-1024x578.png",
      },
      points: 50,
    },
    {
      title: "Conseils pour un mode de vie sain",
      image: {
        uri: "https://www.yarooms.com/hubfs/1-Sep-15-2023-02-45-09-1809-PM.png",
      },
      points: 50,
    },
    {
      title: "Bien-être mental: Techniques et astuces",
      image: {
        uri: "https://www.avocor.com/wp-content/uploads/2018/09/7-examples-of-teamwork-collaboration-in-the-workplace-featured-image.png",
      },
      points: 50,
    },
  ];

  const rewards = [
    {
      points: 50000,
      title: "Carte de recharge 5Dt",
      partenaire: "ooredoo",
    },
    {
      points: 40000,
      title: "Abonnement gym 1 mois",
      partenaire: "fitness club",
    },
    {
      points: 40000,
      title: "Un bon d'achat de 30dt",
      partenaire: "Existe",
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Aujourd'hui</Text>
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsText}>+ 1000</Text>
            {user ? (
              <>
                <TouchableOpacity
                  style={styles.idContainer}
                  onPress={() => navigation.navigate('MyProfile' , {email})}
                >
                  <Text style={styles.idText}>{initials}</Text>
                  </TouchableOpacity>
                <Text style={styles.nameText}></Text>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.greeting}>
            Bonjour, {`${user?.firstName ?? ""} ${user?.lastName ?? ""}`}
          </Text>
          <View style={styles.timeSlots}>
            {Array.from({ length: 10 }, (_, index) => (
              <Text key={index} style={styles.timeSlot}>{`${
                8 + index
              }:00`}</Text>
            ))}
          </View>
          <View style={styles.row}>
            <Text style={styles.date}>18/06/2024</Text>
            <TouchableOpacity style={styles.openButton}>
              <Text style={styles.openButtonText}>Ouvrir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nextTask}>
          <View style={styles.taskHeader}>
            <Text style={styles.nextTaskTitle}>Prochaine tâche</Text>
            <Text style={styles.nextTaskTime}>Prévu à 16 h</Text>
          </View>
          <Text style={styles.nextTaskActivity}>Activité sportif</Text>
          <Text style={styles.nextTaskDescription}>
            Aller à la salle de Gym
          </Text>
        </View>
        <View style={styles.container1}>
          <View style={styles.objectives}>
            <MaterialIcons
              name="chevron-left"
              size={24}
              color="white"
              style={styles.arrowIcon}
            />
            <View style={styles.content1}>
              <Text style={styles.objectivesTitle}>Mes objectifs</Text>
              <Text style={styles.objectiveSubtitle}>Perdre du poids</Text>
              <Text style={styles.objectivesDescription}>
                Dans 1 mois 2 semaines et 3 jours
              </Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="white"
              style={styles.arrowIcon}
            />
          </View>
        </View>
        <View style={styles.schedule}>
          <Image
            source={require("../assets/home/user.png")}
            style={styles.scheduleIcon}
          />
          <View>
            <Text style={styles.scheduleTitle}>Votre emploi du temps</Text>
            <Text style={styles.scheduleDescription}>
              Quelle votre prochaine étape
            </Text>
          </View>
        </View>
        <View style={styles.wellbeing}>
          <Text style={styles.wellbeingTitle}>Pour votre bien-être</Text>
          <Text style={styles.wellbeingDescription}>
            Gagnez des points ZEN pour chaque article lu afin de collecter un
            maximum et de les convertir en cadeaux auprès de nos partenaires.
          </Text>
          <ScrollView horizontal={true} contentContainerStyle={styles.articles}>
            {articles.map((article, index) => (
              <View key={index} style={styles.article}>
                <Image source={article.image} style={styles.articleImage} />
                <Text style={styles.articlePoints}>+ {article.points}</Text>
                <View style={styles.articleOverlay}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View>
          <LinearGradient
            colors={["#3A98F5", "#00E9B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardContainerGradient}
          >
            <Image
              source={require("../assets/home/EduZen Zed 01.png")}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Demander à Zed</Text>
              <Text style={styles.cardText}>
                Permettez à Zed de mieux vous connaître afin qu'il puisse vous
                soutenir tout au long de votre expérience avec nous.
              </Text>
              <TouchableOpacity style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Discuter avec Zed</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <BottomNavBar
          navigation={navigation}
          currentScreen={currentScreen}
          email={email}
        />
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  mainContent: {
    padding: 20,
    marginBottom: 60, // Adjust based on BottomNavBar height
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsText: {
    fontSize: 18,
    color: "#00C853",
    marginRight: 10,
  },
  idContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  idText: {
    fontSize: 16,
    color: "#757575",
  },
  content: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timeSlots: {
    marginBottom: 20,
  },
  timeSlot: {
    fontSize: 16,
    color: "#9E9E9E",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  openButton: {
    backgroundColor: "#6200EA",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  openButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: "#3F3A64",
    textAlign: "center",
  },
  nextTask: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nextTaskTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },
  nextTaskTime: {
    fontSize: 14,
    color: "#20AD96",
  },
  nextTaskActivity: {
    fontSize: 13,
    color: "grey",
    marginTop: 10,
  },
  nextTaskDescription: {
    fontSize: 15,
    marginTop: 5,
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  objectives: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 10, // Reduced padding for smaller card
    borderRadius: 10,
    marginBottom: 20,
    width: "100%", // Adjust width as needed
    justifyContent: "space-between", // Align arrows at the ends
  },
  content1: {
    alignItems: "center",
  },
  objectivesTitle: {
    fontSize: 13,
    color: "#20AD96",
    marginBottom: 5, // Reduced margin
  },
  objectiveSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5, // Reduced margin
  },
  objectivesDescription: {
    fontSize: 14,
    color: "#20AD96",
  },
  arrowIcon: {},
  schedule: {
    backgroundColor: "#E0F7FA",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scheduleDescription: {
    fontSize: 13,
  },
  wellbeing: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  wellbeingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wellbeingDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: "grey",
  },
  articles: {
    flexDirection: "row",
    paddingHorizontal: 0, // Remove padding
  },
  article: {
    width: 250,
    height: 200, // Adjust height as needed
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  articleImage: {
    width: "150%",
    height: "100%",
  },
  articleOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(192,192,192,0.4)",
    padding: 5,
  },
  articlePoints: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FFFFFF",
    color: "#20AD96",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: "bold",
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  // cardContainer: {
  //   flexDirection: 'row',
  //   backgroundColor: '#E0F7FA',
  //   padding: 20,
  //   borderRadius: 10,
  //   marginBottom: 20,
  //   justifyContent: 'space-between',

  // },
  cardImage: {
    top: 18,
    width: width * 0.19,
    height: height * 0.12,
    marginRight: 30,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 12,
    // color:'#FFFFFF',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#3F3A64",
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    // alignSelf:"stretch",
    width: width * 0.5,
  },
  cardContainerGradient: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 70,
  },
  cardButtonText: {
    color: "blue",
    fontSize: 14,
  },
  rewardsContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 40,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  rewards: {
    flexDirection: "row",
  },
  rewardCard: {
    width: width * 0.7,
    backgroundColor: "#F5F1ED",
    padding: 20,
    borderRadius: 10,
    marginRight: 20,
  },
  rewardPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#20AD96",
    marginBottom: 5,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#3F3A64",
  },
  rewardPartner: {
    fontSize: 14,
    color: "#757575",
  },
});

export default HomeScreen;
