import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import homeIcon from '../assets/home/Home.png';
import agendaIcon from '../assets/home/agenda.png';
import addIcon from '../assets/home/add.png';
import heartIcon from '../assets/home/heart.png';
import diamondIcon from '../assets/home/diamond.png'; // Corrected spelling

const BottomNavBar = ({ navigation, currentScreen }) => {
    // Define navigation routes and icon paths
    const routes = [
        { name: 'Home', icon: homeIcon, route: 'Home' },
        { name: 'Agenda', icon: agendaIcon, route: 'Agenda' },
        { name: 'Add', icon: addIcon, route: 'Add' },
        { name: 'Heart', icon: heartIcon, route: 'Bien-étre' },
        { name: 'Diamond', icon: diamondIcon, route: 'DiamondScreen' },
        // Add more routes as needed
    ];

    // Function to handle navigation to selected route
    const navigateToScreen = (routeName) => {
        navigation.navigate(routeName);
    };

    return (
        <View style={styles.container}>
            {routes.map((route, index) => {
                // Check if the current route matches the current screen
                const isActive = currentScreen === route.route;
                console.log(`Current screen: ${currentScreen}, Route: ${route.route}, Is active: ${isActive}`);
                return (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tab, isActive && styles.activeTab]} // Apply activeTab style if isActive is true
                        onPress={() => navigateToScreen(route.route)}
                    >
                        <Image
                            source={route.icon}
                            style={[styles.icon, isActive && styles.activeIcon]}
                        />
                    </TouchableOpacity>
                );
            })}
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
        paddingVertical: 10,
    },
    activeTab: {
        backgroundColor: '#20AD96', // Adjust background color for active tab
        borderRadius: 10,
        paddingVertical: 10,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    activeIcon: {
        tintColor: '#FFFFFF', // Adjust icon color for active tab
    },
});

export default BottomNavBar;
