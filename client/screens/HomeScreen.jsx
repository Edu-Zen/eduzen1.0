import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList
} from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { API_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation, route }) => {
  const currentScreen = route.name;
  const email = route.params?.email;
  const [user, setUser] = useState(null);
  const [initials, setInitials] = useState("");
  const [events, setEvents] = useState([]);
  const [todaysDate, setTodaysDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    setTodaysDate(formattedDate);
  }, []);

  useFocusEffect(
    useCallback(() => {
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


      const fetchEvents = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/api/alls/getByEmailAndToday/${email}`
          );
          console.log(response.data, "results");
          setEvents(response.data);
        } catch (error) {
          // console.error("Error fetching events:", error);
        }
      };

      fetchEvents();
    fetchUser();

    }, [email])
  );

  const renderEvent = ({ item }) => {
    const eventTime = new Date(item.timeOf);
    const hours = eventTime.getHours();
    const minutes = eventTime.getMinutes().toString().padStart(2, '0');
    return (
      <Text style={styles.timeSlot}>
        {`${hours}:${minutes} - ${item.nameOf}`}
      </Text>
    );
  };
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
    // your rewards array
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
                  onPress={() => navigation.navigate("MyProfile", { email })}
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
          {events.length > 0 ? (
  events.map((event, index) => {
    const eventTime = new Date(event.timeOf);
    const hours = eventTime.getHours();
    const minutes = eventTime.getMinutes().toString().padStart(2, '0');
    return (
      <Text key={index} style={styles.timeSlot}>
        {`${hours}:${minutes} - ${event.nameOf}`}
      </Text>
    );
  })
) : (
              <Text style={styles.timeSlot}>
                Aucun événement prévu pour aujourd'hui
              </Text>
            )}
          </View>
          <View style={styles.row}>
            <Text style={styles.date}>{todaysDate}</Text>
            <TouchableOpacity style={styles.openButton}>
              <Text onPress={() => setModalVisible(true)} style={styles.openButtonText}>Ouvrir</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Evenements pour le : {todaysDate}
              </Text>
              <FlatList
                data={events}
                renderItem={renderEvent}
                keyExtractor={(item, index) =>
                  item._id?.toString() ?? `fallback-${index}`
                }
                contentContainerStyle={styles.listContainer}
              />
                   <LinearGradient
                colors={['#3A98F5', '#00E9B8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.closeButtonContainer}
              >
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 60,
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
    backgroundColor: "#00C853",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  openButtonText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  nextTask: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  nextTaskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nextTaskTime: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  nextTaskActivity: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nextTaskDescription: {
    fontSize: 14,
    color: "#757575",
  },
  container1: {
    marginBottom: 20,
  },
  objectives: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#3A98F5",
    borderRadius: 10,
  },
  arrowIcon: {
    padding: 10,
  },
  content1: {
    flex: 1,
    alignItems: "center",
  },
  objectivesTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  objectiveSubtitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 5,
  },
  objectivesDescription: {
    fontSize: 14,
    color: "#FFF",
  },
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
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  wellbeingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  wellbeingDescription: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 10,
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
  cardContainerGradient: {
    borderRadius: 10,
    flexDirection: "row",
    padding: 20,
    marginBottom: 20,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: "#00E9B8",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
  },
  cardButtonText: {
    fontSize: 14,
    color: "#FFF",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    // color:'grey'
  },
  listContainer: {
    width: '100%',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius:10
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});




export default HomeScreen;
