import LoginForm from "@/components/LoginForm";

import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as React from "react";
import { View, Text } from "react-native";
import { LoginSchemaType } from "@/lib/shemas/loginSchema";
import Link from "expo-router/link";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  // Handle the submission of the sign-in form
  const onSignInPress = async (data: LoginSchemaType) => {
    const { emailAddress, password } = data;
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/dashboard");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // If Clerk is not loaded, we return null to avoid rendering the form
  if (!isLoaded) {
    return null;
  }
  return (
    <>
      <View className="flex-1 justify-center items-center gap-4 p-12">
        <LoginForm onSignInPress={onSignInPress} />
        <View className="flex-row items-center  justify-center gap-1">
          <Text className="text-center text-gray-500 ">Nie masz konta? </Text>
          <Link href="/(auth)/sign-up" className="text-blue-600">
            Zarejestruj się
          </Link>
        </View>
      </View>
    </>
  );
}
