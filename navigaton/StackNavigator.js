import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AtividadeScreen from '../screens/AtividadeScreen';
import RelatorioScreen from '../screens/RelatorioScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Atividade" component={AtividadeScreen} options={{ title: 'Atividade' }} />
        <Stack.Screen name="Relatorio" component={RelatorioScreen} options={{ title: 'Relatorio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
