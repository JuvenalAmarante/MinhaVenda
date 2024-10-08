import { MenuOption } from '@/components/MenuOption';
import { Total } from '@/components/Total';
import { getTotalSalesDay } from '@/services/firebase';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';

export default function HomePage() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  let sub = () => {};

  useEffect(() => {
    setLoading(true);
    loadTotal();

    return () => {
      sub();
    };
  }, []);

  async function loadTotal() {
    sub = await getTotalSalesDay((val: number) => {
      setLoading(true);
      setTotal(val);
      setLoading(false);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/images/logo-home.png')}
        style={styles.logoContainer}
      />

      <Total value={total} loading={loading} />

      <View style={styles.optionsContainer}>
        <MenuOption route='/history' icon='time'>
          Minhas vendas
        </MenuOption>

        {/* <MenuOption route="" icon='add-circle'>
          Nova venda
        </MenuOption> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 16,
  },
  logoContainer: {
    height: 160,
    width: 160,
    backgroundColor: 'red',
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
    paddingTop: 64,
  },
});
