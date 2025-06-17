import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { theme } from '../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, style, ...props }) => {
  return (
    <TouchableOpacity style={[theme.button, style]} {...props}>
      <Text style={theme.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;