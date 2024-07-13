import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Platform, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { API_URL } from '@env';

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
  
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.pickerContainer}>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
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
        <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      <Button title="Ajouter au calendrier" onPress={handleSubmit} />
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
    backgroundColor: "#007BFF", // Blue button
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
  },
});

export default Detail;
