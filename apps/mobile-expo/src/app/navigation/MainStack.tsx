import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CreateScreen } from '../screens/create/CreateScreen';
import { ReviewScreen } from '../screens/review/ReviewScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Group screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* Add other main screens here */}
    </Stack.Group>
  );
};
