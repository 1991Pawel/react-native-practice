import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CustomInput from "@/components/CustomInput";
import type { TextInputProps } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaType, loginSchema } from "@/lib/shemas/loginSchema";
import { KeyboardAvoidingView, Platform } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

type CustomInputProps = {
  label: string;
  error?: { message?: string };

  name: keyof LoginSchemaType;
} & TextInputProps;

const fields: CustomInputProps[] = [
  {
    name: "emailAddress",
    label: "Email",
    placeholder: "Wpisz email",
    autoCapitalize: "none",
    autoFocus: false,
    secureTextEntry: false,
  },
  {
    name: "password",
    label: "Hasło",
    placeholder: "Wpisz hasło",
    autoCapitalize: "none",
    autoFocus: false,
    secureTextEntry: true,
  },
];

type LoginFormProps = {
  onSignInPress: (data: LoginSchemaType) => Promise<void>;
};

export default function LoginForm({ onSignInPress }: LoginFormProps) {
  const { control, handleSubmit } = useForm<LoginSchemaType>({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    await onSignInPress({
      emailAddress: data?.emailAddress,
      password: data?.password,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center", width: "100%" }}
      >
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
              Zaloguj
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
