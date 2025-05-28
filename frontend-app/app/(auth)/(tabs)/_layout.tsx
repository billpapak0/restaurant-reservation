import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#007AFF',
    headerShown: false,
  }}
>
    <Tabs.Screen name="home" options={{ title: 'Home' }} />
    <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
    <Tabs.Screen name="reserve" options={{ title: 'Reserve' }} />
</Tabs>

  );
}
