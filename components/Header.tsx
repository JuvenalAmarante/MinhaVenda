import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export function Header({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerLeftButton}>
        <Link href='/'>
          <Ionicons name='arrow-back' size={30} />
        </Link>
      </View>

      <View style={styles.containerTitle}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.containerRightButton}>
        {/* <Link href='/'>
          <Ionicons name='add-circle' size={30} />
        </Link> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  containerLeftButton: {
    flex: 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitle: {
    flex: 6 / 10,
  },
  containerRightButton: {
    flex: 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: '#333',
    textAlign: 'center',
  },
});
