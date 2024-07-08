import React from 'react';
import { View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import SvgUri from 'react-native-svg-uri'; // Import SvgUri from react-native-svg
import homeIcon from '../assets/home/Home.png'; // Adjust the path as per your project structure

const BottomNavBar = ({ navigation }) => {
    // Define navigation routes and SVG icon paths
    const routes = [
        { name: 'Home', icon: homeIcon, route: 'HomeScreen' },
        // Add more routes as needed
    ];

    // Function to handle navigation to selected route
    const navigateToScreen = (routeName) => {
        navigation.navigate(routeName);
    };

    return (
        <View style={styles.container}>
            {routes.map((route, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.tab}
                    onPress={() => navigateToScreen(route.route)}
                >
                    {/* Use SvgUri to render SVG icons */}
                    <Image
                        width="24"
                        height="24"
                        source={route.icon}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        height: 60,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomNavBar;
