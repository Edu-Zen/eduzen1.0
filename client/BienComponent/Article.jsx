// Articles.js
import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import Card from '../screens/Card';

const { width } = Dimensions.get('window');

const Articles = ({ data }) => {
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
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
    width: width,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

export default Articles;
