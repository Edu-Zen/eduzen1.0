import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image , Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '@env';
import BottomNavBar from '../components/BottomNavBar';

const MyProfile = ({ navigation, route }) => {
  const currentScreen = route.name;
  const { email, updated } = route.params;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students/email/${email}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (email) {
      fetchUser();
    } else {
      console.error('Email is undefined');
    }
  }, [email, updated]);

  if (!user) {
    return <Text>Loading...</Text>;
  }

  const formattedBirthDate = user.birthDate.slice(0, 10);

  // Function to handle image pick
  const pickImage = () => {
    showImagePickerOptions();
  };

  const showImagePickerOptions = () => {
    Alert.alert("Choisir une image", "Choisir une option", [
      { text: "Take a photo", onPress: () => takePhoto() },
      { text: "Choose from gallery", onPress: () => pickImageFromGallery() },
      { text: "Cancel", onPress: () => {}, style: "cancel" },
    ]);
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImageUpload(result.uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleImageUpload(result.uri);
    }
  };

  // Function to handle image upload
  const handleImageUpload = async (uri) => {
    try {
      const base64ImageData = await fetch(uri);
      const blobData = await base64ImageData.blob();

      const formData = new FormData();
      formData.append('profilePicture', {
        uri: uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      const response = await axios.patch(`${API_URL}/api/students/${user._id}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(response.data);
      Alert.alert('Success', 'Profile picture updated successfully');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      Alert.alert('Error', 'There was an error uploading the profile picture.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack({ email,updated })}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon profil</Text>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <TouchableOpacity style={styles.profilePicturePlaceholder} onPress={pickImage}>
            {user.profilePicture ? (
              <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
            ) : (
              <Text style={styles.profilePictureText}>
                {user.firstName[0]}
                {user.lastName[0]}
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text style={styles.profileDate}>{formattedBirthDate}</Text>
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate('EditProfile', { email })}>
            <MaterialIcons name="edit" size={24} color="#4A4A4A" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Menu</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Dire à un(e) ami(e)</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>500</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>À propos de EduZen</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Détails du compte</Text>
        <View style={styles.accountDetails}>
          <TouchableOpacity style={styles.accountItem}>
            <Text style={styles.accountText}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <Text style={styles.accountText}>Zed bot (AI)</Text>
            <View style={styles.premiumBadgeContainer}>
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountItem}>
            <Text style={styles.accountText}>Coaching</Text>
            <View style={styles.premiumBadgeContainer}>
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavBar navigation={navigation} currentScreen={currentScreen} email={email} />
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileContainer: {
    padding: 20,
  },
  profileDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicturePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profilePictureText: {
    fontSize: 24,
    color: '#4A4A4A',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  profileDate: {
    color: '#888',
  },
  editIcon: {
    padding: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  badge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
  },
  accountDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  accountText: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  premiumBadgeContainer: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  premiumBadgeText: {
    color: '#4A4A4A',
  },
});

export default MyProfile;
