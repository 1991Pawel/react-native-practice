import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View, Image } from "react-native";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";
import { images } from "@/constans/images";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VerifyCodeSchemaType,
  verifyCodeSchema,
} from "@/lib/shemas/verifyCodeSchema";

type EmailVerifyCodeProps = {
  onVerifyPress?: (data: VerifyCodeSchemaType) => Promise<void>;
};
const CELL_COUNT = 6;

export default function EmailVerifyCode({
  onVerifyPress,
}: EmailVerifyCodeProps) {
  const {
    control,
    handleSubmit,
    setValue: setFormValue,
    watch,
  } = useForm<VerifyCodeSchemaType>({
    defaultValues: { code: "" },
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSubmit: SubmitHandler<VerifyCodeSchemaType> = async (data) => {
    await onVerifyPress?.(data);
  };

  const value = watch("code");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: (val) => setFormValue("code", val),
  });

  return (
    <View className="flex-1  items-center gap-4 p-12 justify-between">
      <View className="items-center px-4 py-8 mt-[100px]">
        <Image source={images.verify.otp} className="w-64 h-64 mb-4 " />
        <Text className="text-center text-lg font-semibold mb-2">
          Weryfikacja OTP
        </Text>
        <Text className="text-center text-gray-600 mb-4">
          Wprowadź kod weryfikacyjny, który został wysłany na Twój adres e-mail.
        </Text>
        <Controller
          control={control}
          name={"code"}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={onChange}
                cellCount={CELL_COUNT}
                rootStyle={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 340,
                }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    className={`w-12 h-14 text-xl text-center border-b-2  ${
                      symbol || isFocused ? "border-black" : "border-gray-300"
                    }`}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              {error && (
                <Text className="text-red-500 mt-2">{error.message}</Text>
              )}
            </>
          )}
        />
        <View className="flex-row justify-center items-center mt-5">
          <Text className="text-gray-400 text-sm">Nie otrzymałeś kodu? </Text>
          <Pressable onPress={() => console.log("Kod wysłany ponownie")}>
            <Text className="text-blue-500">Wyślij ponownie</Text>
          </Pressable>
        </View>
      </View>

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
