import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import StartScreen from './components/StartScreen';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Configure global notification handler
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    // Optional: Handle received notifications
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    // Optional: Handle notification taps
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: { backgroundColor: '#34495e' }, 
          headerTintColor: '#ecf0f1' 
        }}
      >
      <Stack.Screen 
          name="Start" 
          component={StartScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Task List" component={TaskList} />
        <Stack.Screen name="Add Task" component={TaskForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
