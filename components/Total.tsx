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
    height: 150,
    width: '80%',
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  title: {
    top: 2,
    left: 4,
    fontWeight: '500',
    fontSize: 15,
    position: 'absolute',
  },
  symbol: {
    fontWeight: 'bold',
  },
  value: {
    color: 'green',
    fontWeight: '500',
    fontSize: 40,
  },
});
