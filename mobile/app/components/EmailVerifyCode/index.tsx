import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CustomInput from "@components/CustomInput";
import type { TextInputProps } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VerifyCodeSchemaType,
  verifyCodeSchema,
} from "@/app/lib/shemas/verifyCodeSchema";

type CustomInputProps = {
  label: string;
  error?: { message?: string };
  name: keyof VerifyCodeSchemaType;
} & TextInputProps;

const fields: CustomInputProps[] = [
  {
    name: "code",
    label: "Kod weryfikacyjny",
    placeholder: "Wprowadź kod z maila",
    keyboardType: "number-pad",
    autoFocus: true,
    maxLength: 6,
  },
];

type EmailVerifyCodeProps = {
  onVerifyPress?: (data: VerifyCodeSchemaType) => Promise<void>;
};

export default function EmailVerifyCode({
  onVerifyPress,
}: EmailVerifyCodeProps) {
  const { control, handleSubmit } = useForm<VerifyCodeSchemaType>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSubmit: SubmitHandler<VerifyCodeSchemaType> = async (data) => {
    await onVerifyPress?.(data);
  };

  return (
    <View className="flex-1 justify-center items-center gap-4 p-12">
      {fields.map(
        ({
          name,
          label,
          placeholder,
          autoCapitalize,
          autoFocus,
          secureTextEntry,
          keyboardType,
          maxLength,
        }) => (
          <View key={name} className="mb-4 w-full">
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
                  keyboardType={keyboardType}
                  maxLength={maxLength}
                  error={error}
                />
              )}
            />
          </View>
        )
      )}

      <Pressable
        className="bg-blue-600 rounded-lg py-4 w-full"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-center text-white font-semibold">
          Zatwierdź kod
        </Text>
      </Pressable>
    </View>
  );
}
