import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Your main screen content here */}
            <Text>Main Screen Content</Text>
            {/* Bottom Navigation Bar */}
            <BottomNavBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
});

export default HomeScreen;
