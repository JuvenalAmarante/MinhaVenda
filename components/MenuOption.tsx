import { PropsWithChildren } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export function MenuOption({
  children,
  onPress,
  icon,
}: PropsWithChildren & { onPress: () => void; icon: any }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <Ionicons
        name={icon}
        size={50}
        color='#333333'
      />
      <Text style={styles.label}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: 160,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    borderRadius: 10,
  },
  label: {
    fontWeight: '400',
    fontSize: 16,
    color: '#333333'
  }
});
