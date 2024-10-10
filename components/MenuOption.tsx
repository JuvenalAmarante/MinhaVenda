import { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Href, Link } from 'expo-router';

export function MenuOption({
  children,
  route,
  icon,
}: PropsWithChildren & { route: Href; icon: any }) {
  return (
    <Link href={route} asChild>
      <TouchableOpacity style={styles.container}>
        <Ionicons name={icon} size={50} color='#333333' />
        <Text style={styles.label}>{children}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 160,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    borderRadius: 10,
    elevation: 3
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    color: '#333',
  },
});
