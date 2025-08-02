import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import CustomInput from "@/components/CustomInput";
import type { TextInputProps } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserProfile, getUserByClerkId } from "@/services/api";
import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";

import {
  EditProfileSchemaType,
  editProfileSchema,
} from "@/lib/shemas/editProfileSchema";

type CustomInputProps = {
  label: string;
  error?: { message?: string };

  name: keyof EditProfileSchemaType;
} & TextInputProps;

const fields: CustomInputProps[] = [
  {
    name: "name",
    label: "Imię",
    placeholder: "Wpisz imię",
    autoCapitalize: "none",
  },
];

export default function Profile() {
  const { user } = useUser();
  const clerkId = user?.id;

  const { control, handleSubmit, reset } = useForm<EditProfileSchemaType>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (!clerkId) return;

    async function fetchUser() {
      try {
        const userData = await getUserByClerkId(clerkId);

        reset({
          name: userData.firstName ?? "",
        });
      } catch (error) {
        console.error("Błąd pobierania użytkownika:", error);
      }
    }

    fetchUser();
  }, [clerkId, reset]);

  const onSubmit: SubmitHandler<EditProfileSchemaType> = async (data) => {
    try {
      await updateUserProfile({
        ...data,
        clerkId,
      });
      alert("Profil zaktualizowany pomyślnie!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Wystąpił błąd podczas aktualizacji profilu.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center gap-4 p-12">
      <Text className="text-2xl mb-4">Edytuj profil</Text>

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
          <Text className="text-center text-white font-semibold">Zapisz</Text>
        </Pressable>
      </View>
    </View>
  );
}
