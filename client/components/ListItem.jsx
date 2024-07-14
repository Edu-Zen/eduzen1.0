import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const ListItem = React.memo(({ item }) => {
    return (
      <View style={styles.item}>
        {item ?
(  <View>
      <Text style={styles.date}>Le {item.title}</Text>
      <Text style={styles.itemText}>{item.data[0].type}: Vous avez {item.data[0].name} à cet heure : {item.data[0].time}</Text>
      </View>
):<View>
    <Text>Vous n'avez pas de rappel pour ce jour </Text>
</View>
}
        {console.log(item)}
   
      </View>
    );
  });
  

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    textAlign: "center",
  },
  date: {
    
    fontSize: 16,
    textAlign: "left",
  },
});

export default ListItem;
