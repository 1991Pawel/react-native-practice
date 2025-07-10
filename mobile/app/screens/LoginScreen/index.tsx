import LoginForm from "@/app/components/LoginForm";

// import LoginForm from "@/app/components/LoginForm";
// import { Text, View } from "react-native";
// import { Link } from "expo-router";

// export default function LoginScreen() {
//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       <Text className="text-2xl text-center font-bold">LoginScreen</Text>
//       <LoginForm />
//       <Link href="/(auth)/register" className="text-blue-600 ">
//         Register
//       </Link>
//       <Link href="/(protected)/dashboard" className="text-blue-600 ">
//         dashboard
//       </Link>
//     </View>
//   );
// }

import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import * as React from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async ({ emailAddress, password }) => {
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

  // 👇 Jeśli Clerk jeszcze się ładuje, nic nie pokazuj
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <LoginForm onSignInPress={onSignInPress} />
    </View>
  );
}
