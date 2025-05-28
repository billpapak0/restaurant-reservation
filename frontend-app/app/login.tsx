import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable, StyleSheet } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { saveToken } from '../lib/token';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });

      const token = res.data.token;
      await saveToken(token);
      router.replace('/home');
    } catch (err) {
      console.error('Login failed:', err);
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <View style={styles.button}>
          <Button title="Login" onPress={handleLogin} color="#007AFF" />
        </View>

        <Pressable onPress={() => router.replace('/register')}>
          <Text style={styles.link}>Don’t have an account? Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#136F63',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 28,
    color: '#222',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 12,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
  link: {
    textAlign: 'center',
    color: '#007AFF',
    fontWeight: '500',
  },
});
