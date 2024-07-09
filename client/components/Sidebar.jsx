import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.sidebarContainer}>
            <TouchableOpacity style={styles.menuItem}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.menuText}>Planning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.menuText}>Jour</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.menuText}>Semaine</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.menuText}>Mois</Text>
            </TouchableOpacity>
            <Text style={styles.filterHeader}>Filtrer par</Text>
            <TouchableOpacity style={styles.filterItem} onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.filterText}>Cours</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterItem} onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.filterText}>Taches</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterItem} onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.filterText}>Evenements</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterItem} onPress={() => navigation.navigate('Settings')}>
                <Image source={require('../assets/home/add.png')} style={styles.logo} />
                <Text style={styles.filterText}>Objectif</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sidebarContainer: {
        width: 250,
        backgroundColor: '#f2f2f2', // Light grey background color
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },
    logo: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    menuText: {
        fontSize: 18,
        color: '#34495e',
    },
    filterHeader: {
        fontSize: 16,
        color: '#34495e',
        marginBottom: 10,
        marginTop: 20,
        paddingLeft: 10,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
    },
    filterText: {
        fontSize: 16,
        color: '#34495e',
    },
});

export default Sidebar;
