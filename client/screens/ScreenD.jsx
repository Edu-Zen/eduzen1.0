import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Button, Platform, Modal, Dimensions } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // import Picker
import exampleImage from '../assets/logo.png';

import { API_URL } from '@env';

const { width, height } = Dimensions.get('window');

const ScreenD = ({ navigation, route }) => {
    const { email } = route.params;
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [genre, setGenre] = useState('');

    const handleContinue = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/students/update/${email}`, {
                firstName,
                lastName,
                birthDate: birthDate.toISOString().split('T')[0], // format date to YYYY-MM-DD
                genre,
            });
            Alert.alert('Success', 'Profile updated successfully');
            navigation.navigate('ScreenE', {email});
        } catch (error) {
            if (error.response) {
                console.log(error);
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
            <TouchableOpacity style={styles.dateTouchable} onPress={showDatepicker}>
                <Text style={styles.dateText}>{birthDate.toISOString().split('T')[0]}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                Platform.OS === 'ios' ? (
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={showDatePicker}
                        onRequestClose={() => setShowDatePicker(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <DateTimePicker
                                    value={birthDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChange}
                                />
                                <Button title="Done" onPress={() => setShowDatePicker(false)} />
                            </View>
                        </View>
                    </Modal>
                ) : (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={birthDate}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )
            )}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={genre}
                    style={styles.picker}
                    onValueChange={(itemValue) => setGenre(itemValue)}
                >
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Others" value="Others" />
                </Picker>
            </View>
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
        padding: width * 0.05,
        backgroundColor: '#f0f0f0',
    },
    logo: {
        width: width * 0.45,
        height: width * 0.5,
        marginBottom: height * 0.02,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        color: '#333',
    },
    subtitle: {
        fontSize: width * 0.045,
        marginBottom: height * 0.02,
        color: '#666',
    },
    input: {
        width: '100%',
        height: height * 0.06,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: width * 0.03,
        marginBottom: height * 0.01,
        backgroundColor: '#fff',
    },
    dateTouchable: {
        width: '100%',
        height: height * 0.06,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.01,
        backgroundColor: '#fff',
    },
    dateText: {
        fontSize: width * 0.045,
        color: '#333',
    },
    pickerContainer: {
        width: '100%',
        height: height * 0.06,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: height * 0.02,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    picker: {
        height: height * 0.06,
        width: '100%',
    },
    button: {
        backgroundColor: '#20AD96',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.045,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.8,
        padding: height * 0.03,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default ScreenD;
