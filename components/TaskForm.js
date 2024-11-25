import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskForm({ route, navigation }) {
  const { tasks, setTasks } = route.params;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const categories = ['Work', 'Personal', 'Shopping', 'Fitness', 'Study', 'Travel', 'Other'];

  useEffect(() => {
    // Request notification permissions
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please enable notifications in settings');
      }
    })();
  }, []);

  const scheduleNotification = async (taskTitle, taskDateTime) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `Your task "${taskTitle}" is due now!`,
        sound: true,
      },
      trigger: taskDateTime,
    });
  };

  const handleAddTask = () => {
    if (!title || !category) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    // Combine date and time
    const combinedDateTime = new Date(
      date.getFullYear(), 
      date.getMonth(), 
      date.getDate(), 
      time.getHours(), 
      time.getMinutes()
    );

    
    const newTask = {
      id: Date.now(),
      title,
      category,
      dateTime: combinedDateTime.toISOString(),
      completed: false  // Add this line to initialize completed status
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    route.params?.setTasks?.(updatedTasks);

    setTasks([...tasks, newTask]);
    scheduleNotification(title, combinedDateTime);
    navigation.goBack();
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        placeholderTextColor="#000"
        value={title}
        onChangeText={setTitle}
      />

      {/* Category Selector */}
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={{ color: category ? '#000' : '#888' }}>
          {category || 'Select a Category'}
        </Text>
      </TouchableOpacity>

      {/* Modal for Dropdown */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {categories.map((cat, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => handleCategorySelect(cat)}
              >
                <Text style={styles.modalText}>{cat}</Text>
              </TouchableOpacity>
            ))}
            <Button title="Close" onPress={() => setModalVisible(false)} color="#ff6347" />
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      <TouchableOpacity style={styles.input} onPress={() => setDatePickerVisible(true)}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setDatePickerVisible(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      {/* Time Picker */}
      <TouchableOpacity style={styles.input} onPress={() => setTimePickerVisible(true)}>
        <Text>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {isTimePickerVisible && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setTimePickerVisible(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      <Button title="Add Task" onPress={handleAddTask} color="#27ae60" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
});
