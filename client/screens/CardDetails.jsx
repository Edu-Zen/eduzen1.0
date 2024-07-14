import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const CardDetails = ({ route }) => {
  const { title, image, points, category, description } = route.params.item;

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.points}>Points: {points}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333333',
  },
  category: {
    fontSize: 18,
    color: '#666666',
    marginVertical: 5,
  },
  points: {
    fontSize: 18,
    color: '#20AD96',
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    marginTop: 10,
    paddingBottom: 200
  },
});

export default CardDetails;
