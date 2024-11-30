import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCheckBox from '../components/CustomCheckBox';
import CustomRadioGroup from '../components/CustomRadioGroup';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import BottomToolbar from '../components/BottomToolbar';
import { ImageBackground } from 'react-native';

const AtividadeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const atividadeEdit = route.params?.atividade;

  const [nomeCliente, setNomeCliente] = useState('');
  const [valor, setValor] = useState('');
  const [pago, setPago] = useState(false);
  const [tipoAtividade, setTipoAtividade] = useState<number | null>(null);
  const [dataAtividade, setDataAtividade] = useState(new Date());
  const [horaAtividade, setHoraAtividade] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (atividadeEdit) {
      setNomeCliente(atividadeEdit.nomeCliente);
      setValor(atividadeEdit.valor ? atividadeEdit.valor.toFixed(2).replace('.', ',') : '');
      setPago(atividadeEdit.pago);
      setTipoAtividade(atividadeEdit.tipoAtividade);
      setDataAtividade(new Date(atividadeEdit.data));
      setHoraAtividade(new Date(atividadeEdit.hora));
    } else {
      limparCampos();
    }
  }, [atividadeEdit]);

  const limparCampos = () => {
    setNomeCliente('');
    setValor('');
    setPago(false);
    setTipoAtividade(0);
    setDataAtividade(new Date());
    setHoraAtividade(new Date());
  };

  const handleSalvarAtividade = async () => {
    if (!nomeCliente || tipoAtividade === null || (!pago && valor !== '') || (pago && valor === '')) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novaAtividade = {
      id: atividadeEdit ? atividadeEdit.id : Date.now(),
      nomeCliente,
      valor: parseFloat(valor.replace(',', '.')),
      pago,
      tipoAtividade: tipoAtividade,
      data: dataAtividade.toISOString(),
      hora: horaAtividade.toISOString(),
    };

    try {
      const atividadesData = await AsyncStorage.getItem('atividades');
      let atividades = atividadesData ? JSON.parse(atividadesData) : [];

      if (atividadeEdit) {
        atividades = atividades.map((atividade: any) =>
          atividade.id === atividadeEdit.id ? novaAtividade : atividade
        );
      } else {
        atividades.push(novaAtividade);
      }

      await AsyncStorage.setItem('atividades', JSON.stringify(atividades));
      Alert.alert('Gravação', 'Atividade salva com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar a atividade:', error);
    }
  };

  const handleExcluirAtividade = async () => {
    if (!atividadeEdit) return;

    Alert.alert(
      'Excluir Atividade',
      'Tem certeza que deseja excluir esta atividade?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const atividadesData = await AsyncStorage.getItem('atividades');
              let atividades = atividadesData ? JSON.parse(atividadesData) : [];

              atividades = atividades.filter((atividade: any) => atividade.id !== atividadeEdit.id);

              await AsyncStorage.setItem('atividades', JSON.stringify(atividades));
              Alert.alert('Exclusão', 'Atividade excluída com sucesso!');
              navigation.goBack();
            } catch (error) {
              console.error('Erro ao excluir a atividade:', error);
            }
          },
        },
      ]
    );
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/images/fundo.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.titulo}>{atividadeEdit ? 'Editar Serviço' : 'Adicionar um serviço'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do cliente"
            value={nomeCliente}
            onChangeText={setNomeCliente}
          />

          <CustomCheckBox
            label="Já foi pago?"
            isChecked={pago}
            onPress={() => {
              setPago(!pago);
              setValor('');
            }}
          />

          <TextInput
            style={[styles.input, { backgroundColor: pago ? '#FFF' : '#E0E0E0' }]}
            placeholder="Valor recebido"
            value={valor}
            onChangeText={(text) => setValor(text.replace('.', ','))}
            keyboardType="numeric"
            editable={pago}
          />

          <CustomRadioGroup
            options={[
              { label: 'Corte de Cabelo', value: 1 },
              { label: 'Corte de Barba', value: 2 },
            ]}
            selectedOption={tipoAtividade}
            onSelect={(option) => setTipoAtividade(option)}
          />

          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>Data da Atividade: {dataAtividade.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dataAtividade}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDataAtividade(selectedDate);
                }
              }}
            />
          )}

          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>Hora da Atividade: {horaAtividade.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={horaAtividade}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setHoraAtividade(selectedTime);
                }
              }}
            />
          )}
        </View>
        <View style={styles.bottomToolbarContainer}>
          <BottomToolbar
            actions={[
              {
                icon: 'arrow-left',
                label: 'Voltar',
                onPress: handleVoltar,
              },
              {
                icon: 'content-save',
                label: 'Gravar',
                onPress: handleSalvarAtividade,
              },
              ...(atividadeEdit
                ? [
                    {
                      icon: 'delete',
                      label: 'Excluir',
                      onPress: handleExcluirAtividade,
                    },
                  ]
                : []),
            ]}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  datePickerButton: {
    backgroundColor: '#e1e1e1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
    alignItems: 'center',
  },
  bottomToolbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AtividadeScreen;
