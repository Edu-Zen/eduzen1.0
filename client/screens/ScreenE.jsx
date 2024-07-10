import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Dimensions ,Text} from 'react-native';
import exampleImage from '../assets/splash.png';

const ScreenE = ({ navigation }) => {
    // Navigate to HomeScreen after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
            console.log("here passing")
             // Replace current screen with HomeScreen
        }, 4000); // 5000 milliseconds = 5 seconds

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={exampleImage}
                    style={styles.logo}
                    resizeMode="contain"   // Adjust the resizeMode as needed
                />
            </View>
           <Text>En cours de création de votre expérience</Text>
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#20AD96" />
            </View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Example background color
    },
    logoContainer: {
        width: windowWidth * 0.5, // Example width based on screen width
        height: windowHeight * 0.2, // Example height based on screen height
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20, // Adjust as needed for spacing between logo and activity indicator
    },
    logo: {
        width: '100%',
        height: '100%',
        maxWidth: '100%', // Ensure the image doesn't exceed its original size
        maxHeight: '100%', // Ensure the image doesn't exceed its original size
    },
    activityIndicatorContainer: {
        marginTop: 30, // Adjust as needed for spacing between logo and activity indicator
    },
});

export default ScreenE;
