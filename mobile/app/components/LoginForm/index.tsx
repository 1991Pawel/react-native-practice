import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CustomInput from "@components/CustomInput";
import type { TextInputProps } from "react-native";

type FormData = {
  email: string;
  password: string;
};

type CustomInputProps = {
  label: string;
  error?: { message?: string };
  rules: Record<string, any>;
  name: keyof FormData;
} & TextInputProps;

const fields: CustomInputProps[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Wpisz email",
    autoCapitalize: "none",
    autoFocus: true,
    secureTextEntry: false,
    rules: {
      required: "To pole jest wymagane!",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Wprowadź poprawny adres email!",
      },
    },
  },
  {
    name: "password",
    label: "Hasło",
    placeholder: "Wpisz hasło",
    autoCapitalize: "none",
    secureTextEntry: true,
    rules: {
      required: "To pole jest wymagane!",
    },
  },
];

export default function LoginForm({ onSignInPress }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    await onSignInPress({
      emailAddress: data?.email,
      password: data?.password,
    });
  };

  return (
    <View className="gap-4 w-full p-16">
      {fields.map(
        ({
          name,
          label,
          placeholder,
          autoCapitalize,
          autoFocus,
          secureTextEntry,
          rules,
        }) => (
          <View key={name}>
            <Controller
              control={control}
              name={name}
              defaultValue=""
              rules={rules}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <CustomInput
                  label={label}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder={placeholder}
                  autoCapitalize={autoCapitalize}
                  autoFocus={autoFocus}
                  secureTextEntry={secureTextEntry}
                  error={error}
                />
              )}
            />
          </View>
        )
      )}

      <Pressable
        className="bg-blue-600 rounded-lg py-3 mt-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-semibold">Zaloguj</Text>
      </Pressable>
    </View>
  );
}
