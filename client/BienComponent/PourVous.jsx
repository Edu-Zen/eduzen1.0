// PourVous.js
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import Card from '../screens/Card';

const { width } = Dimensions.get('window');

const PourVous = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
    width: width,
    marginBottom: 100,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default PourVous;
