import { AddSale } from '@/components/AddSale';
import { FabButton } from '@/components/FabButton';
import { ListItem } from '@/components/ListItem';
import { findAllSales } from '@/services/firebase';
import { Sale } from '@/types/Sale';
import { useEffect, useState } from 'react';
import {
  StyleSheet, FlatList,
  ActivityIndicator,
  View
} from 'react-native';

export default function HistoryPage() {
  const [list, setList] = useState([] as Sale[]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    setRefresh(true);
    const list: Sale[] = await findAllSales();

    setList(list);
    setRefresh(false);
    setLoading(false);
  }

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size={50} color='#00017C' />
        ) : (
          <FlatList
            data={list}
            onRefresh={() => loadSales()}
            refreshing={refresh}
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

        <FabButton onPress={() => setModalVisible(true)} />
      </View>

      <AddSale
        visible={modalVisible}
        setVisible={(visible) => setModalVisible(visible)}
        onClose={() => loadSales()}
      />
    </>
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
