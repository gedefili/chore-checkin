import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, BottomTabParamList } from '../types';
import { useApp } from '../context/AppContext';
import WelcomeScreen from '../screens/WelcomeScreen';
import FamilySetupScreen from '../screens/FamilySetupScreen';
import HomeScreen from '../screens/HomeScreen';
import ChoresScreen from '../screens/ChoresScreen';
import FamilyScreen from '../screens/FamilyScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChoreDetailScreen from '../screens/ChoreDetailScreen';
import ChoreCompletionScreen from '../screens/ChoreCompletionScreen';
import CreateChoreScreen from '../screens/CreateChoreScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chores') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'Family') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chores" component={ChoresScreen} />
      <Tab.Screen name="Family" component={FamilyScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { currentUser } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!currentUser ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="FamilySetup" component={FamilySetupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="ChoreDetail" component={ChoreDetailScreen} options={{ headerShown: true, title: 'Chore Details' }} />
            <Stack.Screen name="ChoreCompletion" component={ChoreCompletionScreen} options={{ headerShown: true, title: 'Complete Chore' }} />
            <Stack.Screen name="CreateChore" component={CreateChoreScreen} options={{ headerShown: true, title: 'Create Chore' }} />
            <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: true, title: 'Take Photo' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
