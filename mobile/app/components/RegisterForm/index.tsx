import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CustomInput from "@components/CustomInput";
import type { TextInputProps } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterSchemaType,
  registerSchema,
} from "@/app/lib/shemas/registerSchema";

type CustomInputProps = {
  label: string;
  error?: { message?: string };

  name: keyof RegisterSchemaType;
} & TextInputProps;

const fields: CustomInputProps[] = [
  {
    name: "emailAddress",
    label: "Email",
    placeholder: "Wpisz email",
    autoCapitalize: "none",
    autoFocus: true,
    secureTextEntry: false,
  },
  {
    name: "password",
    label: "Hasło",
    placeholder: "Wpisz hasło",
    autoCapitalize: "none",
    secureTextEntry: true,
  },
];

type LoginFormProps = {
  onSignInPress: (data: RegisterSchemaType) => Promise<void>;
};

export default function RegisterForm({ onSignInPress }: LoginFormProps) {
  const { control, handleSubmit } = useForm<RegisterSchemaType>({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (data) => {
    await onSignInPress({
      emailAddress: data?.emailAddress,
      password: data?.password,
    });
  };

  return (
    <View className="w-full">
      {fields.map(
        ({
          name,
          label,
          placeholder,
          autoCapitalize,
          autoFocus,
          secureTextEntry,
        }) => (
          <View key={name}>
            <Controller
              control={control}
              name={name}
              defaultValue=""
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
        className="bg-blue-600 rounded-lg py-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-semibold">
          Zarejestruj
        </Text>
      </Pressable>
    </View>
  );
}
