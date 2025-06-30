import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { AppStackParamList, RootStackParamList } from './types';
import { useAuth } from '../hooks/useAuth';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'; // Using basic RN components
import HomeScreen from '../screens/home/HomeScreen';
import CreateScreen from '../screens/create/CreateScreen';
import ReviewScreen from '../screens/review/ReviewScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // Basic loading screen using React Native core components
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
      {/* {isAuthenticated ? ( */}
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create" component={CreateScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            {/* Add other main screens here */}
          </Stack.Group>
        
      {/* ) : ( */}
       <Stack.Group screenOptions={{ headerShown: false }}>
             <Stack.Screen name="Onboarding" component={OnboardingScreen} />
             <Stack.Screen name="Login" component={LoginScreen} />
             <Stack.Screen name="Register" component={RegisterScreen} />
             {/* Add other auth screens here */}
           </Stack.Group>
      {/* )} */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
});
