import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList, AppStackParamList } from '../../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Home'>;
type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>; // For top-level navigation

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>();

  const handlePress = () => {
    navigation.navigate('Create'); // Example navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen!</Text>
      <Text style={styles.text}>This is a placeholder for Home content.</Text>
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

export default HomeScreen;
