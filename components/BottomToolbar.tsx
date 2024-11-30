import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface BottomToolbarProps {
  actions: Array<{
    icon: string;
    label: string;
    onPress: () => void;
  }>;
}

const BottomToolbar: React.FC<BottomToolbarProps> = ({ actions }) => {
  return (
    <View style={styles.bottomToolbar}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.toolbarButton}
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name={action.icon} color="white" size={24} />
          <Text style={styles.toolbarButtonText}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    padding: 10,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  toolbarButton: {
    alignItems: 'center',
  },
  toolbarButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BottomToolbar;
