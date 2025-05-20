import { Stack, useSegments } from 'expo-router';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { deleteToken } from '../../lib/token';
import { router } from 'expo-router';

export default function AuthLayout() {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1] || '';

  const getTitle = () => {
    switch (currentRoute) {
      case 'home':
        return 'Home';
      case 'reserve':
        return 'Make a Reservation';
      case 'bookings':
        return 'My Bookings';
      default:
        return '🍽️ MyReservations';
    }
  };

  const handleLogout = async () => {
    await deleteToken();
    router.replace('/login');
  };

  return (
    <>
      <View style={styles.bar}>
        <Text style={styles.title}>{getTitle()}</Text>
        <Pressable onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </Pressable>
      </View>
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logout: {
    fontSize: 16,
    color: 'crimson',
    fontWeight: 'bold',
  },
});
