export const screenOptions = {
  title: 'My Bookings',
};
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../../lib/token';

export default function BookingsScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = await getToken();
      console.log('Token loaded:', token);

      if (!token) {
        Alert.alert('Not logged in', 'Please login first.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/reservations/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Bookings:', res.data);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        Alert.alert('Error', 'Could not load reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading your reservations...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item) => item.reservation_id.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.restaurant}>{item.restaurant_name}</Text>
          <Text>{item.location}</Text>
          <Text>{item.date} at {item.time}</Text>
          <Text>People: {item.people_count}</Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', color: '#555' }}>
          No reservations found or you’re not logged in.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 16,
    marginBottom: 16,
  },
  restaurant: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
