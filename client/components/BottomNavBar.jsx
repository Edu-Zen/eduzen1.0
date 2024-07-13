import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import homeIcon from '../assets/home/Home.png';
import agendaIcon from '../assets/home/agenda.png';
import addIcon from '../assets/home/add.png';
import heartIcon from '../assets/home/heart.png';
import diamondIcon from '../assets/home/diamond.png';

const { width, height } = Dimensions.get('window');
const iconSize = width * 0.07;
const tabHeight = height * 0.08;

const BottomNavBar = ({ navigation, currentScreen, email }) => {
    ; // Assuming email is passed as a parameter to the BottomNavBar
console.log(email,'in bottomnav')
    const routes = [
        { name: 'Home', icon: homeIcon, route: 'Home' },
        { name: 'Agenda', icon: agendaIcon, route: 'Agenda' },
        { name: 'Add', icon: addIcon, route: 'Add' },
        { name: 'Heart', icon: heartIcon, route: 'Bien-étre' },
        { name: 'Diamond', icon: diamondIcon, route: 'PremiumScreen' },
    ];

    const navigateToScreen = (routeName) => {
        navigation.navigate(routeName, { email });
    };

    return (
        <View style={styles.container}>
            {routes.map((route, index) => {
                const isActive = currentScreen === route.route;
                return (
                    <TouchableOpacity
                        key={index}
                        style={styles.tab}
                        onPress={() => navigateToScreen(route.route)}
                    >
                        {isActive ? (
                            <LinearGradient
                                colors={['#3A98F5', '#00E9B8']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.activeTab}
                            >
                                <Image
                                    source={route.icon}
                                    style={[styles.icon, styles.activeIcon]}
                                />
                            </LinearGradient>
                        ) : (
                            <Image
                                source={route.icon}
                                style={styles.icon}
                            />
                        )}
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
        height: tabHeight,
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
        borderRadius: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: iconSize * 2,
        height: iconSize * 2,
    },
    icon: {
        width: iconSize,
        height: iconSize,
        resizeMode: 'contain',
    },
    activeIcon: {
        tintColor: '#FFFFFF',
    },
});

export default BottomNavBar;
