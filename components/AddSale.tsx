import { maskCurrency, maskCurrencyToNumber } from '@/utils/mask';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
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

export function AddSale({
  visible,
  onClose,
  setVisible,
}: {
  visible: boolean;
  onClose?: () => void;
  setVisible: (visivle: boolean) => void;
}) {
  const [value, setValue] = useState('0,00');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef<any>(null);

  function handleChange(text: string) {
    const maskedText = maskCurrency(text);

    setValue(maskedText);
  }

  async function loadCategories() {
    setLoading(true);
    const categories = await findAllCategories();

    setCategories(categories);

    if (!selectedType) setSelectedType(categories[0].id);
    setLoading(false);
  }

  async function saveSale() {
    setSaving(true);

    const newValue = maskCurrencyToNumber(value);

    if (newValue > 0) {
      const docSaved = await createSale(newValue, selectedType);
      if (docSaved != '') close();
      else
        ToastAndroid.show(
          'Ocorreu um erro ao tentar salvar!',
          ToastAndroid.LONG
        );
    } else {
      ToastAndroid.show(
        'Coloque um valor para adicionar a venda',
        ToastAndroid.LONG
      );
    }
    setSaving(false);
  }

  function close() {
    if (onClose) onClose();

    setVisible(!visible);
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelection(500);
    }
  }, [value]);

  useEffect(() => {
    loadCategories();
  }, [visible]);

  return (
    <Modal
      animationType='fade'
      transparent={true}
      statusBarTranslucent={true}
      visible={visible}
      onRequestClose={() => {
        if (onClose) onClose();
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerBackground}
          onPress={() => close()}
        ></TouchableOpacity>

        <View style={styles.containerModal}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => close()}
          >
            <Ionicons name='close' size={25} />
          </TouchableOpacity>

          <View style={styles.containerForm}>
            <Text style={{ ...styles.label, textAlign: 'center' }}>
              Qual o valor da venda?
            </Text>

            <View style={styles.containerInput}>
              <Text style={styles.prefixInput}>R$ </Text>
              <TextInput
                ref={inputRef}
                keyboardType='decimal-pad'
                value={value}
                style={styles.input}
                textAlign='center'
                onChangeText={(text) => {
                  handleChange(text);
                }}
              />
            </View>

            <Text style={styles.label}>Qual a categoria?</Text>

            <View style={styles.containerPicker}>
              <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue) => {
                  setSelectedType(itemValue);
                }}
              >
                {loading ? (
                  <Picker.Item
                    label={'Carregando...'}
                    value={0}
                    enabled={false}
                  />
                ) : (
                  categories.map((category) => {
                    return (
                      <Picker.Item
                        key={category.id}
                        label={category.descricao}
                        value={category.id}
                      />
                    );
                  })
                )}
              </Picker>
            </View>
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: saving
                  ? '#3e3e87'
                  : styles.button.backgroundColor,
              }}
              onPress={() => saveSale()}
              disabled={saving}
            >
              {saving ? (
                <>
                  <ActivityIndicator size={18} color='white' />
                </>
              ) : (
                <Text style={styles.buttonText}>Salvar</Text>
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
    justifyContent: 'flex-end',
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
    height: 400,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  containerForm: {
    flex: 1,
    gap: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
  },
  input: {
    height: 60,
    fontSize: 35,
    minWidth: 120,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  prefixInput: {
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    color: '#00017C',
  },
  containerPicker: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00000033',
  },
  containerButton: {
    height: 60,
  },
  button: {
    flexDirection: 'row',
    gap: 16,
    height: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#00017C',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
