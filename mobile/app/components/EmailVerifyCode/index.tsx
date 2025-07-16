import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import { images } from "@/app/constans/images";
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
} from "@/app/lib/shemas/verifyCodeSchema";

type EmailVerifyCodeProps = {
  onVerifyPress?: (data: VerifyCodeSchemaType) => Promise<void>;
};
const CELL_COUNT = 6;

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
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View className="flex-1 justify-center items-center gap-4 p-12">
      <View className="items-center px-4 py-8">
        <Text className="text-lg font-semibold mb-4">zdjecie</Text>
        <Image source={images.verify.otp} className="w-64 h-64 mb-4 " />
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
                  width: 300,
                }}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    className={`w-12 h-14 text-xl text-center border-2  rounded-xl ${
                      isFocused ? "border-black" : "border-gray-300"
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
