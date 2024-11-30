import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalVars from '../utils/GlobalVars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filtrarAtividades } from '../utils/atividadeFilter';
import RenderAtividade from '../utils/renderAtividade';
import BottomToolbar from '../components/BottomToolbar';
import { ImageBackground } from 'react-native';

const ResultadoScreen = () => {
  const navigation = useNavigation();
  const [atividadesFiltradas, setAtividadesFiltradas] = useState<any[]>([]);
  const [quantidadeCortesCabelo, setQuantidadeCortesCabelo] = useState(0);
  const [quantidadeCortesBarba, setQuantidadeCortesBarba] = useState(0);
  const [quantidadePendentes, setQuantidadePendentes] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const carregarAtividades = async () => {
      try {
        const atividadesData = await AsyncStorage.getItem('atividades');
        if (atividadesData) {
          const atividadesParsed = JSON.parse(atividadesData);
          const atividades = filtrarAtividades(atividadesParsed);

          setAtividadesFiltradas(atividades);

          let cortesCabelo = 0;
          let cortesBarba = 0;
          let pendentes = 0;
          let valorObtido = 0;

          atividades.forEach((atividade: any) => {
            if (atividade.tipoAtividade === 1) {
              cortesCabelo++;
            } else if (atividade.tipoAtividade === 2) {
              cortesBarba++;
            }
            if (!atividade.pago) {
              pendentes++;
            }
            if (atividade.pago) {
              valorObtido += parseFloat(atividade.valor);
            }
          });

          setQuantidadeCortesCabelo(cortesCabelo);
          setQuantidadeCortesBarba(cortesBarba);
          setQuantidadePendentes(pendentes);
          setValorTotal(valorObtido);
        }
      } catch (error) {
        console.error('Erro ao carregar atividades:', error);
      }
    };

    carregarAtividades();
  }, [navigation]);

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
          <Text style={styles.titulo}>Resultado do Relatório</Text>
          <View style={styles.resumoContainer}>
            {atividadesFiltradas.length > 0 ? (
              <>
                <Text style={styles.periodo}>
                De {GlobalVars.dataInicial || 'primeiro serviço'} até {GlobalVars.dataFinal || 'último serviço'}
                </Text>
                <Text style={styles.valorTotal}>
                  Valor obtido no período: R$ {valorTotal.toFixed(2).replace('.', ',')}
                </Text>
                <Text style={styles.resumo}>
                  Quantidade de atividades: {atividadesFiltradas.length}
                </Text>
                <Text style={styles.resumo}>
                  Cortes de cabelo: {quantidadeCortesCabelo} / Cortes de barba: {quantidadeCortesBarba}
                </Text>
                <Text style={styles.resumo}>
                  Serviços pendentes de pagamento: {quantidadePendentes}
                </Text>
              </>
            ) : (
              <Text style={styles.periodo}>Sem atividades cadastradas</Text>
            )}
          </View>
          <FlatList
            data={atividadesFiltradas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <RenderAtividade item={item} onPress={() => navigation.navigate('Atividade', { atividade: item })} />
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>
        <BottomToolbar
          actions={[
            {
              icon: 'arrow-left',
              label: 'Voltar',
              onPress: handleVoltar,
            },
          ]}
        />
      </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    marginVertical: 20,
    flex: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  resumoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  periodo: {
    fontSize: 16,
    marginBottom: 8,
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resumo: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ResultadoScreen;
