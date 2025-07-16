import React from "react";
import { View, Text, TextInput } from "react-native";
import type { TextInputProps } from "react-native";

type CustomInputProps = {
  label?: string;
  error?: { message?: string };
} & TextInputProps;

export default function CustomInput({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder,
  autoCapitalize,
  autoFocus,
  secureTextEntry,
  error,
}: CustomInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-sm font-medium text-gray-700 mb-1">{label}</Text>
      )}
      <TextInput
        className="border border-gray-300 rounded-md w-full p-4"
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error.message || "Błąd"}
        </Text>
      )}
    </View>
  );
}
