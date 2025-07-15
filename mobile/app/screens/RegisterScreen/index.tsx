import { Text, View } from "react-native";
import { Link } from "expo-router";
import RegisterForm from "@/app/components/RegisterForm";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";

export default function RegisterScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  // const [pendingVerification, setPendingVerification] = React.useState(true);

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
      alert(err?.message);
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
      {/* {pendingVerification && <EmailVerifyCode onSignUpPress={() => {}} />} */}
    </View>
  );
}

// import * as React from "react";
// import { Text, TextInput, Button, View } from "react-native";
// import { useSignUp } from "@clerk/clerk-expo";
// import { Link, useRouter } from "expo-router";

// export default function Page() {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const router = useRouter();

//   const [emailAddress, setEmailAddress] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState("");

//   // Handle submission of sign-up form
//   const onSignUpPress = async () => {
//     if (!isLoaded) return;

//     // Start sign-up process using email and password provided
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//       });

//       // Send user an email with verification code
//       await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

//       // Set 'pendingVerification' to true to display second form
//       // and capture OTP code
//       setPendingVerification(true);
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   // Handle submission of verification form
//   const onVerifyPress = async () => {
//     if (!isLoaded) return;

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       });

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });
//         router.replace("/");
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2));
//     }
//   };

//   if (pendingVerification) {
//     return (
//       <>
//         <Text>Verify your email</Text>
//         <TextInput
//           value={code}
//           placeholder="Enter your verification code"
//           placeholderTextColor="#666666"
//           onChangeText={(code) => setCode(code)}
//         />
//         <Button title="Verify" onPress={onVerifyPress} />
//       </>
//     );
//   }

//   return (
//     <View>
//       <>
//         <Text>Sign up</Text>
//         <TextInput
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           placeholderTextColor="#666666"
//           onChangeText={(email) => setEmailAddress(email)}
//         />
//         <TextInput
//           value={password}
//           placeholder="Enter password"
//           placeholderTextColor="#666666"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />
//         <Button title="Continue" onPress={onSignUpPress} />
//         <View style={{ flexDirection: "row", gap: 4 }}>
//           <Text>Have an account?</Text>
//           <Link href="/sign-in">
//             <Text>Sign in</Text>
//           </Link>
//         </View>
//       </>
//     </View>
//   );
// }
