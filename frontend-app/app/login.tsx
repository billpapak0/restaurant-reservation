import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { saveToken } from '../lib/token';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Sending:', { email, password });
    try {
      const res = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });

      const token = res.data.token;
      await saveToken(token);
      console.log('Token saved securely');

      router.push('/home');
    } catch (err) {
      console.error('Login failed:', err);
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, justifyContent: 'center', flexGrow: 1 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      
      <TextInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#fff',
                color: '#000',
                marginBottom: 15,
                padding: 10,
                borderRadius: 4,
            }}
        />

        <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={{
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#fff',
                color: '#000',
                marginBottom: 15,
                padding: 10,
                borderRadius: 4,
            }}
        />


      <Button title="Login" onPress={handleLogin} />
    </ScrollView>
  );
}
