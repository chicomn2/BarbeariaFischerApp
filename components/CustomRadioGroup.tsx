import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export interface CustomRadioGroupProps {
  options: { label: string; value: number }[];
  selectedOption: number | null;
  onSelect: (value: number) => void;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <View style={styles.radioGroupContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioOptionContainer}
          onPress={() => onSelect(option.value)}
        >
          <View style={[styles.radioCircle, selectedOption === option.value && styles.radioCircleSelected]} />
          <Text style={styles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioGroupContainer: {
    marginVertical: 16,
  },
  radioOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#777',
    marginRight: 8,
  },
  radioCircleSelected: {
    backgroundColor: 'black',

  },
  radioLabel: {
    fontSize: 16,
  },
});

export default CustomRadioGroup;
