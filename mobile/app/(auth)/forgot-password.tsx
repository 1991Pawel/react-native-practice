import { useSignIn } from "@clerk/clerk-expo";
import { Text, TextInput, Button, View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [message, setMessage] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordResetRequest = async () => {
    if (!isLoaded) return;

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setCodeSent(true);
      setMessage("Check your email for the reset code.");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setMessage(
        err?.errors?.[0]?.longMessage ||
          "Something went wrong. Please try again."
      );
    }
  };

  const handlePasswordResetSubmit = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
        setMessage("Password reset successful!");
        router.replace("/");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setMessage(err?.errors?.[0]?.longMessage || "Invalid code or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset your password</Text>

      {!codeSent ? (
        <>
          <TextInput
            style={styles.input}
            value={emailAddress}
            placeholder="Enter your email"
            onChangeText={setEmailAddress}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Button
            title="Send reset code"
            onPress={handlePasswordResetRequest}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={code}
            placeholder="Enter the code from email"
            onChangeText={setCode}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={newPassword}
            placeholder="Enter your new password"
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <Button title="Reset Password" onPress={handlePasswordResetSubmit} />
        </>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  message: {
    marginTop: 15,
    color: "#333",
  },
});
