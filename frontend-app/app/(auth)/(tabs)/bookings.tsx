export const screenOptions = {
  title: 'My Bookings',
};

import { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { getToken } from '../../../lib/token';
import Card from '../../../components/Card';
import { useFocusEffect } from 'expo-router';

export default function BookingsScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Not logged in', 'Please login first.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/reservations/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      Alert.alert('Error', 'Could not load reservations');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookings();
    }, [])
  );

  const handleCancel = async (id: number) => {
    const token = await getToken();
    if (!token) return;

    try {
      await axios.delete(`http://localhost:5000/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((b) => b.reservation_id !== id));
    } catch (err) {
      console.error('Cancel failed:', err);
      Alert.alert('Error', 'Could not cancel reservation');
    }
  };

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
          <View style={{ marginBottom: 20 }}>
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
            <Button
              title="Cancel"
              color="crimson"
              onPress={() => handleCancel(item.reservation_id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 20,
  },
});
