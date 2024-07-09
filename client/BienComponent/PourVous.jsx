import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PourVous = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pour Vous</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 50, // Adjust this value as needed
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default PourVous;
