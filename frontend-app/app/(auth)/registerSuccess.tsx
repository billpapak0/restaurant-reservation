import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function RegisterSuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Registration Successful</Text>
      <Text style={styles.subtitle}>You can now log in to your account.</Text>

      <View style={styles.button}>
        <Button title="Go to Login" onPress={() => router.replace('/login')} color="#007AFF" />
      </View>

      <View style={styles.button}>
        <Button title="Register Another Account" onPress={() => router.replace('/register')} color="#555" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#2ecc71',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 28,
    textAlign: 'center',
  },
  button: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
