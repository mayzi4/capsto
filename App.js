Almost out of storage … If you run out of space, you can't save to Drive or back up Google Photos.
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CitizenDashboard from './src/screens/CitizenDashboard';
import ResponderDashboard from './src/screens/ResponderDashboard';
import AdminDashboard from './src/screens/AdminDashboard';
import ReportEmergency from './src/screens/ReportEmergency';
import EmergencyList from './src/screens/EmergencyList';
import EmergencyDetails from './src/screens/EmergencyDetails';
import EmergencyContacts from './src/screens/EmergencyContacts';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Citizen Tab Navigator
function CitizenTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Report') iconName = 'alert-circle';
          else if (route.name === 'Emergencies') iconName = 'format-list-bulleted';
          else if (route.name === 'Contacts') iconName = 'phone';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={CitizenDashboard} />
      <Tab.Screen name="Report" component={ReportEmergency} />
      <Tab.Screen name="Emergencies" component={EmergencyList} />
      <Tab.Screen name="Contacts" component={EmergencyContacts} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Responder Tab Navigator
function ResponderTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Emergencies') iconName = 'alert';
          else if (route.name === 'Contacts') iconName = 'phone';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={ResponderDashboard} />
      <Tab.Screen name="Emergencies" component={EmergencyList} />
      <Tab.Screen name="Contacts" component={EmergencyContacts} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Admin Tab Navigator
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Emergencies') iconName = 'alert';
          else if (route.name === 'Profile') iconName = 'account';
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="Emergencies" component={EmergencyList} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setUserRole(userData.role);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  const getHomeScreen = () => {
    if (userRole === 'admin') return AdminTabs;
    if (userRole === 'responder') return ResponderTabs;
    return CitizenTabs;
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={getHomeScreen()} />
            <Stack.Screen name="EmergencyDetails" component={EmergencyDetails} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
