import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CustomInput from "@components/CustomInput";

type FormData = {
  email: string;
  password: string;
};

type Fields = {
  name: keyof FormData;
  label: string;
  placeholder: string;
  autoCapitalize: "none" | "sentences" | "words" | "characters";
  autoFocus?: boolean;
  secureTextEntry: boolean;
};

const fields: Fields[] = [
  {
    name: "email",
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

export default function LoginForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("✅ Logowanie:", data);
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
        }) => (
          <View key={name}>
            <Controller
              control={control}
              name={name}
              defaultValue=""
              rules={{
                required: "To pole jest wymagane!",
              }}
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
        className="bg-blue-600 rounded-lg py-3"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-semibold">Zaloguj</Text>
      </Pressable>
    </View>
  );
}
