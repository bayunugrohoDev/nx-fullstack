import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList, AppStackParamList, RootStackParamList } from '../../navigation/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Profile'>;
type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>; // For top-level navigation

export function ProfileScreen() {
  // const navigation = useNavigation<ProfileScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>();

  const handlePress = () => {
    console.log('User is on Profile screen'); // No further navigation here for now
    appNavigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Profile Screen!</Text>
      <Text style={styles.text}>This is a placeholder for Profile content.</Text>
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

export default ProfileScreen;
