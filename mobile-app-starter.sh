#!/bin/bash

# Define the base path for your Expo app within the Nx workspace
APP_NAME="mobile-expo"
APP_PATH="apps/$APP_NAME/src/app"

echo "Starting to create app structure and files for $APP_PATH..."

# --- 1. Create Core Directories ---
echo "Creating core directories..."
mkdir -p "$APP_PATH/components/base"
mkdir -p "$APP_PATH/components/specific"
mkdir -p "$APP_PATH/config"
mkdir -p "$APP_PATH/contexts"
mkdir -p "$APP_PATH/hooks"
mkdir -p "$APP_PATH/navigation"
mkdir -p "$APP_PATH/services"
mkdir -p "$APP_PATH/screens/onboarding"
mkdir -p "$APP_PATH/screens/auth"
mkdir -p "$APP_PATH/screens/home"
mkdir -p "$APP_PATH/screens/create"
mkdir -p "$APP_PATH/screens/review"
mkdir -p "$APP_PATH/screens/profile"
mkdir -p "$APP_PATH/types"

# --- 2. Create and Populate Config Files ---
echo "Creating and populating config files..."

# app.constants.ts (Tamagui config tidak perlu dibuat karena akan dari @glibs/ui)
cat <<EOF > "$APP_PATH/config/app.constants.ts"
export const API_BASE_URL = 'https://api.yourdomain.com';
export const APP_VERSION = '1.0.0';
// Add any other global constants here
EOF

# --- 3. Create and Populate Contexts & Hooks (Basic Auth Placeholder) ---
echo "Creating and populating contexts and hooks..."

# AuthContext.tsx
cat <<EOF > "$APP_PATH/contexts/AuthContext.tsx"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user'; // Assume User type exists
import { Text, View, ActivityIndicator } from 'react-native'; // Using basic RN components

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading auth status on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      // In a real app, you would check AsyncStorage for a token here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // For now, let's assume not authenticated by default
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    };
    checkAuthStatus();
  }, []);

  const login = async (token: string, userData: User) => {
    // In a real app, save token to AsyncStorage
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    // In a real app, clear token from AsyncStorage
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
EOF

# hooks/useAuth.ts (Re-export from context for cleaner import)
cat <<EOF > "$APP_PATH/hooks/useAuth.ts"
export { useAuth } from '../contexts/AuthContext';
EOF

# --- 4. Create and Populate Navigation Files ---
echo "Creating and populating navigation files..."

# navigation/types.ts
cat <<EOF > "$APP_PATH/navigation/types.ts"
import { NavigatorScreenParams } from '@react-navigation/native';

// Type for AuthStack
export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  // Add other auth routes here
};

// Type for MainStack (after login)
export type MainStackParamList = {
  Home: undefined;
  Create: undefined;
  Review: undefined;
  Profile: undefined;
  // Add other authenticated routes here
};

// Type for the overall AppNavigator
export type AppStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
  // Add other top-level routes if any (e.g., initial loading screen outside auth/main flow)
};

// Used for type-hinting useNavigation and useRoute hooks globally
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
EOF

# navigation/AuthStack.tsx
cat <<EOF > "$APP_PATH/navigation/AuthStack.tsx"
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* Add other auth screens here */}
    </Stack.Navigator>
  );
};
EOF

# navigation/MainStack.tsx
cat <<EOF > "$APP_PATH/navigation/MainStack.tsx"
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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create" component={CreateScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* Add other main screens here */}
    </Stack.Navigator>
  );
};
EOF

# navigation/AppNavigator.tsx
cat <<EOF > "$APP_PATH/navigation/AppNavigator.tsx"
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { AppStackParamList } from './types';
import { useAuth } from '../hooks/useAuth';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'; // Using basic RN components

const Stack = createNativeStackNavigator<AppStackParamList>();

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
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
EOF

# --- 5. Create and Populate Basic Screen Files (Using React Native core components) ---
echo "Creating and populating basic screen files..."

# Helper function for screen content
create_screen_content() {
  local SCREEN_NAME=$1
  local NAV_TARGET=$2
  local NAV_STACK=$3 # 'Auth' or 'Main'
  local NAV_TYPE="NativeStackNavigationProp<${NAV_STACK}StackParamList, '${SCREEN_NAME}'>"

  cat <<EOF
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ${NAV_STACK}StackParamList, AppStackParamList } from '../../navigation/types';

type ${SCREEN_NAME}ScreenNavigationProp = ${NAV_TYPE};
type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>; // For top-level navigation

export function ${SCREEN_NAME}Screen() {
  const navigation = useNavigation<${SCREEN_NAME}ScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>();

  const handlePress = () => {
    ${NAV_TARGET}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ${SCREEN_NAME} Screen!</Text>
      <Text style={styles.text}>This is a placeholder for ${SCREEN_NAME} content.</Text>
      <Button title="Go to Next Screen" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
});

export default ${SCREEN_NAME}Screen;
EOF
}

# OnboardingScreen.tsx
create_screen_content "Onboarding" "navigation.replace('Login');" "Auth" > "$APP_PATH/screens/onboarding/OnboardingScreen.tsx"

# LoginScreen.tsx
create_screen_content "Login" "appNavigation.replace('Main'); // Simulate successful login, navigate to MainStack" "Auth" > "$APP_PATH/screens/auth/LoginScreen.tsx"

# RegisterScreen.tsx
create_screen_content "Register" "navigation.replace('Login'); // After register, go back to Login" "Auth" > "$APP_PATH/screens/auth/RegisterScreen.tsx"

# HomeScreen.tsx
create_screen_content "Home" "navigation.navigate('Create'); // Example navigation" "Main" > "$APP_PATH/screens/home/HomeScreen.tsx"

# CreateScreen.tsx
create_screen_content "Create" "navigation.navigate('Review'); // Example navigation" "Main" > "$APP_PATH/screens/create/CreateScreen.tsx"

# ReviewScreen.tsx
create_screen_content "Review" "navigation.navigate('Profile'); // Example navigation" "Main" > "$APP_PATH/screens/review/ReviewScreen.tsx"

# ProfileScreen.tsx
create_screen_content "Profile" "console.log('User is on Profile screen'); // No further navigation here for now" "Main" > "$APP_PATH/screens/profile/ProfileScreen.tsx"

# --- 6. Create and Populate Basic Service Files (Placeholders) ---
echo "Creating and populating basic service files..."

# api.ts
cat <<EOF > "$APP_PATH/services/api.ts"
import axios from 'axios';
import { API_BASE_URL } from '../config/app.constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptors (e.g., for auth token)
api.interceptors.request.use(async (config) => {
  // const token = await getAuthToken(); // If you implement token storage
  // if (token) {
  //   config.headers.Authorization = \`Bearer \${token}\`;
  // }
  return config;
});

// Add response interceptors (e.g., for error handling, token refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors, e.g., redirect to login
      console.log('Unauthorized request, redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default api;
EOF

# auth.service.ts
cat <<EOF > "$APP_PATH/services/auth.service.ts"
import api from './api';
import { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth'; // Assume these types

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Login attempt with:', payload);
    return { token: 'mock-token-123', user: { id: '1', name: payload.email, email: payload.email } };
  },
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Register attempt with:', payload);
    return { token: 'mock-token-456', user: { id: '2', name: payload.email, email: payload.email } };
  },
  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log('User logged out');
  },
};
EOF

# user.service.ts
cat <<EOF > "$APP_PATH/services/user.service.ts"
import api from './api';
import { User } from '../types/user'; // Assume User type

export const userService = {
  getProfile: async (): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Fetching user profile');
    return { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
  },
};
EOF

# --- 7. Create and Populate Basic Type Files ---
echo "Creating and populating basic type files..."

# auth.ts
cat <<EOF > "$APP_PATH/types/auth.ts"
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}
EOF

# common.ts
cat <<EOF > "$APP_PATH/types/common.ts"
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}
EOF

# user.ts
cat <<EOF > "$APP_PATH/types/user.ts"
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
EOF

# --- 8. Update App.tsx (if it exists, otherwise create) ---
echo "Updating App.tsx..."

# Ensure react-native-screens is enabled at the very top
APP_TSX_CONTENT=$(cat <<EOF
// apps/$APP_NAME/src/app/App.tsx
import 'react-native-screens/enableScreens'; // IMPORTANT: This must be at the very top

import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigation/AppNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';


export function App() {
  // Anda bisa menambahkan logic loading font di sini jika ada.
  // Untuk saat ini, kita asumsikan tidak ada loading font khusus di App.tsx.

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
EOF
)

echo "$APP_TSX_CONTENT" > "$APP_PATH/App.tsx"


echo "Structure and basic files created and populated successfully for apps/$APP_NAME!"
echo "Remember to install npm/yarn dependencies inside apps/$APP_NAME if you haven't already:"
echo "cd apps/$APP_NAME"
echo "npm install @react-navigation/native @react-navigation/native-stack"
echo "npx expo install react-native-screens react-native-safe-area-context"
echo "Then, you can try running: nx serve $APP_NAME"