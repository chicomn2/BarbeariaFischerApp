// utils/renderAtividade.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface RenderAtividadeProps {
  item: any;
  onPress: () => void;
}

const RenderAtividade: React.FC<RenderAtividadeProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.atividadeContainer}>
        <Text style={styles.nomeCliente}>Nome do Cliente: {item.nomeCliente}</Text>
        <Text style={styles.tipoAtividade}>
          Tipo de Atividade: {item.tipoAtividade === 1 ? ' Corte de Cabelo' : ' Corte de Barba'}
        </Text>
        <Text
          style={[
            styles.valorAtividade,
            { color: item.pago ? 'black' : '#FF0000' },
          ]}
        >
          {item.pago ? `Valor: R$ ${parseFloat(item.valor).toFixed(2).replace('.', ',')}` : 'Pagamento pendente'}
        </Text>
        <Text style={styles.horaAtividade}>
          Data e hora: {new Date(item.data).toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' '}
                        {new Date(item.hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  atividadeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0)', // Fundo branco com 80% de opacidade
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  nomeCliente: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tipoAtividade: {
    fontSize: 18,
    color: 'black',
  },
  valorAtividade: {
    fontSize: 18,
  },
  horaAtividade: {
    fontSize: 18,
    color: 'black',
  },
});

export default RenderAtividade;
