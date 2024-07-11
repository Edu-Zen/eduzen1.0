import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image } from 'react-native';
import axios from 'axios';

function ChatBot() {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [showResponseImage, setShowResponseImage] = useState(false);

    const sendMessage = async () => {
        if (query.trim() === '') return;

        setMessages([...messages, { text: query, isUser: true }]);
        setQuery('');

        try {
            setShowResponseImage(true); // Show response image
            const response = await axios.post('http://192.168.1.149:3000/chatbot', { query });
            setMessages(prevMessages => [...prevMessages, { text: response.data.response, isUser: false }]);
        } catch (error) {
            console.error(error);
            setMessages(prevMessages => [...prevMessages, { text: 'Error processing request', isUser: false }]);
        } finally {
            setTimeout(() => {
                setShowResponseImage(false); // Revert back to original image
            }, 2000); // Adjust the delay time as needed (in milliseconds)
        }
    };

    return (
        <View style={styles.container}>
            {showResponseImage ? (
                <Image
                    source={require('../assets/home/Zed2.png')}
                    style={styles.headerImage}
                />
            ) : (
                <Image
                    source={require('../assets/home/Zed.png')}
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
                <Button title="Send" onPress={sendMessage} />
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
        width: '80%',
        height: 200,
        resizeMode: 'cover',
        alignSelf: 'center',
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
