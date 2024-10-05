import { PropsWithChildren } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Href, Link, LinkProps } from 'expo-router';

export function ListItem({
  title,
  date,
  value,
}: {
  title: string;
  date: Date;
  value: number;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.containerData}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>Data: {date.toLocaleString('pt-BR')}</Text>
      </View>

      <View style={styles.containerValue}>
        <Text style={styles.value}>
          R${' '}
          {value.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.96,
    marginHorizontal: Dimensions.get('window').width * 0.02,
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderLeftColor: '#00017C',
    borderLeftWidth: 12,
    justifyContent: 'center',
    gap: 16,
    borderRadius: 10,
    marginVertical: 5,
  },
  containerData: {
    flex: 7/10,
    paddingLeft: 8,
    paddingVertical: 5,
    gap: 16,
  },
  containerValue: {
    flex: 3/10,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#00017C',
  },
  title: {
    fontWeight: '600',
    fontSize: 22,
    color: '#333',
  },
  date: {
    fontWeight: '400',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFF',
  },
});
