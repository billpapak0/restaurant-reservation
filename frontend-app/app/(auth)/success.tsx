import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function SuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Reservation Confirmed!</Text>
      <Text style={styles.message}>Your table has been booked successfully.</Text>
      <View style={styles.button}>
        <Button title="Go to Home" onPress={() => router.replace('/home')} />
      </View>
      <View style={styles.button}>
        <Button title="View My Bookings" onPress={() => router.replace('/bookings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041B15',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    marginBottom: 16,
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
