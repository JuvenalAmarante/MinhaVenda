import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

export function FabButton({ onPress }: { onPress?: () => void }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (onPress) onPress();
      }}
    >
      <Ionicons name='add' color='#FFF' size={30}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    position: 'absolute',
    bottom: 64,
    right: 48,
    height: 70,
    width: 70,
    elevation: 2,
    backgroundColor: '#00017C'
  },
});
