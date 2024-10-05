import { ListItem } from '@/components/ListItem';
import { findAllSales } from '@/services/firebase';
import { Sale } from '@/types/Sale';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';

export default function HistoryPage() {
  const [list, setList] = useState([] as Sale[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTotal();
  }, []);

  async function loadTotal() {
    setLoading(true);
    const list: Sale[] = await findAllSales();
    console.log('🚀 ~ loadTotal ~ list:', list[0].data);

    setList(list);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={50} color='#00017C' />
      ) : (
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <ListItem
              title={item.categoria.descricao}
              date={item.data}
              value={item.valor}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
