import { maskCurrency, maskCurrencyToNumber } from '@/utils/mask';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createSale, findAllCategories } from '@/services/firebase';
import { Category } from '@/types/Category';
import { Sale } from '@/types/Sale';

export function ConfirmationModal({
  visible,
  loading,
  onConfirm,
  onCancel,
  data,
}: {
  visible: boolean;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  data?: Sale;
}) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={() => {
        onCancel();
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerBackground}
          onPress={() => onCancel()}
        ></TouchableOpacity>

        <View style={styles.containerModal}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => onCancel()}
          >
            <Ionicons name='close' size={25} />
          </TouchableOpacity>

          <Text style={styles.title}>Deseja cancelar a venda?</Text>

          <View style={styles.containerDetail}>
            <View style={styles.containerDetailRow}>
              <Text style={styles.label}>Descrição:</Text>
              <Text style={styles.value}>{data?.categoria.descricao}</Text>
            </View>

            <View style={styles.containerDetailRow}>
              <Text style={styles.label}>Valor:</Text>
              <Text style={styles.value}>
                R${' '}
                {data?.valor.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </View>

            <View style={styles.containerDetailRow}>
              <Text style={styles.label}>Data:</Text>
              <Text style={styles.value}>
                {data?.data.toLocaleString('pt-BR')}
              </Text>
            </View>
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => onCancel()}
              disabled={loading}
            >
              <Text style={styles.buttonCancelText}>Não</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.buttonOk,
                backgroundColor: loading
                  ? '#3e3e87'
                  : styles.buttonOk.backgroundColor,
              }}
              onPress={() => onConfirm()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <ActivityIndicator size={18} color='white' />
                </>
              ) : (
                <Text style={styles.buttonOkText}>Sim</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBackground: {
    flex: 1,
    backgroundColor: '#00000033',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  containerModal: {
    zIndex: 10,
    height: 320,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
  },
  containerDetail: {
    paddingTop: 24,
    flex: 1,
    gap: 16,
    flexWrap: 'wrap',
  },
  containerDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
  containerButton: {
    height: 60,
    flexDirection: 'row',
    gap: 16,
  },
  buttonOk: {
    flexDirection: 'row',
    gap: 16,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#00017C',
  },
  buttonOkText: {
    fontSize: 18,
    color: 'white',
  },
  buttonCancel: {
    flexDirection: 'row',
    gap: 16,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderBlockColor: '#00017C',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  buttonCancelText: {
    fontSize: 18,
    color: '#00017C',
  },
});
