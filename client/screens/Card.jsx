// Card.js
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Card = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('CardDetails', { item })}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.overlay}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{item.category}</Text>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{item.points}</Text>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryContainer: {
    backgroundColor: 'rgba(192,192,192,0.4)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  category: {
    fontSize: 16,
    color: '#ffffff',
  },
  pointsContainer: {
    backgroundColor: '#20AD96',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  points: {
    fontSize: 16,
    color: 'white',
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: '#333333',
  },
});

export default Card;
