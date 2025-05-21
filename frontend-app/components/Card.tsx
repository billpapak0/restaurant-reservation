import { View, Text, StyleSheet, ReactNode } from 'react-native';

interface CardProps {
  title: string;
  subtitle?: string;
  body?: string | ReactNode;
}

export default function Card({ title, subtitle, body }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {body && typeof body === 'string' ? (
        <Text style={styles.body}>{body}</Text>
      ) : (
        body
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  body: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
});
