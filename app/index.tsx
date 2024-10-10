import { MenuOption } from '@/components/MenuOption';
import { Total } from '@/components/Total';
import { getTotalSalesDay } from '@/services/firebase';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
      <StatusBar backgroundColor="#00017C" translucent style="light" />
      
      <View style={styles.headerContainer}>
      <Image
        source={require('@/assets/images/logo_home.png')}
        style={styles.logo}
      />

      <Total value={total} loading={loading} />
      </View>

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
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    paddingBottom: 32,
    gap: 16,
  },
  headerContainer:{
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#00017C',
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    paddingBottom: 16,
  },
  logo: {
    height: 160,
    width: 160,
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
