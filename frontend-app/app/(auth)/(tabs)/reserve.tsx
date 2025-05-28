
import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { getToken } from '../../../lib/token';
import { useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';




export default function ReserveScreen() {
    const [restaurants, setRestaurants] = useState([]);
    const [restaurantId, setRestaurantId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState('');

    useEffect(() => {
  const fetchRestaurants = async () => {
    try {
        const res = await axios.get('http://localhost:5000/restaurants');
        setRestaurants(res.data);
        } catch (err) {
        console.error('Error loading restaurants:', err);
        }
    };

    fetchRestaurants();
    }, []);

    const availableDates = [
        '2025-05-23',
        '2025-05-24',
        '2025-05-25',
    ];

    const availableTimes = [
        '17:00:00',
        '18:00:00',
        '19:30:00',
        '21:00:00',
    ];




  const handleReserve = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Not logged in', 'Please login first.');
      return;
    }

    if (!restaurantId || !date || !time || !people) {
    Alert.alert('Missing info', 'Please fill in all fields before submitting.');
    return;
    }
    console.log('Sending reservation:', {
    restaurant_id: parseInt(restaurantId),
    date,
    time,
    people_count: parseInt(people),
    token,
    });

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

      router.replace('/success');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not create reservation');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Book a Table</Text>

      <Text style={styles.label}>Select a Restaurant</Text>
<View style={styles.pickerWrapper}>
  <Picker
    selectedValue={restaurantId}
    onValueChange={(itemValue) => setRestaurantId(itemValue)}
  >
    <Picker.Item label="Select a restaurant" value="" />
        {restaurants.map((r) => (
        <Picker.Item
            key={r.restaurant_id}
            label={`${r.name} — ${r.location}`}
            value={r.restaurant_id}
        />
        ))}
    </Picker>
    </View>


      <Text style={styles.label}>Select a Date</Text>
        <View style={styles.pickerWrapper}>
            <Picker
                selectedValue={date}
                onValueChange={(val) => setDate(val)}
            >
                <Picker.Item label="Select a date" value="" />
                {availableDates.map((d) => (
                <Picker.Item key={d} label={d} value={d} />
                ))}
            </Picker>
        </View>
        <Text style={styles.label}>Select a Time</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={time}
                    onValueChange={(val) => setTime(val)}
                >
                    <Picker.Item label="Select a time" value="" />
                    {availableTimes.map((t) => (
                    <Picker.Item key={t} label={t} value={t} />
                    ))}
                </Picker>
            </View>


      <TextInput
        placeholder="Number of People"
        value={people}
        onChangeText={setPeople}
        keyboardType="numeric"
        style={styles.input}
      />

    <View style={styles.button}>
        <Button title="Reserve" onPress={handleReserve} color="#007AFF" />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 8,
        fontWeight: '500',
        color: '#ddd',
        fontSize: 14,
    },

    pickerWrapper: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
        borderColor: '#ccc',
        borderWidth: 1,
    },

    container: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#041B15',
    },

    header: {
        fontSize: 26,
        marginBottom: 28,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700',
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
    },

  
    button: {
        marginTop: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
});
