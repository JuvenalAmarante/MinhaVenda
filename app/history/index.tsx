import { AddSale } from '@/components/AddSale';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { FabButton } from '@/components/FabButton';
import { ListItem } from '@/components/ListItem';
import { findAllSales, removeSale } from '@/services/firebase';
import { Sale } from '@/types/Sale';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  StatusBar,
  ToastAndroid,
} from 'react-native';

export default function HistoryPage() {
  const [itemSelected, setItemSelected] = useState<Sale>();
  const [list, setList] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [addSaleModalVisible, setAddSaleModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  useEffect(() => {
    loadSales();
  }, []);

  async function loadSales() {
    setRefresh(true);
    const list: Sale[] = await findAllSales();

    setList(list);
    setRefresh(false);

    if (loading) setLoading(false);
  }

  async function removeSaleSelected() {
    if (itemSelected) {
      setLoadingRemove(true);
      const result = await removeSale(itemSelected.id);

      if (!result) {
        setConfirmationModalVisible(false);

        return ToastAndroid.show(
          'Ocorreu um erro ao tentar deletar este item',
          ToastAndroid.LONG
        );
      }

      setLoadingRemove(false);
      setConfirmationModalVisible(false);
      await loadSales();
    }
  }

  return (
    <>
      <StatusBar
        backgroundColor='#00017C'
        translucent
        barStyle='light-content'
      />
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
                onLongPress={() => {
                  setItemSelected(item);
                  setConfirmationModalVisible(true);
                }}
                title={item.categoria.descricao}
                date={item.data}
                value={item.valor}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}

        <FabButton onPress={() => setAddSaleModalVisible(true)} />
      </View>

      <AddSale
        visible={addSaleModalVisible}
        setVisible={(visible) => setAddSaleModalVisible(visible)}
        onClose={() => loadSales()}
      />

      <ConfirmationModal
        data={itemSelected!}
        visible={confirmationModalVisible}
        loading={loadingRemove}
        onCancel={() => setConfirmationModalVisible(false)}
        onConfirm={() => removeSaleSelected()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
});
