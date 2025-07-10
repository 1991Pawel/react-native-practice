import React from "react";
import LoginScreen from "@/app/screens/LoginScreen";

export default function Page() {
  return <LoginScreen />;
}

// <View>
//   <Text>Sign in</Text>
//   <TextInput
//     autoCapitalize="none"
//     value={emailAddress}
//     placeholder="Enter email"
//     placeholderTextColor="#666666"
//     onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//   />
//   <TextInput
//     value={password}
//     placeholder="Enter password"
//     placeholderTextColor="#666666"
//     secureTextEntry={true}
//     onChangeText={(password) => setPassword(password)}
//   />
//   <Button title="Sign in" onPress={onSignInPress} />
//   <View style={{ flexDirection: "row", gap: 4 }}>
//     <Text>Don't have an account?</Text>
//     <Link href="/sign-up">
//       <Text>Sign up</Text>
//     </Link>
//     <Text> | </Text>
//     <Link href="/forgot-password">
//       <Text>Forgot password?</Text>
//     </Link>
//   </View>
// </View>;
