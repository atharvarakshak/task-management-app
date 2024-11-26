import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskItem({ task, onDelete, onToggleComplete }) {
  const taskDateTime = new Date(task.dateTime);

  
  return (
    <View style={[
      styles.taskContainer, 
      task.completed && styles.completedTask
    ]}>
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => onToggleComplete(task.id)}
      >
        <Ionicons 
          name={task.completed ? 'checkbox' : 'square-outline'} 
          size={24} 
          color={task.completed ? '#27ae60' : '#000'}
        />
      </TouchableOpacity>
      
      <View style={styles.taskTextContainer}>
        <Text 
          style={[
            styles.taskTitle, 
            task.completed && styles.completedText
          ]}
        >
          {task.title}
        </Text>
        <Text 
          style={[
            styles.taskCategory, 
            task.completed && styles.completedText
          ]}
        >
          Category: {task.category}
        </Text>
        <Text 
          style={[
            styles.taskDueDate, 
            task.completed && styles.completedText
          ]}
        >
          Due: {taskDateTime.toLocaleString()}
        </Text>
      </View>
      
      <Button title="Delete" onPress={() => onDelete(task.id)} color="#c0392b" />
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f4f4f4',
    marginVertical: 8,
    borderRadius: 10,
    borderColor: '#dcdcdc',
    borderWidth: 1,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  taskTextContainer: {
    flex: 1,
  },
  completedTask: {
    backgroundColor: '#e0e0e0',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#7f8c8d',
  },
  taskCategory: {
    fontSize: 14,
    color: '#34495e',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#27ae60',
    marginBottom: 10,
  },
});
