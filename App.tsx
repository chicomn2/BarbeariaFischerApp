import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; // Certifique-se de usar o caminho correto
import AtividadeScreen from './screens/AtividadeScreen';
import RelatorioScreen from './screens/RelatorioScreen';
import ResultadoScreen from './screens/ResultadoScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Atividade" component={AtividadeScreen} />
        <Stack.Screen name="Relatorio" component={RelatorioScreen} />
        <Stack.Screen name="Resultado" component={ResultadoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
