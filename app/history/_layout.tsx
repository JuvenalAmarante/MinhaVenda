import { Header } from '@/components/Header';
import { Slot } from 'expo-router';

export default function HistoryLayout() {
  return (
    <>
      <Header title='Vendas' />
      <Slot />
    </>
  );
}
