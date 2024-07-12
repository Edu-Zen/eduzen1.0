import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import {
  fetchItems as fetchItemsApi,
  fetchHolidays as fetchHolidaysApi,
} from '../helpers/helperfnAgenda';
import {
  filterItemsByCurrentMonth,
  formatItems,
  formatHolidays,
} from '../helpers/helperfnAgenda';

const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsData = await fetchItemsApi();
        const filteredItems = filterItemsByCurrentMonth(itemsData);
        const formattedItems = formatItems(filteredItems);
        setItems(formattedItems);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch items');
      }

      try {
        const holidaysData = await fetchHolidaysApi();
        const formattedHolidays = formatHolidays(holidaysData);
        setHolidays(formattedHolidays);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to fetch holidays');
      }
    };

    fetchData();
  }, []);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const customMarking = useCallback((date) => {
    let marked = false;
    let customStyles = {};

    if (items[date]) {
      marked = true;
      customStyles = {
        customContainerStyle: {
          backgroundColor: 'blue',
        },
      };
    }

    return { marked, ...customStyles };
  }, [items]);

  const markedDates = {
    ...Object.keys(items).reduce((acc, date) => {
      acc[date] = { marked: true, ...customMarking(date) };
      return acc;
    }, {}),
    ...Object.keys(holidays).reduce((acc, date) => {
      acc[date] = { marked: true, dotColor: 'red' };
      return acc;
    }, {}),
  };

  const renderEvent = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.email}</Text>
      <Text style={styles.itemText}>{item.time}</Text>
      <Text style={styles.itemText}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CalendarList
        markedDates={markedDates}
        onDayPress={onDayPress}
        calendarStyle={styles.calendar}
        markingType={'custom'}
      />
      {selectedDate && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Events for {selectedDate}:</Text>
              <FlatList
                data={items[selectedDate]?.concat(holidays[selectedDate] || [])}
                renderItem={renderEvent}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Adjust the number of columns as needed
                contentContainerStyle={styles.grid}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 10,
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CalendarScreen;
