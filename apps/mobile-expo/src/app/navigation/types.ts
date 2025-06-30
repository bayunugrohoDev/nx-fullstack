import { NavigatorScreenParams } from '@react-navigation/native';


export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Create: undefined;
  Review: undefined;
  Profile: undefined;
}
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
// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends AppStackParamList {}
//   }
// }
