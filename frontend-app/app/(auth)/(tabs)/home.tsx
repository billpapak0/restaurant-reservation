export const screenOptions = {
  title: 'Home',
};
import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import Card from '../../../components/Card';


export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get('http://localhost:5000/restaurants');
        setRestaurants(res.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurant_id.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subtitle={item.location}
            body={item.description}
          />
        )}
      />
    </View>
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
  container: {
  flex: 1,
  backgroundColor: '#041B15',
  },

});

