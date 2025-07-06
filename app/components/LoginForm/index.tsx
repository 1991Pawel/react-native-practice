import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

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
  secure: boolean;
};

const fields: Fields[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Wpisz email",
    autoCapitalize: "none",
    autoFocus: true,
    secure: false,
  },
  {
    name: "password",
    label: "Hasło",
    placeholder: "Wpisz hasło",
    autoCapitalize: "none",
    secure: true,
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
      {fields.map((field) => (
        <View key={field.name} className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </Text>

          <Controller
            control={control}
            name={field.name}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-md w-full p-4"
                placeholder={field.placeholder}
                autoCapitalize={field.autoCapitalize}
                autoFocus={field.autoFocus}
                secureTextEntry={field.secure}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
      ))}

      <Pressable
        className="bg-blue-600 rounded-lg py-3 mt-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-semibold">Zaloguj</Text>
      </Pressable>
    </View>
  );
}
