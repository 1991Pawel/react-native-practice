import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import RegisterForm from "@/components/RegisterForm";
import { useSignUp } from "@clerk/clerk-expo";

import React from "react";

export default function RegisterScreen() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const onSignUpPress = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    // todo check if user already exists
    try {
      const createdSignUp = await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await createdSignUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/(auth)/verify");

      console.log("Sign-up initiated, awaiting verification code.", signUp);
    } catch (err) {
      alert(err);
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="flex-1 justify-center items-center gap-4 p-12">
          <RegisterForm onSignUpPress={onSignUpPress} />
          <View className="flex-row items-center justify-center gap-1">
            <Text className="text-center text-gray-500">Masz już konto? </Text>
            <Link href="/(auth)/sign-in" className="text-blue-600">
              Zaloguj się
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
