import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import homeIcon from '../assets/home/Home.png';
import agendaIcon from '../assets/home/agenda.png';
import addIcon from '../assets/home/add.png';
import heartIcon from '../assets/home/heart.png';
import diamondIcon from '../assets/home/diamond.png'; // Corrected spelling
import arrowBackIcon from '../assets/home/arrow-back.png'; // Assuming you have an arrow back icon
import userImage from '../assets/home/user.png'; // Assuming you have a user image

const UpperNavBar = ({ navigation, currentScreen, walletAmount, userName }) => {
    

    // Function to handle navigation to selected route
  

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={arrowBackIcon} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.screenName}>{currentScreen}</Text>
            </View>
            
            <View style={styles.rightContainer}>
                <TouchableOpacity style={styles.walletContainer}>
                    <Text style={styles.walletText}>+1000{walletAmount}</Text>
                </TouchableOpacity>
                <Image source={userImage} style={styles.userImage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
        height: 60,
        position: 'absolute',
        left: 0,
        right: 0,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        padding: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    screenName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    centerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        backgroundColor: '#20AD96',
        borderRadius: 10,
        paddingVertical: 10,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    activeIcon: {
        tintColor: '#FFFFFF',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletContainer: {
        padding: 10,
        backgroundColor: '#20AD96', // Adjust background color for active tab
borderRadius:50
    },
    walletText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
});

export default UpperNavBar;
