import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../styles/themes';


interface InputProps extends TextInputProps {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, ...props }) => {
  return (
    <View>
      <TextInput
        style={theme.input}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        {...props}
      />
    </View>
  );
};

export default Input;