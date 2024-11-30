import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import CustomRadioGroup from '../components/CustomRadioGroup';
import GlobalVars from '../utils/GlobalVars';
import BottomToolbar from '../components/BottomToolbar';
import { ImageBackground } from 'react-native';

const RelatorioScreen = () => {
  const navigation = useNavigation();
  const [dataInicial, setDataInicial] = useState<Date | null>(null);
  const [dataFinal, setDataFinal] = useState<Date | null>(null);
  const [tipoServico, setTipoServico] = useState<number>(3);
  const [statusPagamento, setStatusPagamento] = useState<number>(3);
  const [nomeCliente, setNomeCliente] = useState<string>('');
  const [showDataInicialPicker, setShowDataInicialPicker] = useState(false);
  const [showDataFinalPicker, setShowDataFinalPicker] = useState(false);

  const handleGerarRelatorio = () => {
    GlobalVars.dataInicial = dataInicial ? dataInicial.toLocaleDateString('pt-BR') : null;
    GlobalVars.dataFinal = dataFinal ? dataFinal.toLocaleDateString('pt-BR') : null;
    GlobalVars.tipoServico = tipoServico;
    GlobalVars.statusPagamento = statusPagamento;
    GlobalVars.nomeCliente = nomeCliente;

    navigation.navigate('Resultado');
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={require('../assets/images/fundo.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.mainContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.titulo}>Parâmetros do Relatório</Text>

          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDataInicialPicker(true)}
          >
            <Text>Data Inicial: {dataInicial ? dataInicial.toLocaleDateString('pt-BR') : '(opcional)'}</Text>
          </TouchableOpacity>
          {showDataInicialPicker && (
            <DateTimePicker
              value={dataInicial || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDataInicialPicker(false);
                if (selectedDate) {
                  setDataInicial(selectedDate);
                }
              }}
            />
          )}

          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDataFinalPicker(true)}
          >
            <Text>Data Final: {dataFinal ? dataFinal.toLocaleDateString('pt-BR') : '(opcional)'}</Text>
          </TouchableOpacity>
          {showDataFinalPicker && (
            <DateTimePicker
              value={dataFinal || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDataFinalPicker(false);
                if (selectedDate) {
                  setDataFinal(selectedDate);
                }
              }}
            />
          )}

          <Text>Tipo de serviço:</Text>
          <CustomRadioGroup
            options={[
              { label: 'Corte de Cabelo', value: 1 },
              { label: 'Corte de Barba', value: 2 },
              { label: 'Ambos', value: 3 },
            ]}
            selectedOption={tipoServico}
            onSelect={(option) => setTipoServico(option)}
          />

          <Text>Status do pagamento:</Text>
          <CustomRadioGroup
            options={[
              { label: 'Pagas', value: 1 },
              { label: 'Pendentes', value: 2 },
              { label: 'Ambos', value: 3 },
            ]}
            selectedOption={statusPagamento}
            onSelect={(option) => setStatusPagamento(option)}
          />

          <TextInput
            style={styles.input}
            placeholder="Buscar por Nome do Cliente (opcional)"
            value={nomeCliente}
            onChangeText={setNomeCliente}
          />
        </View>
      </View>

      <BottomToolbar
        actions={[
          {
            icon: 'arrow-left',
            label: 'Voltar',
            onPress: handleVoltar,
          },
          {
            icon: 'file-document',
            label: 'Gerar Relatório',
            onPress: handleGerarRelatorio,
          },
        ]}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
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

export default RelatorioScreen;
