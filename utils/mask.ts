export function maskCurrency(value: string) {
  value = value.replace(/\D/g, '');

  value = (parseFloat(value) / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  console.log('🚀 ~ maskCurrency ~ value:', value);
  return value;
}

export function maskCurrencyToNumber(value: string) {
  value = value.replace(/\D/g, '');

  return parseFloat(value) / 100;
}
