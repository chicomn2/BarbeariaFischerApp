import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filtrarAtividades } from '../utils/atividadeFilter';
import GlobalVars from '../utils/GlobalVars';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import RenderAtividade from '../utils/renderAtividade';
import BottomToolbar from '../components/BottomToolbar';
import { ImageBackground } from 'react-native';

type TabParamList = {
  Home: undefined;
  Atividade: { atividade: any } | undefined;
  Relatorio: undefined;
  Sair: undefined;
};

const HomeScreen = () => {
  const [atividades, setAtividades] = useState<any[]>([]);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const handleAddActivity = () => {
    navigation.navigate('Atividade', { atividade: null });
  };

  const handleGoToRelatorio = () => {
    navigation.navigate('Relatorio');
  };

  const handleExitApp = () => {
    RNExitApp.exitApp();
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchAtividades = async () => {
        try {
          const hoje = new Date();
          GlobalVars.dataInicial = `${hoje.getFullYear()}-${(
            '0' +
            (hoje.getMonth() + 1)
          ).slice(-2)}-${('0' + hoje.getDate()).slice(-2)}`;
          GlobalVars.dataFinal = `${hoje.getFullYear()}-${(
            '0' +
            (hoje.getMonth() + 1)
          ).slice(-2)}-${('0' + hoje.getDate()).slice(-2)}`;
          const atividadesData = await AsyncStorage.getItem('atividades');
          if (atividadesData) {
            const atividadesParsed = JSON.parse(atividadesData);
            const atividadesHoje = filtrarAtividades(atividadesParsed);

            setAtividades(atividadesHoje);

            const valorObtido = atividadesHoje.reduce(
              (total: number, atividade: any) =>
                total + (atividade.pago ? parseFloat(atividade.valor) : 0),
              0
            );

            setValorTotal(valorObtido);
          } else {
            console.log('Nenhuma atividade encontrada no armazenamento.');
          }
        } catch (error) {
          console.error('Erro ao carregar atividades:', error);
        }
      };

      fetchAtividades();
    }, [])
  );

  return (
    <ImageBackground
      source={require('../assets/images/fundo.jpg')}
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <Text style={styles.titulo}>Barbearia Fischer</Text>
      <View style={styles.resumoContainer}>
        <Text style={styles.valorTotal}>
          Valor obtido no dia: R$ {valorTotal.toFixed(2).replace('.', ',')}
        </Text>
        <Text style={styles.subtitulo}>Atividades do dia</Text>
        <FlatList
          data={atividades}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : Math.random().toString()
          }
          renderItem={({ item }) => (
            <RenderAtividade
              item={item}
              onPress={() => navigation.navigate('Atividade', { atividade: item })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </View>
      </View>
      <BottomToolbar
        actions={[
          {
            icon: 'exit-to-app',
            label: 'Sair',
            onPress: handleExitApp,
          },
          {
            icon: 'plus',
            label: 'Adicionar',
            onPress: handleAddActivity,
          },
          {
            icon: 'file-document',
            label: 'Relatórios',
            onPress: handleGoToRelatorio,
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  resumoContainer: {
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  valorTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

export default HomeScreen;
