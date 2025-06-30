import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList, AppStackParamList } from '../../navigation/types';

type ReviewScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Review'>;
type AppNavigationProp = NativeStackNavigationProp<AppStackParamList>; // For top-level navigation

export function ReviewScreen() {
  const navigation = useNavigation<ReviewScreenNavigationProp>();
  const appNavigation = useNavigation<AppNavigationProp>();

  const handlePress = () => {
    navigation.navigate('Profile'); // Example navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Review Screen!</Text>
      <Text style={styles.text}>This is a placeholder for Review content.</Text>
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

export default ReviewScreen;
