import React, { useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ navigation }) {
  const [tasks, setTasks] = useState([]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addTaskContainer}>
        <Button 
          title="Add Task" 
          color="#27ae60" 
          onPress={() => navigation.navigate('Add Task', { 
            tasks, 
            setTasks 
          })} 
        />
      </View>
      {tasks.length === 0 ? (
        <Text style={styles.noTasksText}>No tasks available. Click "Add Task" to create one!</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem 
              task={item} 
              onDelete={deleteTask} 
              onToggleComplete={toggleTaskCompletion}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  addTaskContainer: {
    margin: 10,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#7f8c8d',
  },
});
