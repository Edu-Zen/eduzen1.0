import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { API_URL } from '@env';

const EditProfile = ({ navigation, route }) => {
  const email = route.params?.email;
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    educationLevel: '',
    school: '',
    dateOfBirth: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/students/email/${email}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [email]);

  const handleSave = async () => {
    try {
      await axios.put(`${API_URL}/api/students/update/${email}`, user);
      navigation.navigate('MyProfile', { email, updated: true }); // Navigate back and pass updated flag
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modifier mon profil</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Information générale</Text>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={user.firstName}
            onChangeText={(text) => setUser({ ...user, firstName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={user.lastName}
            onChangeText={(text) => setUser({ ...user, lastName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date de naissance"
            value={user.dateOfBirth}
            onChangeText={(text) => setUser({ ...user, dateOfBirth: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Genre"
            value={user.gender}
            onChangeText={(text) => setUser({ ...user, gender: text })}
          />
          <Text style={styles.label}>Contact et adresse</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Téléphone"
            value={user.phone}
            onChangeText={(text) => setUser({ ...user, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Rue"
            value={user.street}
            onChangeText={(text) => setUser({ ...user, street: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ville"
            value={user.city}
            onChangeText={(text) => setUser({ ...user, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Code Postal"
            value={user.postalCode}
            onChangeText={(text) => setUser({ ...user, postalCode: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Pays"
            value={user.country}
            onChangeText={(text) => setUser({ ...user, country: text })}
          />
          <Text style={styles.label}>Éducation</Text>
          <TextInput
            style={styles.input}
            placeholder="Niveau Scolaire"
            value={user.educationLevel}
            onChangeText={(text) => setUser({ ...user, educationLevel: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Établissement Scolaire"
            value={user.school}
            onChangeText={(text) => setUser({ ...user, school: text })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width : width
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    flexGrow: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#6200EA',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default EditProfile;
