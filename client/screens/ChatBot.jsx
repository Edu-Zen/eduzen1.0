// ChatBot.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image } from 'react-native'; // Import Image
import axios from 'axios';

function ChatBot() {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [showResponseImage, setShowResponseImage] = useState(false);

    useEffect(() => {
        const fetchResponse = async () => {
            try {
                setShowResponseImage(true); // Show response image
                const response = await axios.post('http://<YOUR_SERVER_URL>/dialogflow', { query });
                setMessages([...messages, { text: query, isUser: true }, { text: response.data.response, isUser: false }]);
                setQuery('');
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    setShowResponseImage(false); // Revert back to original image
                }, 2000); // Adjust the delay time as needed (in milliseconds)
            }
        };

        if (query !== '') {
            fetchResponse();
        }
    }, [query]);

    return (
        <View style={styles.container}>
            {/* Dynamic Image component */}
            {showResponseImage ? (
                <Image
                    source={require('../assets/home/Zed2.png')} // Replace with your response image URL
                    style={styles.headerImage}
                />
            ) : (
                <Image
                    source={require('../assets/home/Zed.png')} // Replace with your original image URL
                    style={styles.headerImage}
                />
            )}

            <ScrollView style={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <View
                        key={index}
                        style={[
                            styles.message,
                            message.isUser ? styles.userMessage : styles.botMessage,
                        ]}
                    >
                        <Text>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Type your message..."
                />
                <Button title="Send" onPress={() => setQuery(query)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerImage: {
        width: '80%', // Adjust width as needed
        height: 200, // Adjust height as needed
        resizeMode: 'cover', // Image cover style
        alignSelf: 'center', // Center horizontally
    },
    messagesContainer: {
        flex: 1,
        padding: 10,
    },
    message: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#E6E6E6',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default ChatBot;
