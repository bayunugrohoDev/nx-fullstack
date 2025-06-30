// apps/mobile-expo/src/app/App.tsx
// import 'react-native-screens/enableScreens'; // IMPORTANT: This must be at the very top

import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { AuthProvider } from "./contexts/AuthContext";
import { TamaguiProvider } from "tamagui";
import { config } from "@glibs/ui";

export function App() {
  // Anda bisa menambahkan logic loading font di sini jika ada.
  // Untuk saat ini, kita asumsikan tidak ada loading font khusus di App.tsx.

  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </TamaguiProvider>
  );
}

export default App;
