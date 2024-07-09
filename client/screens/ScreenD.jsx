import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Button, Platform } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import exampleImage from '../assets/splash.png';

const ScreenD = ({ navigation, route }) => {
    const { email } = route.params;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [genre, setGenre] = useState('');

    const handleContinue = async () => {
        try {
        
            const response = await axios.post(`http://192.168.0.15:5000/api/students/update/${email}`, {
                firstName,
                lastName,
                birthDate: birthDate.toISOString().split('T')[0], // format date to YYYY-MM-DD
                genre,
            });
            Alert.alert('Success', 'Profile updated successfully');
            navigation.navigate('ScreenE');
        } catch (error) {
            if (error.response) {
                console.log(error)
                Alert.alert('Error', error.response.data.message);
            } else if (error.request) {
                Alert.alert('Error', 'No response from server. Please try again later.');
            } else {
                Alert.alert('Error', 'An error occurred. Please try again.');
            }
        }
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthDate;
        setShowDatePicker(Platform.OS === 'ios');
        setBirthDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <Image source={exampleImage} style={styles.logo} />
            <Text style={styles.title}>Créer votre profil</Text>
            <Text style={styles.subtitle}>Faisons connaissance</Text>
            <TextInput
                placeholder="Nom"
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                placeholder="Prénom"
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />
            <TouchableOpacity onPress={showDatepicker}>
                <Text style={[styles.input, styles.dateInput]}>{birthDate.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={birthDate}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            <TextInput
                placeholder="Genre"
                style={styles.input}
                value={genre}
                onChangeText={setGenre}
            />
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continuer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', // Example background color
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
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
    dateInput: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#20AD96',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ScreenD;
