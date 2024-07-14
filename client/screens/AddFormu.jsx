import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { API_URL } from '@env';
import { LinearGradient } from 'expo-linear-gradient';

const Detail = ({ route, navigation }) => {
  const { section, item, email } = route.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [name, setName] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/alls/create`, {
        email,
        dateOf: date,
        nameOf: name,
        timeOf: time,
        categorieOf: section,
        typeOf: item.text,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Item added to calendar');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add item to calendar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Section: {section}</Text>
      <Text style={styles.title}>Item: {item.text}</Text>
  {console.log(item)}
      <TextInput
        style={styles.input}
        placeholder="Enter le nom de l'évenement ..."
        value={name}
        onChangeText={setName}
      />

      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <LinearGradient
            colors={['#3A98F5', '#00E9B8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>sélectionner la date</Text>
          </LinearGradient>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
 
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <LinearGradient
            colors={['#3A98F5', '#00E9B8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sélectionner l'heure</Text>
          </LinearGradient>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      <TouchableOpacity onPress={handleSubmit}>
        <LinearGradient
          colors={['#3A98F5', '#00E9B8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Ajouter au calendrier</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Light grey background
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333", // Dark grey text color
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Detail;
