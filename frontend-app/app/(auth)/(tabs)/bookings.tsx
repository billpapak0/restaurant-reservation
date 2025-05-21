export const screenOptions = {
  title: 'My Bookings',
};
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../../../lib/token';
import Card from '../../../components/Card';

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
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.reservation_id.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <Card
            title={item.restaurant_name}
            subtitle={item.location}
            body={
              <>
                <Text>{item.date} at {item.time}</Text>
                <Text>People: {item.people_count}</Text>
              </>
            }
          />

        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#555' }}>
            No reservations found or you’re not logged in.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041B15',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  restaurant: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  datetime: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
  people: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
});

