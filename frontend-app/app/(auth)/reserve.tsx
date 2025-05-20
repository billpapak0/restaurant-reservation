export const screenOptions = {
  title: 'Make a Reservation',
};
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { getToken } from '../../lib/token';

export default function ReserveScreen() {
  const [restaurantId, setRestaurantId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');

  const handleReserve = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Not logged in', 'Please login first.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/reservations',
        {
          restaurant_id: parseInt(restaurantId),
          date,
          time,
          people_count: parseInt(people),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Success', 'Reservation created successfully!');
      router.push('/home');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not create reservation');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Book a Table</Text>

      <TextInput
        placeholder="Restaurant ID"
        value={restaurantId}
        onChangeText={setRestaurantId}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <TextInput
        placeholder="Time (HH:MM:SS)"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />

      <TextInput
        placeholder="Number of People"
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Reserve" onPress={handleReserve} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 4,
  },
});
