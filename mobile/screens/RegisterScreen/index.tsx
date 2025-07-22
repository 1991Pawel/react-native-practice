import { Text, View } from "react-native";
import { Link } from "expo-router";
import RegisterForm from "@/components/RegisterForm";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";

export default function RegisterScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const onSignUpPress = async ({ emailAddress, password }) => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push("/(auth)/verify");
      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      // setPendingVerification(true);
      // router.push("/(auth)/verify");
      console.log("Sign-up initiated, awaiting verification code.", signUp);
    } catch (err) {
      alert(err);
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center items-center gap-4 p-12">
      <RegisterForm onSignUpPress={onSignUpPress} />
      <View className="flex-row items-center justify-center gap-1">
        <Text className="text-center text-gray-500">Masz już konto? </Text>
        <Link href="/(auth)/sign-in" className="text-blue-600">
          Zaloguj się
        </Link>
      </View>
    </View>
  );
}
