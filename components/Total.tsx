import { StyleSheet, Text, View } from 'react-native';

export function Total({ value, loading }: { value: number; loading: boolean }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total do dia</Text>

      <Text style={styles.value}>
        {loading ? (
          <>Carregando...</>
        ) : (
          <>
            <Text style={styles.symbol}>R$</Text>
            {value.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#EEEEEE00',
    borderRadius: 10,
    paddingVertical: 20,
  },
  title: {
    fontWeight: '500',
    fontSize: 15,
    color: '#ccc'
  },
  symbol: {
    fontWeight: 'bold',
  },
  value: {
    color: '#eee',
    fontWeight: '500',
    fontSize: 40,
  },
});
