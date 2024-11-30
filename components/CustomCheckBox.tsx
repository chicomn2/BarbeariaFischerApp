// CustomCheckBox.tsx

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomCheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
  label: string;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ isChecked, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.box, isChecked && styles.checkedBox]}>
        {isChecked && (
          <MaterialCommunityIcons
            name="check"
            size={16}
            color="#fff"
          />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#000',
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckBox;
